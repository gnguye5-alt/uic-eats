import React from 'react';

const orders = [
  "0.5 miles", "0.7 miles", "0.2 miles", "0.1 miles", "0.3 miles", "1.0 miles", "1.2 miles"
];

const GroupOrders = () => {
  return (
    <div className="section">
      <h2 className="section-title">Current active group orders</h2>
      <div className="group-orders">
        {orders.map((miles, index) => (
          <div key={index} className="order-card" onClick={() => alert('Go to group order page')}>
            <p className="fees-text">Fees you pay:</p>
            <p className="miles-text">{miles}</p>
            <p className="address-label">Address:</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupOrders;
