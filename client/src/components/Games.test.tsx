import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Games from './Games';

test('Games component loads h1 header', () => {
  render(<Games games={[]} />);
  const linkElement = screen.getByText(/Games/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders Hangman when Hangman button is clicked', async () => {
  render(<Games games={[]} />);
  const hangmanButton = screen.getByText(/Hangman/i);
  await userEvent.click(hangmanButton);
  expect(screen.getByText(/Hangman/i)).toBeInTheDocument();
});

test('renders Tic Tac Toe when Tic Tac Toe button is clicked', async () => {
  render(<Games games={[]} />);
  const ticTacToeButton = screen.getByText(/Tic Tac Toe/i);
  await userEvent.click(ticTacToeButton);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});
