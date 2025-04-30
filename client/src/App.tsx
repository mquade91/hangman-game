import { useEffect, useState } from 'react';
import axios from 'axios';

import './styles/App.css';
import { Game } from './types'
import ErrorField from './components/ErrorField';
import Games from './components/Games';



function App() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('')

  useEffect(() => {
    axios.get('https://rr5zhoav94.execute-api.us-east-1.amazonaws.com/production/game', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    })
      .then(response => {
        console.log(response); // assuming your lambda returns { message: "..." }
        setGames(response.data)

      })
      .catch(error => {
        console.error('Error calling Lambda function:', error);
        setError(`Error calling Lambda function: ${error.message}`)
      });
  }, []);

  return (
    <div className="App">
      {games && !error && <Games games={games} />}
      {error && <ErrorField errorMessage={error}/>}
    </div>
  );
}

export default App;
