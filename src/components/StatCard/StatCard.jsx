import React from 'react';

const StatCard = ({ title, value }) => (
  <div className='bg-white p-4 rounded-lg shadow'>
    <h3 className='text-lg font-semibold text-gray-700'>{title}</h3>
    <p className='text-3xl font-bold text-indigo-600'>{value}</p>
  </div>
);

export default StatCard;
