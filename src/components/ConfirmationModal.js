import React from 'react';
import './SharedStyles.css';

const ConfirmationModal = ({ show, onClose, total, deliveryMethod, deliveryDetails }) => {
  return (
    <div className="confirmation-modal" style={{ display: show ? 'flex' : 'none' }}>
      <div className="confirmation-content">
        <h3>Order Confirmed!</h3>
        <p>Your order has been placed successfully.</p>
        <p>Estimated delivery time: 30-45 minutes</p>
        {total && <p>Total: ${total}</p>}
        {deliveryMethod && <p>Method: {deliveryMethod}</p>}
        {deliveryDetails && <p>{deliveryDetails}</p>}
        <button className="confirm-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;