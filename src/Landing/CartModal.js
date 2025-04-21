import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CartModal.css';

const CartModal = ({ onClose }) => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    onClose(); // Close the modal first
    navigate('/checkout');
  };

  return (
    <div className="cart-modal-backdrop">
      <div className="cart-modal">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="cart-total">Total: ${total}</div>
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-btn">Clear Cart</button>
              <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
        <button onClick={onClose} className="close-btn">×</button>
      </div>
    </div>
  );
};

export default CartModal;
