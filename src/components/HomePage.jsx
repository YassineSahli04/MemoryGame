import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    navigate(`/game?level=${level}`);
  };

  return (
    <div className="home-container">
      <h1 className="game-font">Welcome to FlashMind</h1>
      <p className="subtitle">Sharpen your memory, one card at a time</p>

      <h2 className="level-label">Choose Level:</h2>                        
      <div className="level-buttons">
        <button className="level-button easy" onClick={() => handleLevelSelect('easy')}>Easy</button>
        <button className="level-button medium" onClick={() => handleLevelSelect('medium')}>Medium</button>
        <button className="level-button hard" onClick={() => handleLevelSelect('hard')}>Hard</button>
      </div>
    </div>
  );
}


  