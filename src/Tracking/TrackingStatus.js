/**
 * This component displays the current progress of the order using a progress bar.
 * It simulates an order completion timer and shows either:
 * - "Ready By" for pickup orders
 * - "Estimated Arrival" for delivery orders
 * 
 * Once the simulated progress reaches 100%, the user is automatically navigated to the
 * completed order screen (`/completed-order`).
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const TrackingStatus = ({ deliveryType }) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState('');
    
        //estimated completion time and update progress bar
        useEffect(() => {
            //get how much time it will take to complete order
            const increment = 34;
            const intervalDuration = 1_000_000; //10000 is 10s
            //ceil rounds up to integer
            const numUpdates = Math.ceil(100 / increment);
            const totalTime = numUpdates * intervalDuration;
    
            //calculate finish time
            const now = new Date();
            const finish = new Date(now.getTime() + totalTime);
            let hours = finish.getHours();
            const minutes = finish.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; //for the case hours equals 12
            setEstimatedTime(`${hours}:${minutes} ${ampm}`);
    
            //navigate to different page when order is complete
            const interval = setInterval(() => {
              setProgress(prev => {
                const updated = prev + increment;
                if (updated >= 100) {
                    clearInterval(interval); // stop when it reaches 100
                    navigate('/completed-order');
                    return updated;
                }
                return updated;
              });
            }, intervalDuration);
          
            return () => clearInterval(interval);
        }, [navigate]);


    return (
        <div className="tracking-status">
            <h1>Tracking Status</h1>

            <div className="finish-time">
                <span>
                    <strong>
                        {deliveryType === 'pickup' ? 'Ready By: ': 'Estimated Arrival: '}
                    </strong>
                </span>
                <span className="time-value">{estimatedTime}</span>
            </div>
            <div className="progress-bar">
                <div 
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default TrackingStatus;