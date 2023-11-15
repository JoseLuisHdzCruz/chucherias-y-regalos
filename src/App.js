import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Product from './routes/Product';
import PrivacyPolicy from './routes/PrivacyPolicy';
import Terms from './routes/Terms';
import Cookies from './routes/Cookies';

function App() {

  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-cond" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;