import React from 'react';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-header">
        <div className="logo">UIC EATS</div>
        <button className="group-order-button" onClick={() => alert('Group Ordering')}>
          Group ordering
        </button>
      </div>
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input type="text" className="search-input" placeholder="Look up for restaurant or cuisine" />
      </div>
    </div>
  );
};

export default TopBar;
