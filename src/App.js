import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import ViewPostGroupOrder from './OrderConfirmation/ViewPostGroupOrder';
import PostConfirmation from './OrderConfirmation/PostConfirmation';
import OrderWaiting from './OrderConfirmation/OrderWaiting';
import OrderStatus from './OrderConfirmation/OrderStatus';
import OrderConfirmed from './OrderConfirmation/OrderConfirmed';
import Restaurant from './Landing/Restaurant';
import ChooseRestaurant from './Landing/ChooseRestaurant';
import { CartProvider } from './Landing/CartContext'; 
import CheckoutPage from './Landing/CheckoutPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/view-post-group-order" element={<ViewPostGroupOrder />} /> {/* temporary usage forq testing */}
          <Route path="/" element={<ViewPostGroupOrder />} />
          <Route path="/post-confirmation" element={<PostConfirmation />} />
          <Route path="/order-waiting" element={<OrderWaiting />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/group-order" element={<ChooseRestaurant />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
