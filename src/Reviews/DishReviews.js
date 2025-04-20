import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DishReviews.css';

const DishReviews = () => {
  const { dishId, restaurantId } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!dishId || !restaurantId) return;
  
    // 1. Load restaurant data to get the menuFile
    fetch('/data/restaurants.json')
      .then(res => res.json())
      .then(restaurants => {
        const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
        if (!restaurant) return;
  
        const menuFile = restaurant.menuFile;
        const baseName = menuFile.replace('.json', '');
  
        // 2. Load that restaurant's menu
        fetch(`/data/${menuFile}`)
          .then(res => res.json())
          .then(menu => {
            const dish = menu.find(item => item.id === parseInt(dishId));
            if (dish) setDish(dish);
          });
  
        // 3. Load reviews from localStorage
        const loadReviews = () => {
          const localReviews = JSON.parse(localStorage.getItem(`dish-reviews-${restaurantId}-${dishId}`) || '[]');
          if (localReviews.length > 0) {
            setReviews(localReviews);
          } else {
            // Load fallback reviews if no local reviews exist
            fetch(`/data/Reviews/${baseName}-reviews.json`)
              .then(res => res.json())
              .then(data => {
                const found = data.find(entry => entry.dish_id === parseInt(dishId));
                setReviews(found?.reviews || []);
              });
          }
        };

        loadReviews();
      });
  }, [dishId, restaurantId]);
  
  if (!dish) return <div>Loading dish reviews...</div>;

  return (
    <div className="dish-reviews">
      <div className="dish-header">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <h2 className="dish-title">{dish.name}</h2>
      </div>

      <img src={dish.image} alt={dish.name} className="dish-image" />

      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <div key={review.id || idx} className="review-item">
            <div className="review-user">{review.user}</div>
            <div className="review-stars">{'\u2B50'.repeat(review.rating)}</div>
            <p className="review-text">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews yet for this dish.</p>
      )}
    </div>
  );
};

export default DishReviews;
