/* This component displays a list of available group orders based on their  distance from the user's current location (currently hardcoded to Thomas Beckham Hall).
 - "Back" button returns to the previous screen
*/

import React, { useState, useEffect } from "react";
import "./ViewPostGroupOrder.css";
import { useNavigate } from "react-router-dom";
import pickupPoints from "../data/PickupPoints.json";

const ViewPostGroupOrder = () => {
  const navigate = useNavigate();
  const [locationLoading, set_loc_load] = useState(true);
  const [groupOrders, set_group_order] = useState([]);

  // Navigate to the PostConfirmation screen when the user clicks on the post group order box (this is just temporary for testing)
  const handlePostGroupOrder = () => {
    navigate("/post-confirmation");
  };

  // Navigate to the OrderStatus screen when the user clicks on a group order box
  const handleOrderBoxClick = (order) => {
    localStorage.setItem('selectedLocation', JSON.stringify(order)); //NF: line added
    localStorage.setItem('deliveryType', 'group order'); //NF: line added
    navigate("/order-status");
  };

  // Calculate distance between 2 places
  const distance_calc = (lat1, lon1, lat2, lon2) => {
    const radius = 3958.8;
    const lat_diff = ((lat2 - lat1) * Math.PI) / 180;
    const lng_diff = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(lat_diff / 2) * Math.sin(lat_diff / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(lng_diff / 2) * Math.sin(lng_diff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance.toFixed(1);
  };

  // From the current location, calculate distances to each pickup point
  useEffect(() => {
    set_loc_load(true);

    // Location - TBH
    const curr_lat = 41.865657;
    const curr_long = -87.647191;

    // Calculate distance for each pickup point
    const distance_betw_each_points = pickupPoints.map((point) => {
      const distance_miles = distance_calc(
        curr_lat,
        curr_long,
        point.lat,
        point.lng
      );
      return {
        name: point.name,
        miles: `${distance_miles} miles away`,
        address: point.address,
      };
    });

    // Sort by distance (closest first)
    distance_betw_each_points.sort((a, b) => {
      const point1 = parseFloat(a.miles.split(" ")[0]);
      const point2 = parseFloat(b.miles.split(" ")[0]);
      return point1 - point2;
    });

    set_group_order(distance_betw_each_points);
    set_loc_load(false);
  }, []);

  return (
    <div className="landing-page">
      <div className="confirmation-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-text">Back</span>
        </button>
        <h2 className="page-title">Current Active Group Order</h2>
      </div>

      {locationLoading ? (
        <div className="loading-indicator">Distance away...</div>
      ) : (
        <div className="order-boxes-wrapper">
          {groupOrders.map((order, index) => (
            <div
              className="order-box"
              key={index}
              onClick={() => handleOrderBoxClick(order)}
            >
              <div>Fees you pay:</div>
              <div>{order.miles}</div>
              <div className="order-address">
                Address: <br />
                {order.name}
                <br />
                {order.address}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="alt-option-text">Not the group you want?</h3>

      <div className="post-box" onClick={handlePostGroupOrder}>
        Post group order so others can join!
      </div>
    </div>
  );
};

export default ViewPostGroupOrder;
