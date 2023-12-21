import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import ProductDetail from './routes/ProductDetail';
import PrivacyPolicy from './routes/PrivacyPolicy';
import Terms from './routes/Terms';
// import CookiesBanner from './components/CookieBanner';  // Importa el nuevo componente
import AcercaDe from './routes/AcercaDe';
import Register from './routes/Register';
import Cookies from './routes/Cookies';
import NotFound  from './components/NotFound';

function App() {
  // const [showCookiesBanner, setShowCookiesBanner] = useState(true);

  useEffect(() => {
    // Agregar el script de integración de UserWay
    const userwayScript = document.createElement('script');
    userwayScript.src = 'https://cdn.userway.org/widget.js';
    userwayScript.async = true;
    userwayScript.setAttribute('data-account', 'rkULxaRfQO'); // Reemplaza con tu ID de cuenta de UserWay
    document.head.appendChild(userwayScript);

    // Limpieza al desmontar el componente
    return () => {
      document.head.removeChild(userwayScript);
    };
  }, []);

  // const handleAcceptCookies = () => {
  //   // Al hacer clic en "De acuerdo", oculta el banner de cookies
  //   setShowCookiesBanner(false);
  // };

  return (
    <Router>
      <div>
        <Header />
        {/* {showCookiesBanner && <CookiesBanner onAccept={handleAcceptCookies} />} Muestra el banner de cookies */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-cond" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/quienes-somos" element={<AcercaDe />} />
          <Route path="/registro" element={<Register />} />

          {/* Ruta por defecto para manejar cualquier otra ruta no definida */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;