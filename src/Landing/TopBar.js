// import React from 'react';

// const TopBar = () => {
//   return (
//     <div className="top-bar">
//       <div className="top-bar-header">
//         <div className="logo">UIC EATS</div>
//         <button className="group-order-button" onClick={() => alert('Group Ordering')}>
//           Group ordering
//         </button>
//       </div>
//       <div className="search-container">
//         <span className="search-icon">🔍</span>
//         <input type="text" className="search-input" placeholder="Look up for restaurant or cuisine" />
//       </div>
//     </div>
//   );
// };

// export default TopBar;

//Temporary usage for testing 
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const TopBar = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  
  // Function to handle navigation to ViewPostGroupOrder
  const handleGroupOrdering = () => {
    navigate('/view-post-group-order'); // Adjust the path if needed
  };
  
  return (
    <div className="top-bar">
      <div className="top-bar-header">
        <div className="logo">UIC EATS</div>
        <button 
          className="group-order-button" 
          onClick={handleGroupOrdering}
        >
          Group ordering
        </button>
      </div>
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input type="text" className="search-input" placeholder="Look up for restaurant or cuisine" />
      </div>
    </div>
  );
};

export default TopBar;