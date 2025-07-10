export interface Choice {
  description: string;
  word: string;
}

export interface Game {
  game: string;
  description: string;
  choices: Array<Choice>;
} 