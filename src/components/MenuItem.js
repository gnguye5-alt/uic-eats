// src/components/MenuItem.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './SharedStyles.css';

const MenuItem = ({ item }) => {
  const { addItem } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addItem(item);
  };
  
  return (
    <div className="menu-item">
      <div className="item-image"></div>
      <div className="item-content">
        <div className="item-name">{item.name}</div>
        <div className="item-description">{item.description}</div>
        <div className="price-quantity">
          <div>Price: ${parseFloat(item.price).toFixed(2)}</div>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;