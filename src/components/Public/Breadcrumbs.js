import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdChevronRight, MdHome } from "react-icons/md";

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
  "forgot-passworg-secret-question": "Recuperar cuenta por pregunta secreta",
  "mas-vendidos": "Productos más vendidos",
  "category" : "Categoria",
  "update-address": "Actualizar dirección",
  "ofertas": "Productos en oferta",
  "notifications": "Notificaciones",
  "FAQs": "Preguntas frecuentes",
  "select-address": "Selección método de entrega",
  "select-payment": "Selección forma de pago"
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="cont-breadcrumbs">
      <span className="fw-semibold text-muted">
        <Link to="/" color="gray"><MdHome size={30} className="ml-4"/></Link>
        {pathnames.map((pathname, index) => (
          <React.Fragment key={index}>
            <MdChevronRight size={25} className="icon-aling" />
            <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
              {aliasMapping[pathnames[index]] || pathname}
            </Link>
          </React.Fragment>
        ))}
      </span>
    </div>
  );
};

export default Breadcrumbs;
