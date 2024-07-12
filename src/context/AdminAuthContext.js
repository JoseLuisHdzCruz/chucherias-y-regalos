import React, { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [admin, setAdmin] = useState(null);

  const setAdminAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);

    // Decodifica el token para obtener la información del administrador
    const decoded = jwtDecode(newToken);
    setAdmin(decoded);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ token, admin, setAdminAuthToken, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
