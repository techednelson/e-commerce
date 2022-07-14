import React from 'react';

const Spinner = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <progress className="progress w-56 progress-primary"></progress>
  </div>
);

export default Spinner;
