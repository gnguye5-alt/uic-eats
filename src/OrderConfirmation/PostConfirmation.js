/* This component renders a confirmation screen asking the user whether they want to post a group order.
 - "Back" and "No" buttons both return to the previous screen
 - "Yes" button navigates to the OrderWaiting screen
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostConfirmation.css';

const PostConfirmation = () => {
  const navigate = useNavigate();

  // Back button handler
  const back_clicked = () => {
    navigate(-1);
  };

  // No button handler
  const no_clicked = () => {
    navigate(-1);
  };

  // Yes button handler: this will navigate to the waiting screen
  const yes_clicked = () => {
    navigate('/order-waiting');
  };

  return (
    <div className="post-confirmation-container">
      <div className="back-button" onClick={back_clicked}>Back</div>
      
      <div className="confirmation-content">
        <div className="confirmation-text">
          Do you want to post this order?
        </div>

        <div className="confirmation-actions">
          <div className="action-button" onClick={no_clicked}>No</div>
          <div className="action-button" onClick={yes_clicked}>Yes</div>
        </div>
      </div>
    </div>
  );
};

export default PostConfirmation;