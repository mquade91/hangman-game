/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import ErrorField from './ErrorField'
import '../styles/App.css'

type HangmanProps = {
  words: string[];
};

const Hangman = ({words = []}: HangmanProps) => {
  const word = 'hangman';
  const arrayOfWord = word.toUpperCase().split('');
  const [tries, setTries] = useState<number>(7);
  const [guessList, setGuessList] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [error, setError] = useState<string>('')

  const checkValue = () => {
    if(currentGuess && currentGuess !== '') {
      const hasNotBeenGuessed = !guessList.includes(currentGuess)
      if(hasNotBeenGuessed) {
        setGuessList([...guessList, currentGuess]);
        setTries(tries - 1)
      } else {
        setError(`You already guessed letter ${currentGuess}`)
      }
    } else if(currentGuess === '') {
      setError('You need to enter a letter')
    }
    setCurrentGuess('')
    // @ts-ignore
    document.getElementById('guess-input').value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    setError('')
    if(inputValue && inputValue !== '') {
      setCurrentGuess(inputValue);
    }
  };

  const resetValue = () => {
    setTries(7);
    setGuessList([]);
    setError('')
  };

  const buttonText = () => tries > 0 ? 'Try' : 'Game over'

  return (
      <div className='container'>
        <h1>Hangman</h1>
        <h4>Hint: 'Name of the game'</h4>
        <div className='correct-container'>
          {arrayOfWord.map((letter, index) => {
              return (
                <div key={`guess${letter}${index}`} className='correct-letter' >
                  {guessList.includes(letter) ? letter : ''}
                </div>
              );
            })
          }
        </div>
        <span>Guesses left: {tries}</span>
         <span> Previous Guesses: </span> 
         <div className='correct-container'>
          {guessList.map((letter, index) => {
              return <span className='guessed-letter' key={`${index + letter}`}>{`${letter},`}</span>;
          })}
         </div>
        <input maxLength={1} id="guess-input" onChange={handleChange}></input>
        {error && error !== '' && <ErrorField errorMessage={error}/>}
        <button disabled={tries === 0} onClick={() => checkValue()}>
          {buttonText()}
        </button>
      <button onClick={() => resetValue()}>Reset game</button>
    </div>
  );
};

export default Hangman;
