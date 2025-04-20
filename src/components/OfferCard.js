import React from 'react';
import './OfferCard.css';

const OfferCard = ({ code, description }) => {
  return (
    <div className="offer-card">
      <div className="offer-code">{code}</div>
      <div className="offer-description">{description}</div>
      <div className="offer-instructions">Click to copy</div>
    </div>
  );
};

export default OfferCard;
