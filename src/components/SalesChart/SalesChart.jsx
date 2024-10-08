import React from 'react';
import { salesData } from '../../mockData/dashboardData';

const SalesChart = () => (
  <div className='bg-white p-4 rounded-lg shadow'>
    <h3 className='text-lg font-semibold mb-2'>Sales Overview</h3>
    <ul>
      {salesData.map((item, index) => (
        <li key={index} className='mb-2'>
          {item.month}: 
        </li>
      ))}
    </ul>
  </div>
);

export default SalesChart;
