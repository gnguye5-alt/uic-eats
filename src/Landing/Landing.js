/**
 * This component is the landing page of the app.
 * It includes the TopBar, Filters, and a list of Restaurants, 
 * managing states for active food type, criteria filters, and search terms.
 */

import React, { useState } from 'react';
import TopBar from './TopBar';
import Filters from './Filters';
import GroupOrders from './GroupOrders';
import Restaurants from './Restaurants';
import './Landing.css';

const Landing = () => {
  const [activeFood, setActiveFood] = useState("Fast food");
  const [activeCriteria, setActiveCriteria] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="landing-page">
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* ✅ search bar */}
      
      <Filters 
        activeFood={activeFood}
        setActiveFood={setActiveFood}
        activeCriteria={activeCriteria}
        setActiveCriteria={setActiveCriteria}
      />

      {/* <GroupOrders /> */}

      <Restaurants 
        activeFood={activeFood}
        activeCriteria={activeCriteria}
        searchTerm={searchTerm} // ✅ pass to Restaurants
      />
    </div>
  );
};

export default Landing;
