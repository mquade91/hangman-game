/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
// import Gallows from '../components/Gallows'
import '../App.css'

const Hangman = ({words = []}) => {
  const word = words[0] ? words[0]: 'word';
  const arrayOfWord = word.split('');
  const [tries, setTries] = useState(7);
  const [guessList, setGuessList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const checkValue = () => {
    if(!arrayOfWord.includes(currentGuess)) {
      setTries(tries - 1);
    }
    guessList.push(currentGuess);
    // @ts-ignore
    document.getElementById('guess-input').value = '';
  };
  const handleChange = (e) => {
    setCurrentGuess(e.target.value.toLowerCase());
  };

  const resetValue = () => {
    setTries(5);
    setGuessList([]);
  };

  return (
      <>
        {/* <Gallows tries={guessList.length} /> */}
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
        <p className='container'>
          Previous Guesses: 
         {guessList.map((letter, index) => {
            return <div key={`${index + letter}`}>{`${letter}, `}</div>;
         })}
      </p>
      <button onClick={() => resetValue()}>Reset game</button>
    </>
  
  );
};

export default Hangman;
