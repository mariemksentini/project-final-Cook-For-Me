import React from 'react';
import './AnimeSnakeLoading.css'; // We'll create this CSS file next

const AnimeSnakeLoading = () => {
  return (
    <div className="loading-container">
      <div className="snake">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="snake-svg"
        >
          <path
            d="M10 50 Q25 30 40 50 T70 50"
            fill="none"
            stroke="#ff6f61"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="50" r="5" fill="#ff6f61" />
          <circle cx="70" cy="50" r="5" fill="#ff6f61" />
        </svg>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default AnimeSnakeLoading;