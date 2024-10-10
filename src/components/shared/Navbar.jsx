import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { FaBars, FaBoxOpen } from 'react-icons/fa';
import '../../styles/colors.css';

const Navbar = ({ onMenuClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('authState');
        navigate('/login');
    };

    return (
        <nav style={{ 
            backgroundColor: 'var(--color-card-background)', 
            color: 'var(--color-text-primary)',
            borderBottom: '1px solid var(--color-border)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button 
                            onClick={onMenuClick} 
                            className="p-2 rounded-md lg:hidden"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            <FaBars size={24} />
                        </button>
                        <div className="flex-shrink-0 ml-4 lg:ml-0">
                            <FaBoxOpen size={32} style={{ color: 'var(--color-primary)' }} />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ThemeToggle />
                        <button 
                            onClick={handleLogout}
                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                            style={{ 
                                backgroundColor: 'var(--color-danger)',
                                color: 'var(--color-text-primary)'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;