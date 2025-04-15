import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
