import React, { useState } from 'react';
import '../styles/styles.css';
import { MdSearch, MdExpandMore, MdShoppingCart } from 'react-icons/md';
import { Modal } from 'react-bootstrap';

function Header() {
  let [mostrarModal, setMostrarModal] = useState(false);

  let activarModal = () => setMostrarModal(true);
  let cerrarModal = () => setMostrarModal(false);
  return (
    <header>
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
          <input type="text" placeholder="  Buscar en la página"/>
          <button>
            <MdSearch size={25} />
          </button>
        </div>
        <nav className="mt-3">
          <ul>
            <li>
              <a href="">
                Categoria <MdExpandMore size={25} className='icon-aling' />
              </a>
            </li>
            <li><a href="">Historial</a></li>
            <li><a href="">Compras</a></li>
            <li><a href="">Ofertas</a></li>
            <li>
              <a onClick={activarModal} pointer>
                Iniciar sesión
              </a>
              {mostrarModal && <Modal onClose={() => setMostrarModal(false)} />}
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
          <a href="/carrito.html">
          {/* <FontAwesomeIcon icon={faCartShopping} size='2em' /> */}
            <MdShoppingCart size={40} />
          </a>
        </div>
      </div>

      <Modal show={mostrarModal} onHide={cerrarModal} className='modal-lg'>
        <Modal.Header closeButton className='modal-header'>
              <h1 className="modal-title fs-5">Iniciar sesión</h1>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        <div className="row">
                <div className="col-md-5">
                  <img src="/images/Imagen1-3n4j4J1C4-transformed (1).jpg" alt="" className="img-fluid rounded-start mt-4" />
                </div>
                <div className="col-md-7">
                  <h3 className="title-pag fw-bold text-uppercase">INICIAR SESIÓN</h3>
                  <hr className="hr-primary" />

                  <div className="text-login">
                    <p>Inicie sesión ahora, comencemos con sus compras. ¿No tiene una cuenta?</p><a href="/registro.html" className="fw-bold">Registrarse ahora</a>
                  </div>
                  <form>
                    <div className="credentials">
                      <div className="form-group">
                        <label htmlFor="usuario" className="fw-bold">Usuario</label>
                        <input type="text" className="form-control custom-input mt-1" id="usuario" placeholder="Ingrese su usuario" />
                      </div>
                      <div className="form-group mt-4">
                        <label htmlFor="contrasena" className="fw-bold">Contraseña</label>
                        <input type="password" className="form-control custom-input mt-1" id="contrasena" placeholder="Ingrese su contraseña" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <button type="button" className="btn btn-primary">Ingresar</button>
        </Modal.Footer>
      </Modal>

    </header>
  );
}

export default Header;
