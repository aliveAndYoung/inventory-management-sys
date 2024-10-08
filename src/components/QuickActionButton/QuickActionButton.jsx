import React from 'react';

const QuickActionButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
  >
    {text}
  </button>
);

export default QuickActionButton;
