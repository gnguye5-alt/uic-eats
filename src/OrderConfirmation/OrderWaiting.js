/* This component displays a waiting screen after the user has posted a group order.
 - Shows a message that the user is waiting for others to join the order
 - "Cancel" button returns to the previous screen
 - "Lock order" button navigates to the OrderStatus screen
 - "Back" button returns to the previous screen
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderWaiting.css';

const OrderWaiting = () => {
  const navigate = useNavigate();

  // Handle Cancel button click
  const cancel_clicked = () => {
    navigate(-1); // Go back to previous screen
  };

  // Handle Lock order button click
  const lock_clicked = () => {
    // Navigate to the order status screen
    navigate('/order-status');
  };

  return (
    <div className="landing-page">
      <div className="confirmation-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-text">Back</span>
        </button>
        <h2 className="page-title">Waiting for Orders</h2>
      </div>

      <div className="waiting-container">
        <div className="waiting-content">
          <div className="waiting-text">Waiting for people to join...</div>
          <div className="action-buttons">
            <div onClick={cancel_clicked}>Cancel</div>
            <div onClick={lock_clicked}>Lock Order</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWaiting;