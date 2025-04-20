import React from 'react';
import './SharedStyles.css';
const InfoBox = ({ children, className, text }) => {
  return (
    <div className={`info-box ${className || ''}`}>
      {text ? text : children}
    </div>
  );
};

export default InfoBox;