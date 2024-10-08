import React from 'react';
import { inventoryData } from '../../mockData/dashboardData';

const InventoryChart = () => (
  <div className='bg-white p-4 rounded-lg shadow'>
    <h3 className='text-lg font-semibold mb-2'>Inventory Levels</h3>
    <ul>
      {inventoryData.map((item, index) => (
        <li key={index} className='mb-2'>
          {item.name}: {item.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default InventoryChart;
