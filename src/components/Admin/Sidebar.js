import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdAttachMoney,
  MdFormatListNumbered,
  MdQueryStats,
  MdPercent,
  MdLocalShipping,
  MdNotifications
} from "react-icons/md";

const Sidebar = () => {

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-2">
      <a href="/admin" className="brand-link">
        <img
          src="/images/Imagen1-3n4j4J1C4-transformed (1).jpg"
          alt="Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">
          Chucherias & Regalos
        </span>
      </a>

      <section className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item d-flex">
              <NavLink
                to="/admin/inventory"
                className="nav-link"
                activeClassName="active"
              >
                <MdFormatListNumbered /> Inventario
              </NavLink>
            </li>

            <li className="nav-item d-flex">
              <NavLink
                to="/admin/notifications"
                className="nav-link"
                activeClassName="active"
              >
                <MdNotifications /> Notificaciones
              </NavLink>
            </li>

            <li className="nav-item d-flex">
              <NavLink
                to="/admin/precio-envios"
                className="nav-link"
                activeClassName="active"
              >
                <MdLocalShipping /> Costos de envio
              </NavLink>
            </li>

            <li className="nav-item d-flex">
              <NavLink
                to="/admin/statistics"
                className="nav-link"
                activeClassName="active"
              >
                <MdQueryStats/> Estadisticas
              </NavLink>
            </li>

            <li className="nav-item d-flex">
              <NavLink
                to="/admin/stock"
                className="nav-link"
                activeClassName="active"
              >
                <MdPercent /> Existencia
              </NavLink>
            </li>

            <li className="nav-item d-flex">
              <NavLink
                to="/admin/price"
                className="nav-link"
                activeClassName="active"
              >
                <MdAttachMoney /> Precios
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </aside>
  );
};

export default Sidebar;
