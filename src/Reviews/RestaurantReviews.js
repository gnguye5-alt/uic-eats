import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantReviews.css';

// Loads static fallback reviews from /public/data/Reviews/*.json
const loadFallbackReviews = async (restaurantId) => {
  const fileMap = {
    1: 'jarabe-reviews.json',
    6: 'golden-thai-reviews.json',
    7: 'ghareeb-menu-reviews.json',
    13: 'gathers-reviews.json',
    4: 'joy-yee-reviews.json',
    3: 'lotus-reviews.json',
    12: 'papa-johns-menu-reviews.json',
    2: 'popeyes-reviews.json',
    10: 'subway-reviews.json',
  };

  const filename = fileMap[restaurantId];
  if (!filename) return [];

  try {
    const res = await fetch(`/data/Reviews/${filename}`);
    if (!res.ok) throw new Error(`Failed to fetch ${filename}`);
    const data = await res.json();

    // Flatten dish-level reviews into a single restaurant review list
    return data.flatMap((dish, idx) =>
      dish.reviews.map((r, i) => ({
        id: `${dish.dish_id}-${i}`,
        user: r.user,
        rating: r.rating,
        comment: r.text,
        photos: []  // static reviews don't have photos
      }))
    );
  } catch (err) {
    console.error("Error loading fallback reviews:", err);
    return [];
  }
};

const RestaurantReviews = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Most Recent");
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const id = parseInt(restaurantId);

    // Load basic restaurant info
    fetch('/data/restaurants.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(r => r.id === id);
        if (found) setRestaurant(found);
      });

    // Load both fallback and local reviews
    const loadReviews = async () => {
      try {
        const localKey = `reviews-${id}`;
        const [fallback, local] = await Promise.all([
          loadFallbackReviews(id),
          Promise.resolve(JSON.parse(localStorage.getItem(localKey)) || [])
        ]);

        // Combine user-submitted + static reviews
        const all = [...local, ...fallback];
        setReviews(all);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setReviews([]);
      }
    };

    loadReviews();
  }, [restaurantId]);

  // Filter + Sort logic
  const filteredReviews = reviews.filter((review) => {
    if (filter === "5 Stars") return review.rating === 5;
    if (filter === "3+ Stars") return review.rating >= 3;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sort === "Highest Rated") return b.rating - a.rating;
    return b.id - a.id;
  });

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="review-page">
      <div className="restaurant-header">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <h2 className="restaurant-title">{restaurant.name} Reviews</h2>
      </div>

      <div className="filter-bar">
        <label>Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option>All</option>
          <option>5 Stars</option>
          <option>3+ Stars</option>
        </select>

        <label>Sort:</label>
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option>Most Recent</option>
          <option>Highest Rated</option>
        </select>
      </div>

      <div className="reviews-section">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="review-card">
              <strong>{review.user}</strong>
              <div className="star-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="comment">{review.comment}</p>
              {review.photos && review.photos.length > 0 && (
                <div className="review-photos">
                  {review.photos.map((src, idx) => (
                    <img key={idx} src={src} alt={`review-${idx}`} />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantReviews;
