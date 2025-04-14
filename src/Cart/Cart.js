import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {/* TODO: Add cart items list */}
        <div className="cart-item">
          <h3>Sample Item</h3>
          <p>Quantity: 1</p>
          <p>Price: $10.99</p>
        </div>
      </div>
      <div className="cart-summary">
        <h2>Total: $10.99</h2>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart; 