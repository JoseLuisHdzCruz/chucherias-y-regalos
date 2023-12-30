import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import PageTitle from '../../components/PageTitle'
import ModalComponent from "../../components/Public/Modal";

const UserProfile = () => {
  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Perfil de usuario" />

      <h5 className="fw-semibold">
        Inicio <MdChevronRight size={25} className="icon-aling" /> Perfil de
        usuario
      </h5>

      <h3 className="title-pag fw-bold text-uppercase mt-3">
        Perfil de usuario
      </h3>
      <hr className="hr-primary" />
      <div className="container">
        <div className="row">
          <div className="profile-usr col-md-5">
            <h4 className="fw-bold">Nombre de usuario</h4>
            <img
              src="/images/OIP (1).jpg"
              className="img-fluid mt-2"
              alt="Chucherias & Regalos"
            />
            <p className="mt-3">correo@dominio.com</p>
            <p className="fw-bold">771 118 112</p>
              <a href="/change-password" className="fw-bold" style={{color:'red', textDecoration:'none', fontSize:'20px' }}>
                Administrar direcciones
              </a>
          </div>

          <div className="col-md-7 mt-2">
            <h3 className="fw-bold">Datos de la cuenta</h3>

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

            <div className="form-group mb-4 col-sm-12">
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

            <div className="form-group mb-4 row">
              <div className="form-group col-sm-6">
                <label htmlFor="Telefono" className="fw-bold">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Telefono"
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

            <div className="text-login mb-4">
              <a href="/change-password" className="fw-bold" >
                Cambiar contraseña
              </a>
            </div>

            <div className="cont-btn mt-4">
              <button className="btn-secondary">Regresar</button>
              <button className="btn-primary">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
