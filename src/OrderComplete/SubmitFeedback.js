/**
 * This component renders a "Rate" button used to submit delivery feedback.
 * When clicked, it gathers the user's rating, feedback, and photo,
 * and simulates a submission by logging the data.
 * 
 * In the future, this could send the data to a backend service.
 * After submission, it navigates the user back to the landing page.
 */

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

        navigate('/');
    }

    return (
        <div submit-feedback-constainer>
            {rating === 0 && (
                <p className="rating-reminder">
                    A star rating is required to submit feedback.
                </p>
            )}
            <button 
                className="rate-btn" 
                onClick={handleSubmit}
                disabled={rating === 0}
            >
                Rate
            </button>
        </div>
    );
};

export default SubmitFeedback;