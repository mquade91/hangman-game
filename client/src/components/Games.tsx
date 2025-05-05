import Hangman from './Hangman';
import TicTacToe from './TicTacToe';
import { Game } from '../types';

type GamesProps = {
  games: Game[]
}

const Games = ({games = []}: GamesProps) => {

  const hangmanConfig = games.find(singleGame => singleGame.game === 'Hangman');
  const showTicTacToe = true;

  return (
    <>
    <div className='container'>
    <h1>Games</h1>
      {hangmanConfig && <button>Hangman</button>}
      {showTicTacToe && <button>Tic Tac Toe</button>}
      {/* {hangmanConfig && <Hangman gameConfig={hangmanConfig} />   }    */}
      <TicTacToe/>
    </div>
    </>

  )
}

export default Games;