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
    <div className="confirmed-container">
      <div className="close-button" onClick={close_clicked}>×</div>

      <div className="confirmed-content">
        <h1 className="confirmed-title">Order Confirmed!</h1>

        <div className="confirmed-actions">
          <div className="action-button" onClick={track_clicked}>
            Track Order
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;