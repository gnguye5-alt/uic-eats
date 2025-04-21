import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './SharedStyles.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">UIC EATS</Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/checkout" className="nav-link">
            Checkout {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;