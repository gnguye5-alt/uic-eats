import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/group-orders.json')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="section">
      <h2 className="section-title">Current active group orders</h2>
      <div className="group-orders">
        {orders.map((order, index) => (
          <div
            key={index}
            className="order-card"
            onClick={() => navigate(`/restaurant/${order.id}`)}
            style={{ cursor: 'pointer' }} 
          >
            <p className="restaurant-name">{order.restaurant}</p>
            <p className="fees-text">Fees you pay:</p>
            <p className="miles-text">{order.distance}</p>
            <p className="address-label">Address: {order.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupOrders;
