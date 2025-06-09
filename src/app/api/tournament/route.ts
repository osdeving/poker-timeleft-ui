import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
  name: "Home Game Poker TimeLeft",
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
});
}
