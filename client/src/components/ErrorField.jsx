import React from 'react';
import '../styles/Error.css';

function ErrorField({errorMessage}) {
  return (
      <p className='error'>{errorMessage}</p>
  );
}

export default ErrorField;