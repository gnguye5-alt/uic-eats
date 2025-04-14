import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="restaurant-page">
      <h1>Restaurant Details</h1>
      <p>Restaurant ID: {id}</p>
      <button onClick={handleViewMenu}>View Menu</button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Restaurant; 