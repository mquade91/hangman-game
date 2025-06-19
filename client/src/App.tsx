import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import { Game } from './types';
import ErrorField from './components/ErrorField';
import Games from './components/Games';
import { fetchGames } from './api/gameApi';

function App() {
  const [games, setGames] = useState<Game[]>([]);



  return (
    <div className="App">
      <Games games={games} />
    </div>
  );
}

export default App;
