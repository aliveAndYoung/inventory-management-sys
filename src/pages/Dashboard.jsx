import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../store/authSlice';
import StatCard from '../components/StatCard/StatCard';
import QuickActionButton from '../components/QuickActionButton/QuickActionButton';
import InventoryChart from '../components/InventoryChart/InventoryChart';
import SalesChart from '../components/SalesChart/SalesChart';

const Dashboard = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Items" value={1234} />
        <StatCard title="Low Stock Items" value={15} />
        <StatCard title="Pending Orders" value={5} />
        <StatCard title="Total Value" value="$50,000" />
      </div>

      <div className="flex space-x-4 mt-6">
        <QuickActionButton text="Add New Item" onClick={() => navigate('/add-item')} />
        <QuickActionButton text="Create Order" onClick={() => navigate('/create-order')} />
        <QuickActionButton text="View Reports" onClick={() => navigate('/reports')} />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2">
          <li>New order #1234 received</li>
          <li>Item "Widget A" stock updated</li>
          <li>New supplier "ABC Corp" added</li>
        </ul>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InventoryChart />
        <SalesChart />
      </div>
    </div>
  );
};

export default Dashboard;