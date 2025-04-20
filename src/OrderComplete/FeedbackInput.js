/**
 * This component loads the input section for user delivery feedback.
 * It has a 5-star rating system, a input area for feedback, and an image upload field with a preview
 * 
 */

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCamera } from '@fortawesome/free-solid-svg-icons';

const FeedbackInput = ({ rating, feedback, photo, 
                        setRating, setFeedback, setPhoto
}) => {
    const handlePhotoUpload = (e) => {
        if(e.target.files[0]) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    return (
        <div className="feedback-input">
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= rating ? 'star filled' : 'star'}
                        onClick = {() => setRating(star)}
                    >
                        <FontAwesomeIcon icon={faStar} size="2x"></FontAwesomeIcon>
                    </span>
                ))}
            </div>
            <div className="feedback-box">
                <textarea 
                    className="feedback-text"
                    placeholder="Leave your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
            </div>
            <div className="photo-upload">
                {photo ? (
                    <>
                        <span className="camera">
                            <FontAwesomeIcon icon={faCamera} size="2x" className="camera-icon"></FontAwesomeIcon>  
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} />                  
                        </span>
                        <p>Please add some photos</p>
                        <img src={photo} className="preview"/>
                    </>
                ) : (
                    <>
                        <span className="camera">
                            <FontAwesomeIcon icon={faCamera} size="2x" className="camera-icon"></FontAwesomeIcon>  
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} />                  
                        </span>
                        <p>Please add some photos</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default FeedbackInput;