import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChooseRestaurant.css';

const ChooseRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/restaurants.json')
      .then(res => res.json())
      .then(setRestaurants);
  }, []);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="landing-page">
      {/* Header with Back Button and Title */}
      <div className="restaurant-header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      </div>
      <h2 className="restaurant-name">Choose a restaurant to start group ordering</h2>

      {/* Search Input */}
      <div className="search-wrapper">
  <input
    className="search-input"
    type="text"
    placeholder="Search restaurants..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      {/* Restaurant List */}
      <div className="restaurant-grid">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="restaurant-card"
            onClick={() => navigate(`/restaurant/${r.id}`)}
          >
            <img src={r.image} alt={r.name} className="item-image" />
            <div className="item-details">
              <h3>{r.name}</h3>
              <p>{r.categories?.join(' • ')} • {r.distance}</p>
              <div className="tags">
                {r.criteria?.map((tag, i) => (
                  <span className="tag" key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseRestaurant;
