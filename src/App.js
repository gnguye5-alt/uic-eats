import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import ViewPostGroupOrder from './OrderConfirmation/ViewPostGroupOrder';
import PostConfirmation from './OrderConfirmation/PostConfirmation';
import OrderWaiting from './OrderConfirmation/OrderWaiting';
import OrderStatus from './OrderConfirmation/OrderStatus';
import OrderConfirmed from './OrderConfirmation/OrderConfirmed';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/view-post-group-order" element={<ViewPostGroupOrder />} /> {/* temporary usage forq testing */}
          <Route path="/" element={<ViewPostGroupOrder />} />
          <Route path="/post-confirmation" element={<PostConfirmation />} />
          <Route path="/order-waiting" element={<OrderWaiting />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
