import React, { useState } from 'react';
import TopBar from './TopBar';
import Filters from './Filters';
import GroupOrders from './GroupOrders';
import Restaurants from './Restaurants';
import './Landing.css';

const Landing = () => {
  const [activeFood, setActiveFood] = useState("Fast food");
  const [activeCriteria, setActiveCriteria] = useState("");

  return (
    <div className="landing-page">
      <TopBar />
      <Filters 
        activeFood={activeFood}
        setActiveFood={setActiveFood}
        activeCriteria={activeCriteria}
        setActiveCriteria={setActiveCriteria}
      />
      <GroupOrders />
      <Restaurants activeFood={activeFood} activeCriteria={activeCriteria} />
    </div>
  );
};

export default Landing;
