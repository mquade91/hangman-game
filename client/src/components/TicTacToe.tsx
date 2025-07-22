import { useEffect, useState } from 'react';
import '../styles/tictactoe.css';
import { getAIMove } from '../api/gameApi';

const TicTacToe = () => {
  const [boardValueArray, setBoardValues] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<'AGAINST_AI' | 'TWO_PLAYER' | ''>(
    ''
  );
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    // reset state when game mode changes
    setError('');
    setBoardValues(Array(9).fill(null));
    setIsXNext(true);
  }, [gameMode]);

  useEffect(() => {
    if (gameMode !== 'AGAINST_AI') return;
    const winningLetter = calculateWinner().letter;
    const boardIsFull = boardValueArray.every((cell) => cell !== null);
    if (isXNext || winningLetter || boardIsFull) return;
    const aiTurn = async () => {
      setLoading(true); // Set loading to true before AI move
      try {
        const move = await getAIMove(boardValueArray);
        if (typeof move !== 'number' || boardValueArray[move]) {
          setError('Invalid AI move received.');
          setLoading(false); // Reset loading state
          return;
        }
        const newBoard = [...boardValueArray];
        newBoard[move] = 'O'; // AI plays as 'O'
        setBoardValues(newBoard);
        setIsXNext(true);
      } catch (err) {
        setError('Failed to get move from AI');
        console.error(err);
      } finally {
        setLoading(false); // Reset loading state after AI move
      }
    };

    const timeout = setTimeout(() => {
      aiTurn();
    }, 500);
    return () => clearTimeout(timeout);
  }, [isXNext, gameMode, boardValueArray]);

  const onCellClick = (index: number) => {
    if (loading) return; // Prevent clicks while AI is thinking
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
  const boardIsFull = boardValueArray.every((cell) => cell !== null);

  const setClassNameForCell = (cellIndex: number) => {
    return calculateWinner().cells.includes(cellIndex) ? 'cell winner' : 'cell';
  };

  return (
    <>
      <h1>'Tic Tac Toe'</h1>
      <h5>Try to get 3 in a row, X is first</h5>
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
        <p>
          {boardIsFull
            ? 'The game is a draw, reset and play again.'
            : `Player ${isXNext ? 'X' : 'O'} is up.`}
        </p>
      )}
      {error && <p className="error">{error}</p>}
      {loading && <p>AI is thinking...</p>} {/* Display loading message */}
      <>
        <div className="game-board">
          {boardValueArray.map((cellValue, index) => {
            return (
              <div
                key={cellValue + index}
                className={setClassNameForCell(index)}
                onClick={() => onCellClick(index)}
                role="button"
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
