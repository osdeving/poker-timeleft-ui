import type { Tournament } from './types';

const API_URL = "http://localhost:8080";

export async function getTournaments(): Promise<Tournament[]> {
  const res = await fetch(`${API_URL}/tournaments`);
  if (!res.ok) throw new Error("Erro ao buscar torneios");
  return res.json();
}
