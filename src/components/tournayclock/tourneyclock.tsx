import { useEffect, useState } from "react";

function getCirclePath(cx: number, cy: number, r: number, progress: number) {
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI * (1 - progress);

  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  const largeArcFlag = (1 - progress) > 0.5 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${x1} ${y1}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    "Z"
  ].join(" ");
}

function timeToNextBreak(levels: Level[], currentLevel: number, timeLeft: number) {
  let total = timeLeft;
  for (let i = currentLevel + 1; i < levels.length; i++) {
    if (levels[i].isBreak) break;
    total += levels[i].duration;
  }
  return total;
}

interface Level {
  blinds: string;
  nextBlinds: string;
  duration: number;
  isBreak?: boolean;
}

interface TournamentData {
  name: string;
  players: string;
  rebuy: number;
  addons: number;
  averageStack: number;
  totalChips: number;
  totalPrize: number;
  prizes: {
    first: number;
    second: number;
    third: number;
  };
  levels: Level[];
}

interface Props {
  apiUrl: string;
}

// Exemplo de mock no React puro
const mockTournamentData = {
  name: "Home Game Poker TimeLeft Tournament",
  players: "6 de 6",
  rebuy: 11,
  addons: 8,
  averageStack: 3500,
  totalChips: 6 * 3500,
  totalPrize: 302,
  prizes: { first: 181, second: 75, third: 45 },
  levels: [
    { blinds: "50/100", nextBlinds: "100/200", duration: 30, isBreak: false },
    { blinds: "100/200", nextBlinds: "200/400", duration: 30, isBreak: false },
    { blinds: "Break", nextBlinds: "", duration: 10, isBreak: true },
    { blinds: "200/400", nextBlinds: "400/800", duration: 30, isBreak: false },
    { blinds: "400/800", nextBlinds: "800/1600", duration: 30, isBreak: false },
    { blinds: "Break", nextBlinds: "", duration: 10, isBreak: true },
    { blinds: "800/1600", nextBlinds: "1600/3200", duration: 30, isBreak: false },
    { blinds: "1600/3200", nextBlinds: "3200/6400", duration: 30, isBreak: false },
    { blinds: "Break", nextBlinds: "", duration: 10, isBreak: true },
    { blinds: "3200/6400", nextBlinds: "6400/12800", duration: 30, isBreak: false },
  ],
};

export default function TourneyClock({ apiUrl }: Props) {
  const [data, setData] = useState<TournamentData | null>(null);
  const [level, setLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
        setLevel(0);
        setTimeLeft(json.levels[0].duration);
      } catch {
        // Se falhar, usa o mock
        setData(mockTournamentData);
        setLevel(0);
        setTimeLeft(mockTournamentData.levels[0].duration);
      }
    };
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (!data) return;
    if (timeLeft <= 0) {
      if (level < data.levels.length - 1) {
        setLevel((prev) => prev + 1);
        setTimeLeft(data.levels[level + 1].duration);
      }
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, level, data]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `00:${m}:${s}`;
  };

  if (!data) return <div className="text-white p-4">Loading...</div>;

  const currentLevel = data.levels[level];
  const progress = timeLeft / currentLevel.duration;
  const radius = 30;
  const cx = 30;
  const cy = 30;
  const timeUntilBreak = timeToNextBreak(data.levels, level, timeLeft);

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 text-white bg-gradient-to-b from-red-900 to-black min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">{data.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="uppercase text-xs text-gray-400">Level</div>
          <div className="text-lg font-bold">{level + 1}</div>
        </div>


<div>
  <div className="uppercase text-xs text-gray-400">Time to break</div>
  <div className="text-lg font-bold">{formatTime(timeUntilBreak)}</div>
</div>
        <div>
          <div className="uppercase text-xs text-gray-400">Total levels</div>
          <div className="text-lg font-bold">{data.levels.length}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 text-black rounded-xl p-4 sm:p-6 text-4xl sm:text-5xl font-bold gap-4">
        <div className="flex-1 text-center sm:text-left">{formatTime(timeLeft)}</div>
        <div className="w-[60px] h-[60px]">
          <svg width="60" height="60">
            {/* Fundo do círculo */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="#e5e7eb"
            />
            {/* Preenchimento dinâmico */}
            <path
              d={getCirclePath(cx, cy, radius, progress)}
              fill="#dc2626"
              style={{ transition: 'd 1s linear' }}
            />
          </svg>
        </div>
        <div className="flex-1 text-center sm:text-right">{currentLevel.blinds}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-6">
        <div className="space-y-1 border-t pt-2">
          <div>Players: <strong>{data.players}</strong></div>
          <div>Re-buys: <strong>{data.rebuy}</strong></div>
          <div>Add-ons: <strong>{data.addons}</strong></div>
        </div>
        <div className="space-y-1 border-t pt-2">
          <div>Average stack: <strong>{data.averageStack}</strong></div>
          <div>Total chips: <strong>{data.totalChips}</strong></div>
          <div>Total prize: <strong>{data.totalPrize}</strong></div>
        </div>
        <div className="space-y-1 border-t pt-2">
          <div>1st: <strong>{data.prizes.first}</strong></div>
          <div>2nd: <strong>{data.prizes.second}</strong></div>
          <div>3rd: <strong>{data.prizes.third}</strong></div>
        </div>
      </div>
    </div>
  );
}
