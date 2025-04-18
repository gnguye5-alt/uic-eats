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
    <div className="waiting-container">
      <div className="back-button" onClick={() => navigate(-1)}>Back</div>

      <div className="waiting-content">
        <div className="waiting-text">
          Waiting for people to join your order...
        </div>

        <div className="action-buttons">
          <div className="action-button" onClick={cancel_clicked}>Cancel</div>
          <div className="action-button" onClick={lock_clicked}>Lock order</div>
        </div>
      </div>
    </div>
  );
};

export default OrderWaiting;