import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeSelect = (theme) => {
  setSelectedTheme(theme);
};

const handleLevelSelect = (level) => {
  if (selectedTheme) {
    navigate(`/game?theme=${selectedTheme}&level=${level}`);
  }
};
  return (
    <div className="home-container">
      <h1 className="game-font">Welcome to FlashMind</h1>
      <p className="subtitle">Sharpen your memory, one card at a time</p>
      <h2 className="level-label">Choose Theme:</h2>
      <div className="theme-buttons">
        <button className={`theme-button nature ${selectedTheme === 'nature' ? 'selected nature' : ''}`} onClick={() => handleThemeSelect('nature')}>Nature</button>
        <button className={`theme-button city ${selectedTheme === 'city' ? 'selected city' : ''}`} onClick={() => handleThemeSelect('city')}>City</button>
      </div>
      <h2 className="level-label">Choose Level:</h2>                        
      <div className={`level-buttons ${selectedTheme ? '' : 'level-disabled'}`}>
        <button className="level-button easy" onClick={() => handleLevelSelect('easy')} disabled={!selectedTheme} >Easy</button>
        <button className="level-button medium" onClick={() => handleLevelSelect('medium')} disabled={!selectedTheme}>Medium</button>
        <button className="level-button hard" onClick={() => handleLevelSelect('hard')} disabled={!selectedTheme}>Hard</button>
      </div>
    </div>
  );
}


  