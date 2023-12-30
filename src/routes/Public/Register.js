import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import PageTitle from '../../components/PageTitle'
import ModalComponent from "../../components/Public/Modal";

const ProductDetail = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Registrarse" />

      <h5 className="fw-semibold">
        Inicio <MdChevronRight size={25} className="icon-aling" /> Crear cuenta
      </h5>

      <h3 className="title-pag fw-bold text-uppercase mt-3">Crear cuenta</h3>
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
          <div className="col-md-7 mt-2">
            <h3 className="fw-bold">Ingrese sus datos</h3>

            <div className="text-login">
              <p>¿Ya tiene una cuenta?</p>
              <a className="fw-bold" onClick={activarModal}>
                Iniciar sesion
              </a>
              {mostrarModal && (
                <ModalComponent show={mostrarModal} onClose={cerrarModal} />
              )}
            </div>

            <span className="blockquote-footer">Información personal</span>
            <div className="form-group mb-4 mt-2 col-sm-12">
              <label htmlFor="Name" className="fw-bold">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Nombre y apellidos"
              />
            </div>

            <div className="form-group mb-4 row">
              <div className="form-group col-sm-7">
                <label htmlFor="Email" className="fw-bold">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-sm-5">
                <label htmlFor="Telephone" className="fw-bold">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Telephone"
                  placeholder="Telefono"
                />
              </div>
            </div>

            <div className="form-group mb-4 row">
              <div className="form-group col-sm-7">
                <label htmlFor="Sexo" className="fw-bold">
                  Sexo
                </label>
                <select className="form-control" id="Sexo">
                  <option value="" disabled selected hidden>
                    Selecciona tu sexo
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
              </div>
              <div className="form-group col-sm-5">
                <label htmlFor="Edad" className="fw-bold">
                  Edad
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Edad"
                  placeholder="Edad"
                />
              </div>
            </div>
              
            <span className="blockquote-footer">Datos de acceso</span>
            <div className="form-group mb-4 mt-2 row">
              <div className="form-group col-sm-6">
                <label htmlFor="Contraseña" className="fw-bold">
                  Contraseña
                </label>
                <input
                  type="Password"
                  className="form-control"
                  id="Contraseña"
                  placeholder="Contraseña"
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="RContraseña" className="fw-bold">
                  Confirmar contraseña
                </label>
                <input
                  type="Password"
                  className="form-control"
                  id="RContraseña"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="cont-btn">
              <button className="btn-secondary">Cancelar</button>
              <button className="btn-primary">Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
