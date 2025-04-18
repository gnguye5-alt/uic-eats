import React from "react";
import { useNavigate } from "react-router-dom";

const SubmitFeedback = ({ rating, feedback, photo }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        const submission = {
            rating,
            feedback,
            photo: photo || null
        };

        // would need to sent submission to backend
        // so we will just log it on the console
        console.log("Submission JSON: ", submission);
        //could save it to local storage
        // localStorage.setItem('deliveryFeedback', JSON.stringify(submission));

        navigate('/tracking');
    }

    return (
        <button 
            className="rate-btn" 
            onClick={handleSubmit}
            disabled={rating === 0}
        >
            Rate
        </button>
    );
};

export default SubmitFeedback;