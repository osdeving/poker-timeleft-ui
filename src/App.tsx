import { useEffect, useState } from 'react';
import { getTournaments } from './api';
import type { Tournament } from './types';

function App() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    getTournaments()
      .then(setTournaments)
      .catch(err => console.error("Erro ao carregar torneios:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Torneios</h1>
      <ul>
        {tournaments.map((t) => (
          <li key={t.id}>
            <strong>{t.name}</strong> — {t.note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

