import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Public
// Componentes publicos
import PublicHeader from "./components/Public/PublicHeader";
import PublicFooter from "./components/Public/PublicFooter";
import NotFound from "./components/Public/NotFound";

//Contenido Publico
import Home from "./routes/Public/Home";
import ProductDetail from "./routes/Public/ProductDetail";
import PrivacyPolicy from "./routes/Public/PrivacyPolicy";
import Terms from "./routes/Public/Terms";
// import CookiesBanner from './components/CookieBanner';  // Importa el nuevo componente
import AcercaDe from "./routes/Public/AcercaDe";
import Register from "./routes/Public/Register";
import Cookies from "./routes/Public/Cookies";
import NewAddress from "./routes/Public/NewAddress";
import UserProfile from "./routes/Public/UserProfile";
import Carrito from "./routes/Public/Carrito";
import PurchaseHistory from "./routes/Public/PurchaseHistory";

//Admin
// Componentes publicos
import AdminHeader from "./components/Admin/AdminHeader";
import AdminFooter from "./components/Admin/AdminFooter";
import Sidebar from "./components/Admin/Sidebar";

//Contenido administrativo
import HomeAdmin from "./routes/Admin/Home";
import Inventario from "./routes/Admin/Inventario";
import AddProduct from "./routes/Admin/AddProduct"


function App() {
  // const [showCookiesBanner, setShowCookiesBanner] = useState(true);

  useEffect(() => {
    // Agregar el script de integración de UserWay
    const userwayScript = document.createElement("script");
    userwayScript.src = "https://cdn.userway.org/widget.js";
    userwayScript.async = true;
    userwayScript.setAttribute("data-account", "rkULxaRfQO"); // Reemplaza con tu ID de cuenta de UserWay
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

  const title = "Chucherias & Regalos";

  const PublicRoutes = () => (
    <>
      {/* Area publica */}
      <PublicHeader />
        {/* {showCookiesBanner && <CookiesBanner onAccept={handleAcceptCookies} />} Muestra el banner de cookies */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-cond" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/quienes-somos" element={<AcercaDe />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/new-address" element={<NewAddress />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/checkup" element={<Carrito />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          

          {/* Ruta por defecto para manejar cualquier otra ruta no definida */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PublicFooter />
    </>
  );
  
  const AdminRoutes = () => (
    <>
      <AdminHeader />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomeAdmin title={title} />} />
        <Route path="/inventory" element={<Inventario title={title} />} />
        <Route path="/inventory/add-product" element={<AddProduct title={title} />} />

      </Routes>
      <AdminFooter />
    </>
  );
  
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />

      </Routes>
    </Router>
  );
  
  
}

export default App;
