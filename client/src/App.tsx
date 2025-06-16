import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import { Game } from './types';
import ErrorField from './components/ErrorField';
import Games from './components/Games';
import { fetchGames } from './api/gameApi';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return (
    <div className="App container">
      <Games games={games} />
      {error && <ErrorField errorMessage={error} />}
    </div>
  );
}

export default App;
