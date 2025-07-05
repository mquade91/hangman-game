import { useState } from 'react';
import './styles/App.css';
import { Game } from './types';
import Games from './components/Games';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  return (
    <div className="App">
      <Games games={games} />
    </div>
  );
}

export default App;
