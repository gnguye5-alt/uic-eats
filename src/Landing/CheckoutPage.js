import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { usePromotions } from '../components/PromotionsContext';
import '../components/SharedStyles.css';
import './CheckoutPage.css'; // Import the new CSS file
import OrderTabs from '../components/OrderTabs';
import ConfirmationModal from '../components/ConfirmationModal';
import PromotionsModal from '../components/PromotionsModal';

// UIC Campus locations
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
  
  // Get cart data from CartContext
  // const cartContextValue = useContext(CartContext);
  // console.log("CartContext value:", cartContextValue);

  // const { 
  //   cart, 
  //   currentRestaurantId, 
  //   currentRestaurantName 
  // } = useContext(CartContext);

  const cart = [{"id":1,"name":"Tonkotsu Ramen","description":"Pork broth with chashu pork, scallions, egg, garlic oil, and nori.","price":14.99,"category":"Ramen","likes":119,"votes":135,"image":"/images/menu/ramen-tonkotsu.jpg","quantity":1}];
  const currentRestaurantId = "1";
  const currentRestaurantName = "Ramen House";
  
  // Get promotions functionality
  const { 
    promotions,
    appliedPromotion, 
    applyPromotion, 
    clearPromotion, 
    calculateDiscount 
  } = usePromotions();
  
  // States for checkout page
  const [activeTab, setActiveTab] = useState('Delivery');
  const [selectedLocation, setSelectedLocation] = useState(locationData[0]);
  const [pickupText, setPickupText] = useState(`Delivery to: ${locationData[0].name}`);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  // States for promotions
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);
  const [displayedPromoCode, setDisplayedPromoCode] = useState('');
  
  // Calculate cart total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.0625; // 6.25% tax rate
  const deliveryFee = activeTab === 'Delivery' ? 2.99 : 0;
  const serviceFee = subtotal * 0.05; // 5% service fee
  
  // Calculate discounted total
  const rawSubtotal = subtotal.toFixed(2);
  const discount = calculateDiscount(rawSubtotal);
  const totalBeforeDiscount = subtotal + tax + deliveryFee + serviceFee;
  const finalTotal = (totalBeforeDiscount - parseFloat(discount)).toFixed(2);
  
  // Handle empty cart redirect
  useEffect(() => {
    if (cart.length === 0) {
      // Uncomment this to automatically redirect when cart is empty
      // navigate('/');
    }
  }, [cart, navigate]);
  
  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    
    if (activeTab === 'Delivery') {
      setPickupText(`Delivery to: ${location.name}`);
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
    
    // Check if this is a delivery promotion but we're not in delivery mode
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
  
  // Handle applying promo from modal
  const handleApplyPromoFromModal = (code) => {
    // Get the promotion from the code
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
  
  // Tab click handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Delivery') {
      setPickupText(`Delivery to: ${selectedLocation.name}`);
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
  
  // Place order handler
  const handlePlaceOrder = () => {
    if (parseFloat(subtotal) === 0) {
      alert('Please add items to your cart before placing an order');
      return;
    }
    
    setProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setProcessing(false);
      setShowConfirmation(true);
    }, 1500);
  };
  
  // Confirmation close handler
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // !! TODO: FIX
    // Clear cart and promos after successful order
    // clearCart();
    // clearPromotion();
    // setDisplayedPromoCode('');
    // setPromoCode('');
    // Navigate to home
    navigate('/');
  };

  // Determine back link based on restaurant ID
  const backLink = currentRestaurantId ? `/restaurant/${currentRestaurantId}` : '/';
  
  return (
    <div className="checkout-page">
      <style>
        {`
          .promo-code-highlight {
            color: #3478F6;
            font-weight: bold;
          }
        `}
      </style>

      <div className="checkout-header">
        <Link to={backLink} className="back-button">Back</Link>
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
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-img"></div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <div className="price-quantity">
                    <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
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
          {parseFloat(discount) > 0 && <div>Discount: -${parseFloat(discount).toFixed(2)}</div>}
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
              value={pickupText.replace('Delivery to: ', '')}
              onChange={(e) => setPickupText(`Delivery to: ${e.target.value}`)}
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
      
      {/* Place Order Button */}
      <button 
        className="place-order-button" 
        onClick={handlePlaceOrder}
        style={{
          backgroundColor: '#3478F6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          textAlign: 'center',
          margin: '20px auto',
          display: 'block'
        }}
      >
        Place order
      </button>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal 
          show={true}
          onClose={handleConfirmationClose}
          total={finalTotal}
          deliveryMethod={activeTab}
          deliveryDetails={pickupText}
        />
      )}
      
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