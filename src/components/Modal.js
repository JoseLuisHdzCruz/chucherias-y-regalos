// ModalComponent.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalComponent = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} className='modal-lg'>
        <Modal.Header className='modal-header' closeButton>
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
                    <p>Inicie sesión ahora, comencemos con sus compras. ¿No tiene una cuenta?</p><a href="/registro" className="fw-bold">Registrarse ahora</a>
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
        <Modal.Footer>
          <button type="button" className="btn btn-primary">Ingresar</button>
        </Modal.Footer>
      </Modal>
  );
};

export default ModalComponent;
