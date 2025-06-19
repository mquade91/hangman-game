import { useState } from 'react';
import '../styles/tictactoe.css';

const TicTacToe = () => {
  const [boardValueArray, setBoardValues] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningCells, setWinningCells] = useState<number[]>([]);

  const onCellClick = (index: number) => {
    // check if value for this cell already exists
    if (boardValueArray[index]) {
      alert('Choose a different cell');
      return;
    } else {
      const newBoard = [...boardValueArray];
      // assignValue to board
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoardValues(newBoard);
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoardValues(Array(9).fill(null));
    setIsXNext(true);
  };

  const calculateWinner = () => {
    const winningLines: Array<[number, number, number]> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    let winningLetter = null;
    let winningCells: number[] = [];

    winningLines.some(([a, b, c]: [number, number, number]) => {
      const threeInARow =
        boardValueArray[a] !== null &&
        boardValueArray[a] === boardValueArray[b] &&
        boardValueArray[a] === boardValueArray[c];

      if (threeInARow) {
        winningLetter = boardValueArray[a];
        winningCells = [a, b, c];
        return true;
      } else return false;
    });
    return { letter: winningLetter, cells: winningCells };
  };

  const winningLetter = calculateWinner().letter;

  const setClassNameForCell = (cellIndex: number) => {
    return calculateWinner().cells.includes(cellIndex) ? 'cell winner' : 'cell';
  };

  return (
    <>
      <h1>'Tic Tac Toe'</h1>
      <h3>Try to get 3 in a row, X is first</h3>
      {winningLetter ? (
        <p> {`Player ${winningLetter} is Winner!`}</p>
      ) : (
        <p>{`Player ${isXNext ? 'X' : 'O'} is up.`}</p>
      )}
      <div className="game-board">
        {boardValueArray.map((cellValue, index) => {
          return (
            <div
              key={cellValue + index}
              className={setClassNameForCell(index)}
              onClick={() => onCellClick(index)}
            >
              {cellValue}
            </div>
          );
        })}
      </div>
      <button onClick={() => resetGame()}>Reset Game</button>
    </>
  );
};

export default TicTacToe;
