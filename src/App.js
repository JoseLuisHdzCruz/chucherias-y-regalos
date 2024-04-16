import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./Layout/Layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//Public
// Componentes publicos
import NotFound from "./components/Public/NotFound";
import Error500 from "./components/Public/Error500";
import Error400 from "./components/Public/Error400";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import KeyVerifly from "./components/KeyVerifly";
import KeyVeriflyWhatsApp from "./components/KeyVeriflyWhatsApp";

import SecretQuestion from "./components/SecretQuestion";
import GrowthCalculator from "./routes/Public/Mate";

//Contenido Publico
import Home from "./routes/Public/Home";
import CategoriaProductos from "./routes/Public/CategoriaProductos";
import MasVendidos from "./routes/Public/MasVendifos";
import Ofertas from "./routes/Public/Ofertas";
import ProductDetail from "./routes/Public/ProductDetail";
import Notifications from "./routes/Public/Notifications";
// import ProductDetail2 from "./routes/Public/ProductDetail2";
import PrivacyPolicy from "./routes/Public/PrivacyPolicy";
import Terms from "./routes/Public/Terms";
// import CookiesBanner from './components/CookieBanner';  // Importa el nuevo componente
import AcercaDe from "./routes/Public/AcercaDe";
import Register from "./routes/Public/Register";
import Cookies from "./routes/Public/Cookies";
import FAQs from "./routes/Public/FAQs";
import NewAddress from "./routes/Public/NewAddress";
import UserProfile from "./routes/Public/UserProfile";
import Carrito from "./routes/Public/Carrito";
import SelectAddress from "./routes/Public/SelectAddress";
import SelectPayment from "./routes/Public/SelectPayment";
import PurchaseHistory from "./routes/Public/PurchaseHistory";
import Search from "./routes/Public/Search";
import { useAuth } from "./context/AuthContext";

//Admin
// Componentes publicos
import AdminHeader from "./components/Admin/AdminHeader";
import AdminFooter from "./components/Admin/AdminFooter";
import Sidebar from "./components/Admin/Sidebar";

//Contenido administrativo
import HomeAdmin from "./routes/Admin/Home";
import Inventario from "./routes/Admin/Inventario";
import AddProduct from "./routes/Admin/AddProduct";

const GuardedLayout = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      
      navigate("/");
      setTimeout(() => {
        toast.error("Para la siguiente accion debe iniciar sesión.");//Verificar el porque no se muestra la alerta
      }, 500);
    }
  }, [token]);
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

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
  useEffect(() => {
    // Agregar el script de integración de UserWay
    const userwayScript = document.createElement("script");
    userwayScript.src = "https://cdn.userway.org/widget.js";
    userwayScript.async = true;
    userwayScript.setAttribute("data-account", "rkULxaRfQO"); // Reemplaza con tu ID de cuenta de UserWay
    document.head.appendChild(userwayScript);

    // Agregar el script de integración de Tidio
    const tidioScript = document.createElement("script");
    tidioScript.src = "//code.tidio.co/ruymp7hqbh9vwln4cmdmkh0vczoxefun.js";
    tidioScript.async = true;
    document.head.appendChild(tidioScript);

    // Limpieza al desmontar el componente
    return () => {
      document.head.removeChild(userwayScript);
      document.head.removeChild(tidioScript);
    };
  }, []);

  const title = "Chucherias & Regalos";

  const PublicRoutes = () => (
    <>
      {/* Area publica */}
          <Routes>
            {/* Rutas publicas */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/category/:id" element={<Layout><CategoriaProductos /></Layout>} />
            <Route path="/mas-vendidos" element={<Layout><MasVendidos /></Layout>} />
            <Route path="/ofertas" element={<Layout><Ofertas /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms-cond" element={<Layout><Terms /></Layout>} />
            <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
            <Route path="/FAQs" element={<Layout><FAQs /></Layout>} />
            <Route path="/quienes-somos" element={<Layout><AcercaDe /></Layout>} />
            <Route path="/registro" element={<Layout><Register /></Layout>} />
            <Route path="/search" element={<Layout><Search /></Layout>} />
            <Route path="/mate" element={<Layout><GrowthCalculator /></Layout>} />

            {/* Ruta por defecto para manejar cualquier otra ruta no definida */}
            <Route path="/back" element={<Layout><NavigateBack /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
            <Route path="/error-500" element={<Layout><Error500 /></Layout>} />
            <Route path="/error-400" element={<Layout><Error400 /></Layout>} />
            <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/change-password/:correo" element={<Layout><ChangePassword /></Layout>}/>
            <Route path="/key-verification/:correo" element={<Layout><KeyVerifly /></Layout>} />
            <Route path="/key-verification-whatsapp/:correo" element={<Layout><KeyVeriflyWhatsApp /></Layout>} />
            <Route path="/forgot-passworg-secret-question/:correo" element={<Layout><SecretQuestion /></Layout>} />
          </Routes>
    </>
  );

  const AdminRoutes = () => (
    <>
      <AdminHeader />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomeAdmin title={title} />} />
        <Route path="/inventory" element={<Inventario title={title} />} />
        <Route
          path="/inventory/add-product"
          element={<AddProduct title={title} />}
        />
      </Routes>
      <AdminFooter />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/new-address" element={<GuardedLayout><NewAddress /></GuardedLayout>}/>
        <Route path="/update-address/:id" element={<GuardedLayout><NewAddress /></GuardedLayout>}/>
        <Route path="/user-profile" element={<GuardedLayout><UserProfile /></GuardedLayout>}/>
        <Route path="/checkup" element={<GuardedLayout><Carrito /></GuardedLayout>}/>
        <Route path="/purchase-history" element={<GuardedLayout><PurchaseHistory /></GuardedLayout>}/>
        <Route path="/select-address" element={<GuardedLayout><SelectAddress /></GuardedLayout>}/>
        <Route path="/select-payment" element={<GuardedLayout><SelectPayment /></GuardedLayout>}/>
        <Route path="/notifications" element={<GuardedLayout><Notifications /></GuardedLayout>}/>

      </Routes>
      <ToastContainer 
        autoClose={2000} // La alerta se cerrará automáticamente después de 3 segundos
        closeOnClick={true} // La alerta se cerrará al hacer clic en ella
      />
    </Router>
  );
}

export default App;
