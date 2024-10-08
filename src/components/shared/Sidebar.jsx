import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Dashboard</Link>
        <Link to="/inventory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Inventory</Link>
        <Link to="/orders" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Orders</Link>
        <Link to="/suppliers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Suppliers</Link>
        <Link to="/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Reports</Link>
        <Link to="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
