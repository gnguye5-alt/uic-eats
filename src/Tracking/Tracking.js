import React from "react";
import TrackingStatus from './TrackingStatus'
import BackButton from "../BackButton";
import Map from './Map';
import OrderDetails from "./OrderDetails";
import './Tracking.css';


const deliveryData = {
    pickup: {
        name: 'Pickup',
        address: '1151 W Taylor St, Chicago',
    },
    delivery: {
        name: 'Delivery',
        address: '906 S Miller St, Chicago',
    },
    'group order': {
        name: 'Group Order',
      address: '1234 W Taylor St, Chicago',
    }
  };

const deliveryType = 'group order';
const selectedType = deliveryData[deliveryType] ?? deliveryData['pickup'];

const Tracking = () => {
    return (
        <div className="tracking-page">
            <BackButton/>

            <TrackingStatus deliveryType={deliveryType}/>

            <Map deliveryType={deliveryType} selectedType={selectedType}/>

            <OrderDetails deliveryType={deliveryType} selectedType={selectedType}/>
        </div>
    );
};

export default Tracking;