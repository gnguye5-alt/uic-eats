import React from 'react';
import './SharedStyles.css';

const ItemCard = ({ name, price, quantity }) => {
  return (
    <article className="item-card">
      <div className="item-image"></div>
      <div className="item-content">
        <div className="item-name">{name}</div>
        <div className="price-quantity">
          <div>Price: ${parseFloat(price).toFixed(2)}</div>
          <div>Quantity: {quantity}</div>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;