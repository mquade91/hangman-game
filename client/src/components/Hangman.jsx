/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
// import Gallows from '../components/Gallows'
import '../App.css'

const Hangman = ({words = []}) => {
  const word = 'hangman';
  const arrayOfWord = word.split('');
  const [tries, setTries] = useState(7);
  const [guessList, setGuessList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const checkValue = () => {
    setGuessList([...guessList, currentGuess]);
    // @ts-ignore
    document.getElementById('guess-input').value = '';
  };
  const handleChange = (e) => {
    console.log(e.target.value.toLowerCase())
    setCurrentGuess(e.target.value.toLowerCase());
  };

  const resetValue = () => {
    setTries(7);
    setGuessList([]);
  };

  return (
      <>
        {/* <Gallows tries={guessList.length} /> */}
        <h1>Hangman</h1>
        <div className='container'>

        {arrayOfWord.length > 1 ? 
          arrayOfWord.map((letter, index) => {
            return (
              <div key={`guess${letter}${index}`} className='letter' >
                {guessList.includes(letter) ? letter : ''}
              </div>
            );
          }) : <p> here{words[0]}</p>
        }

        </div>
        {tries > 0 && <input id="guess-input" onChange={handleChange}></input>}
        <button disabled={tries === 0} onClick={() => checkValue()}>
        {' '}
          {tries > 0 ? 'Try' : 'Game over'}{' '}
        </button>
        <p>Guesses left: {tries}</p>
        <div className='container'>
          Previous Guesses: 
         {guessList.map((letter, index) => {
            return <div key={`${index + letter}`}>{`${letter}, `}</div>;
         })}
      </div>
      <button onClick={() => resetValue()}>Reset game</button>
    </>
  
  );
};

export default Hangman;
