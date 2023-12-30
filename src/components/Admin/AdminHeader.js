// Header.js
import React from "react";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "admin-lte/plugins/jqvmap/jqvmap.min.css";
import "admin-lte/dist/css/adminlte.min.css?v=3.2.0";
import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "admin-lte/plugins/daterangepicker/daterangepicker.css";
import "admin-lte/plugins/summernote/summernote-bs4.min.css";
import { Helmet } from "react-helmet";

const AdminHeader = () => {
  return (
    <>
      <Helmet>
      </Helmet>

      <nav className="main-header navbar navbar-expand navbar-dark navbar-primary">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown user-menu">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              {/* Aquí, deberías manejar la imagen del usuario y el nombre de usuario desde el estado o props */}
              <img
                src="user-image-path"
                className="user-image img-circle elevation-2"
                alt="User Image"
              />
              <span className="d-none d-md-inline">Nombre del Usuario</span>
            </a>
            {/* Resto del menú de usuario */}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminHeader;
