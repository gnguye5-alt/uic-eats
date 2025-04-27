import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { usePromotions } from '../components/PromotionsContext';
import '../components/SharedStyles.css';
import './CheckoutPage.css';
import PromotionsModal from '../components/PromotionsModal';

// UIC locations available for pickup 
const locationData = [
  {
    "name": "Student Center East",
    "address": "750 S. Halsted St, Chicago, IL 60607",
    "lat": 41.8717,
    "lng": -87.6471
  },
  {
    "name": "Student Service Building",
    "address": "1200 W. Harrison, Chicago, IL 60607",
    "lat": 41.8745,
    "lng": -87.6582
  },
  {
    "name": "Thomas Beckham Hall",
    "address": "1250 S. Halsted Street, Chicago, IL 60607",
    "lat": 41.865657,
    "lng": -87.647191
  },
  {
    "name": "UIC Forum",
    "address": "725 W. Roosevelt Rd, Chicago, IL 60608",
    "lat": 41.8675,
    "lng": -87.6482
  },
  {
    "name": "UIC Pavilion",
    "address": "525 S. Racine Ave, Chicago, IL 60607",
    "lat": 41.874997,
    "lng": -87.65616
  },
  {
    "name": "College of Medicine",
    "address": "1853 W. Polk St, Chicago, IL 60612",
    "lat": 41.870747,
    "lng": -87.673034
  }
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  
  // Get cart data from CartContext file
  const { 
    cart, 
    currentRestaurantName,
    getCartTotals
  } = useContext(CartContext);
  
  // Get promotions  opup functionality so they can be applied to orders
  const { 
    promotions,
    appliedPromotion, 
    applyPromotion, 
    clearPromotion, 
    calculateDiscount 
  } = usePromotions();
  
  // possible conditions for delivery -
  const [activeTab, setActiveTab] = useState('Delivery');
  const [selectedLocation, setSelectedLocation] = useState(locationData[0]);
  const [pickupText, setPickupText] = useState('Enter delivery address');
  const [processing, setProcessing] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  // States for promotions
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);
  const [displayedPromoCode, setDisplayedPromoCode] = useState('');
  
  // Calculate cart totals using CartContext -- reffercing other file
  // This will return subtotal, tax, and service fee
  const { subtotal, tax, serviceFee } = getCartTotals();
  
  // Set delivery fee based on active tab
  const deliveryFee = activeTab === 'Delivery' ? 2.99 : 0;
  
  // Calculate the total including delivery fee if applicable
  const total = subtotal + tax + serviceFee + deliveryFee;
  
  // Calculate discount and final total
  const rawDiscount = calculateDiscount(subtotal);
  const discount = parseFloat(rawDiscount);
  
  // Calculate the final total with discount applied
  const finalTotal = (total - discount).toFixed(2);
  
  // Handle empty cart redirect
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);
  
  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    
    if (activeTab === 'Delivery') {
      setPickupText('Enter delivery address');
    } else if (activeTab === 'Pickup') {
      setPickupText(`Pick up at: ${location.name}`);
    }
    
    setShowLocationDropdown(false);
  };
  
  // Handle promo code application
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoMessage('Please enter a promotion code');
      return;
    }
    
    // Get the promotion from the code
    const promotion = promotions.find(p => p.code === promoCode.trim());
    
    // Check promotion validity , not applying a delivery code whenever there is no delivery selected
    if (promotion && promotion.type === 'free_delivery' && activeTab !== 'Delivery') {
      setPromoMessage('This promotion is only valid for delivery orders');
      return;
    }
    setDisplayedPromoCode(promoCode.trim());
    const result = applyPromotion(promoCode.trim());
    if (result.success) {
      setPromoMessage(`Applied: ${result.promotion.description}`);
    } else {
      setPromoMessage(result.message);
    }
  };
  
  const handleApplyPromoFromModal = (code) => {
    const promotion = promotions.find(p => p.code === code);
    
    // Check if this is a delivery promotion but we're not in delivery mode
    if (promotion && promotion.type === 'free_delivery' && activeTab !== 'Delivery') {
      setPromoMessage('This promotion is only valid for delivery orders');
      return;
    }
    
    setPromoCode(code);
    setDisplayedPromoCode(code);
    const result = applyPromotion(code);
    if (result.success) {
      setPromoMessage(`Applied: ${result.promotion.description}`);
    } else {
      setPromoMessage(result.message);
    }
  };
  
  // options tabs for delivery, pickup, or group delivery
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Delivery') {
      setPickupText('Enter delivery address');
    } else if (tab === 'Pickup') {
      setPickupText(`Pick up at: ${selectedLocation.name}`);
    } else {
      setPickupText('Group order: Share with friends');
    }
    
    // Check if current promotion is valid for the new tab
    if (appliedPromotion && appliedPromotion.type === 'free_delivery' && tab !== 'Delivery') {
      clearPromotion();
      setDisplayedPromoCode('');
      setPromoCode('');
      setPromoMessage('The applied promotion is not valid for this order type and has been removed');
    }
  };
  
  // Place order , require items in cart before allowing to place an order 
  const handlePlaceOrder = () => {
    if (parseFloat(subtotal) === 0) {
      alert('Please add items to your cart before placing an order');
      return;
    }

    if (activeTab === 'Group order') {
      navigate('/view-post-group-order');
      return;
    }
    setProcessing(true);
    localStorage.setItem('deliveryType', activeTab.toLowerCase());

    // Prepare location data based on delivery type
    const locationToSave = activeTab === 'Delivery'
      ? {
          name: "Custom Address",
          address: pickupText || "Enter delivery address",
          lat: 41.8717,
          lng: -87.6471
        }
      : selectedLocation;
    
    // Save location to localStorage
    try {
      localStorage.setItem('selectedLocation', JSON.stringify(locationToSave));
      console.log("Saved location:", locationToSave);
    } catch (e) {
      console.error("Error saving location to localStorage:", e);
    }
    
    // Generate and save order number , this a randomized number each time 
    const orderNum = Math.floor(100_000_000 + Math.random() * 900_000_000).toString();
    localStorage.setItem('orderNumber', orderNum);
    console.log("Generated order number:", orderNum);
    
    // Simulate order processing
    setTimeout(() => {
      setProcessing(false);
            console.log("Navigating to tracking page");
      navigate('/track-order');
    }, 1500);
  };

  const getItemImage = (item) => {
    // this returns the image path if it exists, our paths are in the data files organized by restaurant 
    return item.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Crect width="60" height="60" fill="%23f0f0f0"/%3E%3Cpath d="M30 15 L45 45 L15 45 Z" fill="%23ccc"/%3E%3C/svg%3E';
  };
  
  return (
    <div className="checkout-page">
      
      <div className="checkout-header">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <h2 className="checkout-title">Checkout Page - {activeTab}</h2>
      </div>
      
      <div className="restaurant-name">
        {currentRestaurantName || 'Your Order'}
      </div>
      
      {/* Cart Items Section */}
      <section className="checkout-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item, index) => {
              const itemImage = getItemImage(item);
              
              return (
                <li key={index} className="cart-item">
                  <div className="cart-item-img">
                    <img 
                      src={itemImage}
                      alt={item.name}
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      onError={(e) => {
                        // this handles the possible erro r of image not loading or not available 
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Crect width="60" height="60" fill="%23f0f0f0"/%3E%3Cpath d="M15 15 L45 45 M45 15 L15 45" stroke="%23cccccc" stroke-width="2"/%3E%3C/svg%3E';
                        e.target.onError = null;
                      }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <div className="price-quantity">
                      <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      
      <div className="info-box notes">
        <input type="text" placeholder="Notes for restaurant" />
      </div>
      
      <section className="boxes-grid">
        <div className="info-box total">
          <div>Subtotal: ${subtotal.toFixed(2)}</div>
          <div>Tax: ${tax.toFixed(2)}</div>
          <div>Delivery Fee: ${deliveryFee.toFixed(2)}</div>
          <div>Service Fee: ${serviceFee.toFixed(2)}</div>
          {discount > 0 && <div>Discount: -${discount.toFixed(2)}</div>}
          <div><strong>Total: ${finalTotal}</strong></div>
        </div>
        
        <div className="info-box promotions">
          <div>
            <div>Promotions:</div>
            <div>
              {displayedPromoCode ? (
                <span>Applied code: <span className="promo-code-highlight">{displayedPromoCode}</span></span>
              ) : (
                <span>No promotion applied</span>
              )}
            </div>
            {promoMessage && <div className="promo-message">{promoMessage}</div>}
          </div>
          <div 
            className="view-promotions"
            onClick={() => setShowPromotionsModal(true)}
          >
            View promotions
          </div>
        </div>
        
        <div 
          className="info-box pickup" 
          style={{ position: 'relative', cursor: activeTab === 'Delivery' ? 'text' : 'pointer' }} 
          onClick={() => {
            if (activeTab !== 'Delivery') {
              setShowLocationDropdown(!showLocationDropdown);
            }
          }}
        >
          {activeTab === 'Delivery' ? (
            <input 
              type="text" 
              value={pickupText}
              onChange={(e) => setPickupText(e.target.value)}
              placeholder="Enter delivery address"
              className="delivery-input"
              style={{
                border: 'none',
                width: '100%',
                outline: 'none',
                background: 'transparent'
              }}
            />
          ) : (
            pickupText
          )}
          {showLocationDropdown && activeTab !== 'Delivery' && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              width: '100%',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              zIndex: 10,
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {locationData.map((location, index) => (
                <div 
                  key={index} 
                  style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationSelect(location);
                  }}
                >
                  {location.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Order Tabs */}
      <div className="tabs-container">
        <div className="order-tabs">
          <div 
            className={`tab ${activeTab === 'Delivery' ? 'active' : ''}`}
            onClick={() => handleTabClick('Delivery')}
          >
            Delivery
          </div>
          <div 
            className={`tab ${activeTab === 'Pickup' ? 'active' : ''}`}
            onClick={() => handleTabClick('Pickup')}
          >
            Pickup
          </div>
          <div 
            className={`tab ${activeTab === 'Group order' ? 'active' : ''}`}
            onClick={() => handleTabClick('Group order')}
          >
            Group order
          </div>
        </div>
      </div>
      
      {/* Place Order Button using conc */}
      <button 
        className="place-order-button" 
        onClick={handlePlaceOrder}
      >
        {processing ? "Processing..." : "Place order"}
      </button>
      
      {/* Promotions Modal */}
      {showPromotionsModal && (
        <PromotionsModal 
          onClose={() => setShowPromotionsModal(false)}
          onApplyPromo={handleApplyPromoFromModal}
          orderType={activeTab}
        />
      )}
    </div>
  );
};

export default CheckoutPage;