import React from 'react';

interface GallowProps {
  title: string;
  tries: number;
}

const Gallows: React.FC<GallowProps> = ({ tries = 0 }) => {
  return (
    <div>
      <h1>Hangman</h1>
      <p>Count: {tries}</p>
    </div>
  );
};

export default Gallows;