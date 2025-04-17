import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import Restaurant from './Landing/Restaurant';
import ChooseRestaurant from './Landing/ChooseRestaurant';
import { CartProvider } from './Landing/CartContext'; 

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/group-order" element={<ChooseRestaurant />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
