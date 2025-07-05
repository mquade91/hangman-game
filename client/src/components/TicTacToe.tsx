import { useEffect, useState } from 'react';
import '../styles/tictactoe.css';

const TicTacToe = () => {
  const [boardValueArray, setBoardValues] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<'AGAINST_AI' | 'TWO_PLAYER' | ''>(
    ''
  );
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
  }, [gameMode]);

  useEffect(() => {
    if (gameMode !== 'AGAINST_AI') return;
    if (isXNext || winningLetter) return;

    const timeout = setTimeout(() => {
      const emptyCells = boardValueArray
        .map((val, idx) => (val === null ? idx : null))
        .filter((v) => v !== null) as number[];

      if (emptyCells.length === 0) return;

      const aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newBoard = [...boardValueArray];
      newBoard[aiMove] = 'O';
      setBoardValues(newBoard);
      setIsXNext(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isXNext, gameMode, boardValueArray]);

  const onCellClick = (index: number) => {
    setError(''); // reset error message on each click
    if (gameMode === '') {
      setError('Please choose a game mode first');
      return;
    }
    // check if value for this cell already exists
    if (boardValueArray[index]) {
      setError('Choose a different cell');
      return;
    } else {
      const newBoard = [...boardValueArray];
      // assignValue to board
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoardValues(newBoard);
      if (gameMode === 'TWO_PLAYER') {
        setIsXNext(!isXNext);
      } else if (gameMode === 'AGAINST_AI') {
        setIsXNext(false); // player moved, AI’s turn will run in useEffect
      }
    }
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

  const resetGame = () => {
    setBoardValues(Array(9).fill(null));
    setIsXNext(true);
    setError('');
  };

  const winningLetter = calculateWinner().letter;

  const setClassNameForCell = (cellIndex: number) => {
    return calculateWinner().cells.includes(cellIndex) ? 'cell winner' : 'cell';
  };

  return (
    <>
      <h1>'Tic Tac Toe'</h1>
      <h3>Try to get 3 in a row, X is first</h3>
      {gameMode === '' ? (
        <>
          <div className="button-container">
            <h4>Choose Game Mode: </h4>
            <button onClick={() => setGameMode('AGAINST_AI')}>
              Versus Computer
            </button>
            <button onClick={() => setGameMode('TWO_PLAYER')}>
              Two Player
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>{`Game mode: ${gameMode === 'TWO_PLAYER' ? 'Two player' : 'vs Computer'} `}</h4>
          <button onClick={() => setGameMode('')}>Change Game mode?</button>
        </>
      )}

      {gameMode === '' ? null : winningLetter ? (
        <p> {`Player ${winningLetter} is Winner!`}</p>
      ) : (
        <p>{`Player ${isXNext ? 'X' : 'O'} is up.`}</p>
      )}
      {error && <p className="error">{error}</p>}
      <>
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
    </>
  );
};

export default TicTacToe;
