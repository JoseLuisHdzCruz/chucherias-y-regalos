import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AccessibilityPanel from './components/AccessibilityPanel'; 
import Home from './routes/Home';
import ProductDetail from './routes/ProductDetail';
import PrivacyPolicy from './routes/PrivacyPolicy';
import Terms from './routes/Terms';
import Cookies from './routes/Cookies';
import AcercaDe from './routes/AcercaDe';
import Register from './routes/Register';

function App() {

  return (
    <Router>
      <div>

        {/* Incluye el componente de accesibilidad */}
        

        <Header />
        <AccessibilityPanel />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-cond" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/quienes-somos" element={<AcercaDe />} />
          <Route path="/registro" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;