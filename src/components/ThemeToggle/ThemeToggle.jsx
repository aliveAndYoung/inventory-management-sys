import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectIsDarkMode } from '../../store/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      style={{
        backgroundColor: isDarkMode ? 'var(--color-primary)' : 'var(--color-background)',
        color: isDarkMode ? 'var(--color-text-primary)' : 'var(--color-primary)',
      }}
    >
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;