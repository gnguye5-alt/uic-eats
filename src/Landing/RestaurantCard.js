import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${item.id}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="image-container">
        <img className="item-image" src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="categories">
          {item.categories.join(' • ')} • {item.distance}
        </p>
        <div className="tags">
          {item.criteria.map((tag, index) => (
            <span className="tag" key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
