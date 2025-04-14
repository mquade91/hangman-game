/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';

const Hangman = ({words = []}) => {
  const word = words[0] ? words[0]: '';
  const arrayOfWord = word.split('');
  const [tries, setTries] = useState(5);
  const [guessList, setGuessList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const checkValue = () => {
    setTries(tries - 1);
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

  const letterStyle = {
    borderBottom: '2px solid',
    width: 25,
    margin: 3,
    height: 20,
  };

  const containerStyle = {
    display: 'flex',
    margin: 20,
    justifyContent: 'center',
  };

  return (
    <>
      <div>
      <div style={containerStyle}>
        {arrayOfWord.map((letter, index) => {
          return (
            <div key={`guess${letter}${index}`} style={letterStyle}>
              {guessList.includes(letter) ? letter : ''}
            </div>
          );
        })}
      </div>
      {tries > 0 && <input id="guess-input" onChange={handleChange}></input>}
      <button disabled={tries === 0} onClick={() => checkValue()}>
        {' '}
        {tries > 0 ? 'Try' : 'Game over'}{' '}
      </button>
      <div>Tries left: {tries}</div>
      <div style={containerStyle}>
        Previous Guesses: 
        {guessList.map((letter, index) => {
          return <div key={`${index + letter}`}>{`${letter}, `}</div>;
        })}
      </div>
      <button onClick={() => resetValue()}>Reset game</button>
    </div>
    </>
  
  );
};

export default Hangman;
