/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
// import Gallows from '../components/Gallows'
import '../App.css'

const Hangman = ({words = []}) => {
  const word = 'hangman';
  const arrayOfWord = word.toUpperCase().split('');
  const [tries, setTries] = useState(7);
  const [guessList, setGuessList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  console.log(arrayOfWord)

  const checkValue = () => {
    if(!guessList.includes(currentGuess)) {
      setGuessList([...guessList, currentGuess]);
      setTries(tries - 1)
    } else {
      alert(`You already guessed letter ${currentGuess}`)
    }
    console.log(guessList)
    // @ts-ignore
    document.getElementById('guess-input').value = '';
  };
  const handleChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase());
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
          {arrayOfWord.map((letter, index) => {
            return (
              <div key={`guess${letter}${index}`} className='letter' >
                {guessList.includes(letter) ? letter : ''}
              </div>
            );})
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
            return <div key={`${index + letter}`}>{` ${letter}, `}</div>;
         })}
      </div>
      <button onClick={() => resetValue()}>Reset game</button>
    </>
  
  );
};

export default Hangman;
