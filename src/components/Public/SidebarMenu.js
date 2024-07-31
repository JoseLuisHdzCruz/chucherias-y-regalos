import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import ModalComponent from './Modal';
import { MdClose, MdMenu } from 'react-icons/md';
import '../../styles/styles.css';
import '../../styles/stylesResponsive.css';

function SidebarMenu({
  usuario,
  activarModal,
  mostrarModal,
  cerrarModal,
  cerrarSesion,
  menuVisible,
  toggleMenu
}) {
  return (
    <>
      <nav className={`Menu ${menuVisible ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>
          <MdClose size={30} />
        </button>
        <ul>
          <li className="sidebar-item">
            <DropdownMenu />
          </li>
          <li className="sidebar-item">
            <Link to="/ofertas">Ofertas</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/mas-vendidos">Más vendidos</Link>
          </li>
          {!usuario ? (
            <>
              <li className="sidebar-item">
                <a onClick={activarModal}>Iniciar sesión</a>
                {mostrarModal && (
                  <ModalComponent show={mostrarModal} onClose={cerrarModal} />
                )}
              </li>
            </>
          ) : (
            <>
              <li className="sidebar-item">
                <Link to="/purchase-history">Historial de compra</Link>
              </li>
              <li className="sidebar-item">
                <Link onClick={cerrarSesion}>Cerrar sesión</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default SidebarMenu;
