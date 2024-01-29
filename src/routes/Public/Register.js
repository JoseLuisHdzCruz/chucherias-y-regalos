import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { MdChevronRight } from "react-icons/md";
import PageTitle from "../../components/PageTitle";
import ModalComponent from "../../components/Public/Modal";



const Register = () => {
  //acciones para desplegar el mopdal de iniciar sesion
  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);
  //fin de modal iniciar sesion

  //valores por defecto de los campos de registro
  const initialValues = {
    Name: "",
    Email: "",
    Telephone: "",
    Sexo: "",
    Edad: "",
    Contraseña: "",
    RContraseña: "",
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Registrarse" />

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

            <Formik
              initialValues={initialValues}
            >
              <Form>
                <h2 className="mb-4">Registro de Usuario</h2>

                <span className="blockquote-footer">Información personal</span>

                <div className="form-group mb-4 mt-2 col-sm-12">
                  <label htmlFor="Name" className="fw-bold">
                    Nombre completo
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Name"
                    name="Name"
                    placeholder="Nombre y apellidos"
                  />
                  <ErrorMessage
                    name="Name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-7">
                    <label htmlFor="Email" className="fw-bold">
                      Email
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="Email"
                      name="Email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="Email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-sm-5">
                    <label htmlFor="Telephone" className="fw-bold">
                      Teléfono
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="Telephone"
                      name="Telephone"
                      placeholder="Teléfono"
                      maxLength="10" 
                    />
                    <ErrorMessage
                      name="Telephone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-7">
                    <label htmlFor="Sexo" className="fw-bold">
                      Sexo
                    </label>
                    <Field
                      as="select"
                      className="form-control"
                      id="Sexo"
                      name="Sexo"
                    >
                      <option value="" disabled hidden>
                        Selecciona tu sexo
                      </option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </Field>
                    <ErrorMessage
                      name="Sexo"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-sm-5">
                    <label htmlFor="Edad" className="fw-bold">
                      Edad
                    </label>
                    <Field
                      type="number"
                      className="form-control"
                      id="Edad"
                      name="Edad"
                      placeholder="Edad"
                    />
                    <ErrorMessage
                      name="Edad"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <span className="blockquote-footer">Datos de acceso</span>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="Contraseña" className="fw-bold">
                      Contraseña
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="Contraseña"
                      name="Contraseña"
                      placeholder="Contraseña"
                    />
                    <ErrorMessage
                      name="Contraseña"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-sm-6">
                    <label htmlFor="RContraseña" className="fw-bold">
                      Confirmar contraseña
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="RContraseña"
                      name="RContraseña"
                      placeholder="Contraseña"
                    />
                    <ErrorMessage
                      name="RContraseña"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                
                <div className="cont-btn">
                  <button className="btn-secondary">Cancelar</button>
                  <button type="submit" className="btn-primary">
                    Registrarse
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;