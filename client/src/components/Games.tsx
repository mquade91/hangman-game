import { useState } from 'react';
import Hangman from './Hangman';
import TicTacToe from './TicTacToe';
import { Game } from '../types';

type GamesProps = {
  games: Game[]
}

const Games = ({games = []}: GamesProps) => {

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
      <h1>Games</h1>
      {page === '' ? (
          <>
  <button onClick={() => setPage('hangman')}>Hangman</button>
  <button onClick={() => setPage('tictactoe')}>Tic Tac Toe</button>
          </>
      ): (<button onClick={() => setPage('')}>Choose a different Game</button>)}
      {renderPage()}
    </>
  )
}

export default Games;