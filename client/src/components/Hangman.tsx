/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import ErrorField from './ErrorField';
import '../styles/App.css';
import { Game } from '../types';
import { fetchGames } from '../api/gameApi';
import { GAMES } from '../constants';

type HangmanProps = {
  gameConfig: Game;
};

const Hangman = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const word = 'hangman';
  const arrayOfWord = word.toUpperCase().split('');
  const [tries, setTries] = useState<number>(7);
  const [guessList, setGuessList] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameInfo = await fetchGames(GAMES.HANGMAN);
        console.log('Game Info:', gameInfo);
      } catch (err: any) {
        setError(`Failed to fetch games: ${err.message}`);
      }
    };
    fetchData();
  }, []);

  const checkValue = () => {
    if (currentGuess && currentGuess !== '') {
      const hasNotBeenGuessed = !guessList.includes(currentGuess);
      const isLetter = /^[A-Za-z ]*$/.test(currentGuess);

      if (!isLetter) {
        setError('You need to enter a letter');
      } else {
        if (hasNotBeenGuessed) {
          setGuessList([...guessList, currentGuess]);
          setTries(tries - 1);
        } else {
          setError(`You already guessed letter ${currentGuess}`);
        }
      }
    } else if (currentGuess === '') {
      setError('Your guess can not be blank');
    }
    setCurrentGuess('');
    // @ts-ignore
    document.getElementById('guess-input').value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    setError('');
    if (inputValue && inputValue !== '') {
      setCurrentGuess(inputValue);
    }
  };

  const resetValue = () => {
    setTries(7);
    setGuessList([]);
    setError('');
  };

  return (
    <>
      <h1>Hangman</h1>
      <h4>Hint: 'Name of the game'</h4>
      <div className="correct-container">
        {arrayOfWord.map((letter, index) => {
          return (
            <div key={`guess${letter}${index}`} className="correct-letter">
              {guessList.includes(letter) ? letter : ''}
            </div>
          );
        })}
      </div>
      <span>Guesses left: {tries}</span>
      <span> Previous Guesses: </span>
      <div className="correct-container">
        {guessList.map((letter, index) => {
          return (
            <span
              className="guessed-letter"
              key={`${index + letter}`}
            >{`${letter},`}</span>
          );
        })}
      </div>
      <input
        pattern="[A-Za-z]+"
        maxLength={1}
        id="guess-input"
        onChange={handleChange}
      ></input>
      {error && error !== '' && <ErrorField errorMessage={error} />}
      {tries > 0 ? (
        <button disabled={tries === 0} onClick={() => checkValue()}>
          Try
        </button>
      ) : (
        <p>Game Over</p>
      )}
      <button onClick={() => resetValue()}>Reset game</button>
    </>
  );
};

export default Hangman;
