import { useState } from 'react';
import Hangman from './Hangman';
import TicTacToe from './TicTacToe';
import { Game } from '../types';

type GamesProps = {
  games: Game[];
};

const Games = ({ games = [] }: GamesProps) => {
  const [page, setPage] = useState<string>('');

  const renderPage = () => {
    switch (page) {
      case 'hangman':
        return <Hangman />;
      case 'tictactoe':
        return <TicTacToe />;
      default:
        return <p>Choose a game to play</p>;
    }
  };

  return (
    <>
      {page === '' && <h1>Games</h1>}
      {page === '' ? (
        <>
          <button
            aria-label="Start Hangman game"
            onClick={() => setPage('hangman')}
          >
            Hangman
          </button>
          <button
            aria-label="Start Tic Tac Toe game"
            onClick={() => setPage('tictactoe')}
          >
            Tic Tac Toe
          </button>
        </>
      ) : (
        <>
          {renderPage()}
          <button
            aria-label="Go back to game selection"
            onClick={() => setPage('')}
          >
            {`< Choose a different Game`}
          </button>
        </>
      )}
    </>
  );
};

export default Games;
