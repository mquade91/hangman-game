import React from 'react';
import '../styles/Error.css';

type ErrorFieldProps = {
  errorMessage: string
}

function ErrorField({errorMessage}: ErrorFieldProps) {
  return (
      <p className='error'>{errorMessage}</p>
  );
}

export default ErrorField;