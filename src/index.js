import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client"; // Importa createRoot desde react-dom/client
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./modalConfig"; // Importa el archivo de configuración de react-modal
import { AuthProvider } from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </CartContextProvider>
  </AuthProvider>
);

// Si deseas medir el rendimiento de tu aplicación, puedes usar reportWebVitals
reportWebVitals();
