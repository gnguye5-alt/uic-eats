/* This component displays a track order option for user after they have placed the order.
 - Shows a message informing the order is confirmed
 - "Track order" button navigates to the Track Order screen
 - "x" button closes the screen
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmed.css';

const OrderConfirmed = () => {
  const navigate = useNavigate();

  // Track order button click  
  const track_clicked = () => {
    navigate('/track-order');
  };

  // Close button click
  const close_clicked = () => {
    navigate('/'); // will navigate to Nathan's page
  };

  return (
    <div className="landing-page">
      <div className="confirmation-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-text">Back</span>
        </button>
        <h2 className="page-title">Order Confirmed</h2>
      </div>

      <div className="confirmed-container">
        <div className="confirmed-content">
          <div className="confirmed-title">Your order has been confirmed!</div>
          <div className="confirmed-actions">
            <div className="action-button" onClick={track_clicked}>
              Track Order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;