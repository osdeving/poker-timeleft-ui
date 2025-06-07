import type { Tournament } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getTournaments(): Promise<Tournament[]> {
  const res = await fetch(`${API_URL}/tournaments`);
  if (!res.ok) throw new Error("Erro ao buscar torneios");
  return res.json();
}
