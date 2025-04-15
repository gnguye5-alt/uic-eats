import React from 'react';

const foodOptions = ["Fast food", "Chinese", "Thai", "Snacks", "Bubble Tea"];
const criteriaOptions = ["Cheap", "Fast", "Great for finals", "Big portions"];

const Filters = ({ activeFood, setActiveFood, activeCriteria, setActiveCriteria }) => {

  const toggleFilter = (value, type) => {
    if (type === "food") {
      setActiveFood(value === activeFood ? "" : value);
    } else {
      setActiveCriteria(value === activeCriteria ? "" : value);
    }
  };

  return (
    <div className="filters">
      <div className="filter-row">
        {foodOptions.map((food) => (
          <button
            key={food}
            className={`filter-button ${activeFood === food ? 'active' : ''}`}
            onClick={() => toggleFilter(food, "food")}
          >
            {food}
          </button>
        ))}
      </div>

      <div className="filter-row second-row">
        {criteriaOptions.map((criteria) => (
          <button
            key={criteria}
            className={`filter-button ${activeCriteria === criteria ? 'active' : ''}`}
            onClick={() => toggleFilter(criteria, "criteria")}
          >
            {criteria}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
