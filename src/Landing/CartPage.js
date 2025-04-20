import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button onClick={clearCart} className="clear-btn">Clear Cart</button>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
