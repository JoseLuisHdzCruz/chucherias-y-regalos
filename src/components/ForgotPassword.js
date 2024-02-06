import React from "react";
import PageTitle from "../components/PageTitle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//validaciones correspondientes al formulario de registro
const validationEmail = Yup.object().shape({
  Email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Email es obligatorio")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Ingresa una dirección de correo electrónico válida"
    ),
});

const LoginPage = () => {
  //valores por defecto de los campos de registro
  const initialValues = {
    Email: "",
  };

  const handleSubmit = (values) => {
    // Aquí puedes realizar acciones con los datos enviados
    console.log(values);
  };

  const loginPageStyle = {
    minHeight: "318.8px",
    background: "none", // Agrega esta línea para quitar el fondo
  };
  return (
    <div className="wrapper row3 m-5">
      <PageTitle title="Chucherias & Regalos | Recuperar contraseña" />
      <div className="login-page" style={loginPageStyle}>
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="/" className="h1">
                Chucherias <b>&</b> Regalos
              </a>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <img
                    src="/images/forgot-password.jpg"
                    alt=""
                    className="img-fluid rounded-start mt-4"
                  />
                </div>
                <div className="col-md-7">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationEmail}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <p className="login-box-msg">
                        ¿Olvidaste tu contraseña? Aquí puede recuperar
                        fácilmente una nueva contraseña.
                      </p>
                      <div className="form-group mb-4">
                        <label htmlFor="Email" className="fw-bold">
                          Ingrese su correo electronico
                        </label>
                        <div className="input-group mb-3">
                          <Field
                            type="text"
                            className="form-control"
                            id="Email"
                            name="Email"
                            placeholder="Ingrese su correo electronico"
                          />
                          <div className="input-group-append">
                            <div className="input-group-text">
                              <span className="fas fa-envelope"></span>
                            </div>
                          </div>
                        </div>
                        <ErrorMessage
                          name="Email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="cont-btn mt-4">
                        <button className="btn-secondary">Cancelar</button>
                        <button type="submit" className="btn-primary">
                          Enviar solicitud
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
