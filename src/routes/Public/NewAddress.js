import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import PageTitle from '../../components/PageTitle'
import ModalComponent from "../../components/Public/Modal";

const NewAddress = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Nueva dirección" />

      <h3 className="title-pag fw-bold text-uppercase">
        Agregar nueva dirección
      </h3>
      <hr className="hr-primary" />
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <img
              src="/images/paqueteria-transformed.jpg"
              className="img-fluid rounded-start mt-4"
              alt="Chucherias & Regalos"
            />
          </div>
          <div className="col-md-7 mt-2">
            <h3 className="fw-bold">Ingrese su domicilio de entrega</h3>

            <div className="text-login">
              <p>
                Tomar en cuenta que los datos ingresados son solo con fines de
                realizar la entrega de sus compras.
              </p>
            </div>

            <span className="blockquote-footer">Información personal</span>
            <div className="form-group mb-4 mt-2 col-sm-12">
              <label htmlFor="NameEntrega" className="fw-bold">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="NameEntrega"
                placeholder="Nombre y apellidos"
              />
            </div>

            <div className="form-group mt-2 mb-4 row">
              <span className="blockquote-footer">Domicilio</span>
              <div className="form-group col-sm-6">
                <label htmlFor="CodigoPostal" className="fw-bold">
                  Codigo Postal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="CodigoPostal"
                  placeholder="Codigo Postal"
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="Estado" className="fw-bold">
                  Estado
                </label>
                <select className="form-control" id="Estado">
                  <option value="" disabled selected hidden>
                    Selecciona tu Estado
                  </option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Estado de Mexico">Estado de Mexico</option>
                </select>
              </div>
            </div>

            <div className="form-group mb-4 row">
              <div className="form-group col-sm-6">
                <label htmlFor="Municipio" className="fw-bold">
                  Municipio
                </label>
                <select className="form-control" id="Municipio">
                  <option value="" disabled selected hidden>
                    Selecciona tu municipio
                  </option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Estado de Mexico">Estado de Mexico</option>
                </select>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="Colonia" className="fw-bold">
                  Colonia
                </label>
                <select className="form-control" id="Colonia">
                  <option value="" disabled selected hidden>
                    Selecciona tu Colonia
                  </option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Estado de Mexico">Estado de Mexico</option>
                </select>
              </div>
            </div>

            <div className="form-group mb-4 row">
              <div className="form-group col-sm-6">
                <label htmlFor="Calle" className="fw-bold">
                  Calle
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Calle"
                  placeholder="Calle"
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="NumeroExt" className="fw-bold">
                  Numero Exterior
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NumeroExt"
                  placeholder="Numero Exterior"
                />
              </div>
            </div>

            <div className="form-group mb-4 row">
              <div className="form-group col-sm-6">
                <label htmlFor="NumeroInt" className="fw-bold">
                  Numero Interior (opcional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NumeroInt"
                  placeholder="Numero Interior"
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="Telefono" className="fw-bold">
                  Telefono de contacto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Telephone"
                  placeholder="Telefono"
                />
              </div>
            </div>

            <div className="form-group mb-4 row col-sm-12">
              <label htmlFor="NameEntrega" className="fw-bold">
                Referencias de domicilio
              </label>
              <textarea
                style={{ flex: "1", marginRight: "10px", color: "black" }}
                placeholder="Referencia de domicilio"
                rows="2"
                id="ReferenciasDomicilio"
                className="form-control"
              />
            </div>

            <div className="cont-btn">
              <button className="btn-secondary">Regresar</button>
              <button className="btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewAddress;
