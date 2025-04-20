/**
 * This component renders a "Rate" button used to submit delivery feedback.
 * When clicked, it gathers the user's rating, feedback, and photo,
 * and simulates a submission by logging the data.
 * 
 * In the future, this could send the data to a backend service.
 * After submission, it navigates the user back to the landing page.
 */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SubmitFeedback = ({ rating, feedback, photo }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract restaurantId from previous page state or URL
    const restaurantId = new URLSearchParams(location.search).get("restaurantId");

    const handleSubmit = () => {
        const submission = {
            id: Date.now(),  // unique id
            user: "You",     // or use logged-in user if available
            rating,
            comment: feedback,
            photos: photo ? [photo] : []
        };

        if (restaurantId) {
            const key = `reviews-${restaurantId}`;
            const existing = JSON.parse(localStorage.getItem(key)) || [];
            const updated = [submission, ...existing];  // newest first
            localStorage.setItem(key, JSON.stringify(updated));
            console.log(`Saved to localStorage under ${key}`, updated);
        } else {
            console.warn("Missing restaurantId! Feedback not saved.");
        }

        navigate('/');
    };

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
