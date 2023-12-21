import React, { useState } from "react";
import "../styles/styles.css";
import { MdChevronRight } from 'react-icons/md';
import ModalComponent from '../components/Modal';

const ProductDetail = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <main>
      <h5 className="fw-semibold">Inicio < MdChevronRight size={25} className='icon-aling' /> Crear cuenta</h5>

      <h3 className="title-pag fw-bold text-uppercase mt-3">
        Crear cuenta
      </h3>
      <hr className="hr-primary" />
      <div className="container">
        <div className="row">
            <div className="col-md-5">
                <img
                  src="/images/Imagen1-3n4j4J1C4-transformed (1).jpg"
                  className="img-fluid rounded-start mt-4"
                  alt="Chucherias & Regalos"
                />
            </div>
            <div className="col-md-7">
                <h3 className="fw-bold">Ingrese sus datos</h3>

                <div className="text-login">
                    <p>¿Ya tiene una cuenta?</p><a className="fw-bold" onClick={activarModal}>Iniciar sesion</a>
                    {mostrarModal && <ModalComponent show={mostrarModal} onClose={cerrarModal} />}
                </div>

                <span className="blockquote-footer">Información personal</span>
                <div className="form-group row mb-4">
                <label htmlFor="Name" className="col-sm-3 col-form-label">Nombre completo</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="Name" placeholder="Nombre y apellidos" value="" />
                  </div>
                </div>

                <div className="form-group row">
                <label htmlFor="Email" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control" id="Email" placeholder="Email" value="" />
                  </div>

                  <label htmlFor="Telephone" className="col-sm-2 col-form-label">Telefono</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="Telephone" placeholder="Telefono" value="" />
                  </div>
                </div>
              
            </div>
        </div>
      </div>
      
    </main>

    
  );
};

export default ProductDetail;
