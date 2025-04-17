
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Restaurant.css';
import { CartContext } from './CartContext'; // Import the CartContext
import CartModal from './CartModal'; // at the top

const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [activeTab, setActiveTab] = useState('menu');
    const { addItem, cart } = useContext(CartContext);

    const [showCart, setShowCart] = useState(false);

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

    const studentPicks = [...menu]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);

    return (
        <div className="landing-page">
            <div className="restaurant-header">
                <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
                <h2 className="restaurant-name">{restaurant.name}</h2>
            </div>

            <img src={restaurant.image} alt={restaurant.name} className="restaurant-hero" />
            <p className="restaurant-meta">4.5 ⭐ (200 reviews) • {restaurant.distance}</p>

            <div className="tabs">
                <div className={`tab ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>Menu</div>
                <div className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Info</div>
            </div>

            {activeTab === 'menu' && (
                <>
                    <h3 className="student-picks-title">Student Picks</h3>
                    <div className="student-picks">
                        {studentPicks.map((item, i) => (
                            <div key={i} className="student-pick-card">
                                <img src={item.image || restaurant.image} alt={item.name} className="student-pick-img" />
                                <div className="student-pick-name">{item.name}</div>
                            </div>
                        ))}
                    </div>

                    <h3 className="restaurant-menu-title">Menu</h3>
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
                                        <button
                                            onClick={() => {
                                                addItem(item);
                                                alert(`${item.name} added to cart!`);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
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
                    <p>{restaurant.address}</p>
                    <h4>Opening Hours</h4>
                    <p>{restaurant.hours}</p>
                </div>
            )}

            <div className="view-cart" onClick={() => setShowCart(true)}>
                View cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </div>

            {showCart && <CartModal onClose={() => setShowCart(false)} />}

        </div>
    );
};

export default Restaurant;
