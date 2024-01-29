import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";

const aliasMapping = {
  "product": "Detalle del Producto",
  "privacy-policy": "Política de Privacidad",
  "terms-cond": "Términos y Condiciones",
  "cookies": "Cookies",
  "quienes-somos": "Acerca De",
  "registro": "Registro",
  "new-address": "Nueva Dirección",
  "user-profile": "Perfil de Usuario",
  "checkup": "Carrito de Compras",
  "purchase-history": "Historial de Compra",
  "back": "Regresar",
  "error-500": "Error 500",
  "forgot-password": "Recuperar Contraseña",
  "change-password": "Cambiar contraseña",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="cont-breadcrumbs mt-4">
      <h5 className="fw-semibold">
        <Link to="/">Inicio</Link>
        {pathnames.map((pathname, index) => (
          <React.Fragment key={index}>
            <MdChevronRight size={25} className="icon-aling" />
            <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
              {aliasMapping[pathnames[index]] || pathname}
            </Link>
          </React.Fragment>
        ))}
      </h5>
    </div>
  );
};

export default Breadcrumbs;
