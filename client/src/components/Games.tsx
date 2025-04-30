import Hangman from './Hangman';
import { Game } from '../types';

type GamesProps = {
  games: Game[]
}

const Games = ({games = []}: GamesProps) => {

  const hangmanConfig = games.find(singleGame => singleGame.game === 'Hangman');

  return (
    <div className='container'>
      {hangmanConfig && <Hangman gameConfig={hangmanConfig} />   }   
    </div>
  )
}

export default Games;