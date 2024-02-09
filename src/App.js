import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

//Public
// Componentes publicos
import PublicHeader from "./components/Public/PublicHeader";
import PublicFooter from "./components/Public/PublicFooter";
import Breadcrumbs from "./components/Breadcrumbs";
import NotFound from "./components/Public/NotFound";
import Error500 from "./components/Public/Error500";
import Error400 from "./components/Public/Error400";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import KeyVerifly from "./components/KeyVerifly";

//Contenido Publico
import Home from "./routes/Public/Home";
import ProductDetail from "./routes/Public/ProductDetail";
import ProductDetail2 from "./routes/Public/ProductDetail2";
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
import Search from "./routes/Public/Search";

//Admin
// Componentes publicos
import AdminHeader from "./components/Admin/AdminHeader";
import AdminFooter from "./components/Admin/AdminFooter";
import Sidebar from "./components/Admin/Sidebar";

//Contenido administrativo
import HomeAdmin from "./routes/Admin/Home";
import Inventario from "./routes/Admin/Inventario";
import AddProduct from "./routes/Admin/AddProduct"

const NavigateBack = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    goBack();
  }, []); // Ejecutar la función goBack una vez al montar el componente

  return null;
};

function App() {

  // const [showCookiesBanner, setShowCookiesBanner] = useState(true);

  useEffect(() => {
    // Agregar el script de integración de UserWay
    const userwayScript = document.createElement("script");
    userwayScript.src = "https://cdn.userway.org/widget.js";
    userwayScript.async = true;
    userwayScript.setAttribute("data-account", "rkULxaRfQO"); // Reemplaza con tu ID de cuenta de UserWay
    document.head.appendChild(userwayScript);

    // Agregar el script de integración de Tidio
    const tidioScript = document.createElement('script');
    tidioScript.src = '//code.tidio.co/ruymp7hqbh9vwln4cmdmkh0vczoxefun.js';
    tidioScript.async = true;
    document.head.appendChild(tidioScript);

    // Limpieza al desmontar el componente
    return () => {
      document.head.removeChild(userwayScript);
      document.head.removeChild(tidioScript);
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
      <Breadcrumbs />
        {/* {showCookiesBanner && <CookiesBanner onAccept={handleAcceptCookies} />} Muestra el banner de cookies */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/product2" element={<ProductDetail2 />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-cond" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/quienes-somos" element={<AcercaDe />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/new-address" element={<NewAddress />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/checkup" element={<Carrito />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/search" element={<Search />} />
          

          {/* Ruta por defecto para manejar cualquier otra ruta no definida */}
          <Route path="/back" element={<NavigateBack />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/error-500" element={<Error500 />} />
          <Route path="/error-400" element={<Error400 />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password/:correo" element={<ChangePassword />} />
          <Route path="/key-verification/:correo" element={<KeyVerifly />} />

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
