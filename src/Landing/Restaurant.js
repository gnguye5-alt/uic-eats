import React, { useEffect, useState, useContext } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import './Restaurant.css';
import { CartContext } from './CartContext'; // Import the CartContext
const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [activeTab, setActiveTab] = useState('menu');
    const { addItem } = useContext(CartContext); 
    
    useEffect(() => {
        if (!id) return;

        fetch('/data/restaurants.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(r => r.id === parseInt(id));
                if (!found) return;

                setRestaurant(found);

                if (found.menuFile) {
                    fetch(`/data/${found.menuFile}`)
                        .then(res => res.json())
                        .then(setMenu)
                        .catch(err => console.error("Failed to load menu:", err));
                }
            });
    }, [id]);

    if (!restaurant) return <div>Loading restaurant...</div>;

    return (
        <div className="landing-page">
            <div className="restaurant-header">
                <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
                <h2 className="restaurant-name">{restaurant.name}</h2>
            </div>


            {/* Restaurant Hero Image */}
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-hero" />

            {/* Rating + Distance (placeholder for now) */}
            <p className="restaurant-meta">4.5 ⭐ (200 reviews) • {restaurant.distance}</p>

            {/* Tabs */}
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'menu' ? 'active' : ''}`}
                    onClick={() => setActiveTab('menu')}
                >
                    Menu
                </div>
                <div
                    className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}
                >
                    Info
                </div>
            </div>


            {activeTab === 'menu' && (
                <>
                    <div className="student-picks">
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={restaurant.image} alt="student-pick" />
                        ))}
                    </div>

                    <div className="restaurant-menu">
                        {menu.length > 0 ? (
                            menu.map((item, idx) => (
                                <div className="menu-item" key={idx}>
                                    <img src={item.image || restaurant.image} alt={item.name} className="menu-img" />
                                    <div className="menu-info">
                                        <h4>{item.name}</h4>
                                        <div className="price">${item.price.toFixed(2)}</div>
                                        <div className="desc">{item.description}</div>
                                        <div className="rating-line">👍 {item.likes} / 🗳️ {item.votes}</div>
                                    </div>
                                    <div className="menu-actions">
                                        <button onClick={() => addItem(item)}>➕</button>
                                        <button>See reviews</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No menu available for this restaurant.</p>
                        )}
                    </div>
                </>
            )}

            {activeTab === 'info' && (
                <div className="restaurant-info">
                    <h4>Address</h4>
                    <p>{restaurant.address || "1225 W Taylor St, Chicago, IL 60607"}</p>

                    <h4>Opening Hours</h4>
                    <p>{restaurant.hours || "Mon–Sat: 11am – 10pm"}</p>
                </div>
            )}


            {/* View Cart Button */}
            <div className="view-cart">View cart</div>
        </div>
    );
};

export default Restaurant;
