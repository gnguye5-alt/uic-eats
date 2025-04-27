/**
 * This component fetches and displays a list of featured restaurants.
 * It applies filtering based on active food categories and criteria, 
 * and renders the matching restaurants in a responsive grid layout.
 */

import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

const Restaurants = ({ activeFood, activeCriteria }) => {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch local JSON data from public/data/restaurants.json
  useEffect(() => {
    fetch('/data/restaurants.json')
      .then(res => res.json())
      .then(data => setRestaurants(data));
  }, []);

  const filteredRestaurants = restaurants.filter((item) => {
    const matchFood = activeFood ? item.categories.includes(activeFood) : true;
    const matchCriteria = activeCriteria ? item.criteria.includes(activeCriteria) : true;
    return matchFood && matchCriteria;
  });

  return (
    <div className="section">
      <h2 className="section-title">Featured restaurants</h2>
      <div className="restaurant-grid">
        {filteredRestaurants.map((item, index) => (
          <RestaurantCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
