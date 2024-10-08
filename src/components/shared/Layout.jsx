import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { selectIsAuthenticated } from '../../store/authSlice';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            {selectIsAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
