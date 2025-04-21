import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import Hangman from './components/Hangman';

function App() {
  const [words, setWords] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  // const fetchWordsAPI = async () => {
  //   setLoading(true)
  //   try{
  //     const response = await axios.get("http://localhost:8080/api")
  //     setWords(response.data.words)
  //     console.log(response.data.words)
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       // Axios-specific error
  //       console.error('Axios error:', error.message);
  //       if (error.response) {
  //         console.error('Response data:', error.response.data);
  //         console.error('Status:', error.response.status);
  //       }
  //     } else {
  //       // Non-Axios error (e.g., coding error)
  //       console.error('Unexpected error:', error);
  //     }
  //   } finally{
  //     setLoading(false)
  //   }
  // }

  // useEffect(() =>{
  //   fetchWordsAPI()
  // }, [])
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
