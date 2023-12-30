import React, { useState } from 'react';
import { MdSearch, MdShoppingCart } from 'react-icons/md';
import DropdownMenu from './DropdownMenu';
import ModalComponent from './Modal';
import '../../styles/styles.css'

function PublicHeader() {

  // modal iniciar sesion
  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);
  return (
    <header className='d-flex'>
      <div className="columna-1">
        <a href="/">
          <img
            className="logo-app"
            src="/images/Chucherias.png"
            alt="Chucherias & Regalos"
          />
        </a>
      </div>
      <div className="columna-2">
        <div className="search-bar">
          <input type="text" placeholder="¿Qué productos buscas el dia de hoy?"/>
          <button>
            <MdSearch size={25} />
          </button>
        </div>
        <nav className="mt-3">
          <ul>
            <li className='cinta-opciones'>
            <DropdownMenu />
            </li>
            <li className='cinta-opciones'><a href="/purchase-history">Historial</a></li>
            <li className='cinta-opciones'><a href="">Compras</a></li>
            <li className='cinta-opciones'><a href="">Ofertas</a></li>
            <li className='cinta-opciones'>
              <a onClick={activarModal}>
                Iniciar sesión
              </a>
              {mostrarModal && <ModalComponent show={mostrarModal} onClose={cerrarModal} />}
            </li>
          </ul>
        </nav>
      </div>
      <div className="columna" style={{ width: '25%' }}>
        <div className="profile">
          <img
            className="logo-user"
            src="/images/user.png"
            alt="Banner de Usuario"
          />
          <h3>Nombre de Usuario</h3>
        </div>
        <div className="cart">
          <a href="/checkup">
            <MdShoppingCart size={40} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
