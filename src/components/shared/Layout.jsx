import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../store/themeSlice';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import '../../styles/colors.css';

const Layout = () => {
    const isDarkMode = useSelector(selectIsDarkMode);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial state

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <Navbar onMenuClick={toggleSidebar} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out" style={{ backgroundColor: 'var(--color-background)' }}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;