import Hangman from './Hangman';

type Game = {
  game: string;
}
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