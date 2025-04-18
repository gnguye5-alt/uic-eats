import React, { useState } from "react";
import BackButton from "../BackButton";
import FeedbackInput from "./FeedbackInput";
import SubmitFeedback from "./SubmitFeedback";
import './Completed.css';

const Completed = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [photo, setPhoto] = useState(null);

    return (
        <div className="completed-delivery">
            <BackButton className="back-btn" route="/tracking"/>

            <h1 class="completed-header">Successfully Delivered!</h1>
            <div className="delivery-icon">
                <img src={"/images/delivery.png"} className="delivery-image"/>
            </div>
            <p className="feedback-prompt">How was your order? Let us know!</p>

            <FeedbackInput 
                rating={rating} setRating={setRating}
                feedback={feedback} setFeedback={setFeedback}
                photo={photo} setPhoto={setPhoto}
            />

            <SubmitFeedback rating={rating} feedback={feedback} photo={photo}/>
        </div>
    )
};

export default Completed;