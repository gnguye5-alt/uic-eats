import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard'; 
import './TopBar.css'; 
const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/restaurants.json')
      .then(res => res.json())
      .then(data => setRestaurants(data));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        (restaurant.cuisine?.toLowerCase().includes(query.toLowerCase()) ?? false)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-header">
        <div className="logo">UIC EATS</div>
        <button className="group-order-button" onClick={() => navigate('/group-order')}>
          Group ordering
        </button>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Look up for restaurant or cuisine"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {searchResults.length > 0 && (
          <div className="search-results-dropdown">
            {searchResults.map((restaurant) => (
              <div
                key={restaurant.id}
                className="search-result-card"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <RestaurantCard item={restaurant} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
