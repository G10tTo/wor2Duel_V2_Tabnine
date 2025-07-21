import React, { useState, useEffect } from 'react';
import Hs from '../styles/Header.module.css';

const Header = ({ onRestart }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for the user's theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update the theme in localStorage and the document's class
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <header className={Hs.header}>
      <h1>WOR(2D)UEL</h1>
      <button className={Hs.restartButton} onClick={onRestart}>
        Restart Game
      </button>
      <button className={Hs.toggleButton} onClick={toggleTheme}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </header>
  );
};

export default Header;