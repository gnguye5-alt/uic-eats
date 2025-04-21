/**
 * This component creates a full tracking page for an active delivery or pickup.
 * The body scroll is locked while this screen is active.
 * 
 * Quick overview of components:
 * - A back button to return to the previous screen (`BackButton`)
 * - A dynamic status bar that shows progress (`TrackingStatus`)
 * - An interactive map the shows the delivery/pickup location (`Map`)
 * - An order details panel with draggable functionality (`OrderDetails`)
 * 
 * It retrieves `deliveryType` and `selectedLocation` from localStorage with fallback values. 
 * Converts delivery types to be a display equivalent (e.g., 'pickup' = 'Pickup') in selectedType.
 * It also, generates a random 9-digit order number for tracking display, which is temporary 
 * and will be replaced with an actual order number generated and stored at checkout.
 */

import React from "react";
import TrackingStatus from './TrackingStatus'
import BackButton from "../BackButton";
import Map from './Map';
import OrderDetails from "./OrderDetails";
import './Tracking.css';
import LockBodyScroll from "../hooks/LockBodyScroll";

const displayNames = {
    pickup: 'Pickup',
    delivery: 'Delivery',
    'group order': 'Group Order',
  };

const orderNum = localStorage.getItem('orderNumber');

const Tracking = () => {
    LockBodyScroll();

    // Retrieve the delivery type from localStorage (default to 'pickup' if not found)
    const deliveryType = localStorage.getItem('deliveryType') ?? 'pickup'
    
    // Try to retrieve the selected pickup/delivery location from localStorage
    const storedLocation = JSON.parse(localStorage.getItem('selectedLocation'));;
    
    // create object for selected location, use a fallback if none is found
    const selectedType = storedLocation ? {
        ...storedLocation,
        type: displayNames[deliveryType],
    } : {
        type: displayNames[deliveryType],
        address: '1234 W Taylor St, Chicago, IL 60607',
    }

    return (
        <div className="tracking-page">
            <BackButton route={-1}/>

            <TrackingStatus deliveryType={deliveryType}/>

            <Map deliveryType={deliveryType} selectedType={selectedType}/>

            <OrderDetails deliveryType={deliveryType} selectedType={selectedType} orderNum={orderNum}/>
        </div>
    );
};

export default Tracking;