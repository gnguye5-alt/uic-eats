/**
 * This component displays a confirmation screen after an order has been successfully delivered. 
 * The body scroll is locked while this screen is active. It shows a delivery success message, 
 * allows the user to rate and leave feedback, and provides a back button that clears stored 
 * delivery info upon exit.
 */

import React, { useState } from "react";
import BackButton from "../BackButton";
import FeedbackInput from "./FeedbackInput";
import SubmitFeedback from "./SubmitFeedback";
import './Completed.css';
import LockBodyScroll from "../hooks/LockBodyScroll";

const Completed = () => {
    LockBodyScroll();

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [photo, setPhoto] = useState(null);
    const onExit = () => {
        // Clear stored delivery info
        localStorage.removeItem('selectedLocation');
        localStorage.removeItem('deliveryType');
    }

    return (
        <div className="completed-delivery">
            <BackButton className="back-btn" route="/" onClick={onExit}/>

            <h1 className="completed-header">Successfully Delivered!</h1>
            <div className="delivery-icon">
                <img src={"/images/delivery.png"} className="delivery-image"/>
            </div>
            <p className="feedback-prompt">How was your order? Let us know!</p>

            <FeedbackInput 
                rating={rating} setRating={setRating}
                feedback={feedback} setFeedback={setFeedback}
                photo={photo} setPhoto={setPhoto}
            />

            <SubmitFeedback rating={rating} feedback={feedback} photo={photo}
                onClick={onExit}/>
        </div>
    )
};

export default Completed;