import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import Hangman from './components/Hangman';

function App() {
  const [games, setGames] = useState<object[]>([])
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    axios.get('https://rr5zhoav94.execute-api.us-east-1.amazonaws.com/production/game', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    })
      .then(response => {
        console.log(response); // assuming your lambda returns { message: "..." }
      })
      .catch(error => {
        console.error('Error calling Lambda function:', error);
      });
  }, []);

  return (
    <div className="App">
       <Hangman words={[]} />      
    </div>
  );
}

export default App;
