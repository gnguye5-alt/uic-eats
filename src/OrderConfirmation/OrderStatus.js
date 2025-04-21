/* This component displays a waiting screen after the user has locked their group order.
 - Shows a message of how many users are in the order
 - "Continue" buttonnavigates to the OrderConfirmed screen
 - "Back" button returns to the previous screen
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderStatus.css';

const OrderStatus = () => {
  const navigate = useNavigate();

  // Handle Continue button click
  const handleContinue = () => {
    // Navigate to the order confirmed screen
    navigate('/order-confirmed');
  };

  return (
    <div className="landing-page">
      <div className="confirmation-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-text">Back</span>
        </button>
        <h2 className="page-title">Order Status</h2>
      </div>

      <div className="status-container">
        <div className="status-content">
          <div className="status-text">
            There are 2 people in your order
          </div>

          <div className="status-actions">
            <div className="action-button" onClick={handleContinue}>Continue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;