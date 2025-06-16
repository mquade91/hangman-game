import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Games from './Games';

test('Games component loads h1 header', () => {
  render(<Games games={[]} />);
  const linkElement = screen.getByText(/Games/i);
  expect(linkElement).toBeInTheDocument();
});
