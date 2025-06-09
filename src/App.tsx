// import { useEffect, useState } from 'react';
// import { getTournaments } from './api';
// import type { Tournament } from './types';
import TourneyClock from './components/tournayclock/tourneyclock';



function App() {
  // const [tournaments, setTournaments] = useState<Tournament[]>([]);

  // useEffect(() => {
  //   getTournaments()
  //     .then(setTournaments)
  //     .catch(err => console.error("Erro ao carregar torneios:", err));
  // }, []);

  return (
    <div className="relative h-full bg-amber-400">
      {/* <ul>
        {tournaments.map((t) => (
          <li key={t.id}>
            <strong>{t.name}</strong> — {t.note}
          </li>
        ))}
      </ul> */}

            <div className="relative h-full bg-amber-400">
        <TourneyClock apiUrl="/api/tournament" />
      </div>
    </div>
  );
}

export default App;

