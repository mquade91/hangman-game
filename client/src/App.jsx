import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Hangman from './components/Hangman';

function App() {

  const fetchWordsAPI = async () => {
    const response = await axios.get("http://localhost:8080/api")
    console.log(response.data.words)
  }

  useEffect(() =>{
    fetchWordsAPI()
  }, [])

  return (
    <div className="App">

       <Hangman />      
    </div>
  );
}

export default App;
