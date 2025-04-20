import React from 'react';
import './SharedStyles.css';

const OrderTabs = ({ activeTab, onTabClick }) => {
  const tabs = ['Delivery', 'Pickup', 'Group order'];
  
  return (
    <div className="order-tabs">
      {tabs.map(tab => (
        <div 
          key={tab}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default OrderTabs;