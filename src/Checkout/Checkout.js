import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // TODO: Implement order placement
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {/* TODO: Add order items */}
        <div className="order-item">
          <h3>Sample Item</h3>
          <p>Quantity: 1</p>
          <p>Price: $10.99</p>
        </div>
        <h3>Total: $10.99</h3>
      </div>
      <div className="payment-form">
        <h2>Payment Information</h2>
        {/* TODO: Add payment form */}
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="Expiry Date" />
        <input type="text" placeholder="CVV" />
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
      <button onClick={() => navigate('/cart')}>Back to Cart</button>
    </div>
  );
};

export default Checkout; 