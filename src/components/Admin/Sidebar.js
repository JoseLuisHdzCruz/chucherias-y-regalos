// Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-2">
      {/* Brand Logo */}
      <a href="/" className="brand-link">
        <img src="tool-image-path" alt="Hospital" className="brand-image img-circle elevation-3" style={{ opacity: 0.8 }} />
        <span className="brand-text font-weight-light">Hopital</span>
      </a>

      {/* Sidebar */}
      <section className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          {/* Aquí, puedes mapear tu lista de enlaces desde un array o un objeto */}
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <a href="/panel/doctor_list" className="nav-link" id="menu-doctor">
                <i className="fas fa-user-plus"></i>
                <p>Alta médicos</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </section>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
