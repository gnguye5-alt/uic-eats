import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = (itemId) => {
    // TODO: Implement cart functionality
    console.log(`Adding item ${itemId} to cart`);
  };

  const handleCheckout = () => {
    navigate('/cart');
  };

  return (
    <div className="menu-page">
      <h1>Menu for Restaurant {restaurantId}</h1>
      <div className="menu-items">
        {/* TODO: Add menu items list */}
        <div className="menu-item">
          <h3>Sample Item</h3>
          <p>Description</p>
          <p>$10.99</p>
          <button onClick={() => handleAddToCart('1')}>Add to Cart</button>
        </div>
      </div>
      <button onClick={handleCheckout}>View Cart</button>
      <button onClick={() => navigate(`/restaurant/${restaurantId}`)}>Back to Restaurant</button>
    </div>
  );
};

export default Menu; 