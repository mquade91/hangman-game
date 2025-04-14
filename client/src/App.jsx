import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Hangman from './components/Hangman';

function App() {

  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchWordsAPI = async () => {
    setLoading(true)
    try{
      const response = await axios.get("http://localhost:8080/api")
      setWords(response.data.words)
      console.log(response.data.words)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    fetchWordsAPI()
  }, [])
  if(loading) {
    return 'loading...'
  }
  return (
    <div className="App">
       <Hangman words={words} />      
    </div>
  );
}

export default App;
