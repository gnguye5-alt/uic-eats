import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './CartModal.css';

const CartModal = ({ onClose }) => {
  const { cart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

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
            <button onClick={clearCart} className="clear-btn">Clear Cart</button>
          </>
        )}
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default CartModal;
