import React from "react";
import { MdChevronRight } from "react-icons/md";
import PageTitle from "../components/PageTitle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//validaciones correspondientes al formulario de registro
const validationEmail = Yup.object().shape({
  Contraseña: Yup.string()
    .min(8, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es obligatoria")
    .matches(
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
      "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
    ),
  RContraseña: Yup.string()
    .required("Edad es obligatorio")
    .oneOf([Yup.ref("Contraseña"), null], "Las contraseñas deben coincidir"),
});

const ChangePassword = () => {
  //valores por defecto de los campos de registro
  const initialValues = {
    Contraseña: "",
    RContraseña: "",
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
                    src="/images/change-password.jpg"
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
                        Estás a solo un paso de tu nueva contraseña, recupera tu
                        contraseña ahora.
                      </p>
                      <div className="form-group mb-4">
                        <label htmlFor="Contraseña" className="fw-bold">
                          Ingrese su contraseña
                        </label>
                        <div className="input-group mb-3">
                          <Field
                            type="text"
                            className="form-control"
                            id="Contraseña"
                            name="Contraseña"
                            placeholder="Ingrese su contraseña"
                          />
                          
                          <div className="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                          </div>
                        </div>
                        <ErrorMessage
                          name="Contraseña"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="RContraseña" className="fw-bold">
                          Confirme su contraseña
                        </label>
                        <div className="input-group mb-3">
                          <Field
                            type="text"
                            className="form-control"
                            id="RContraseña"
                            name="RContraseña"
                            placeholder="Confirme su contraseña"
                          />
                          <div className="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                          </div>
                        </div>
                        <ErrorMessage
                          name="RContraseña"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="cont-btn-2 mt-4">
                        <button type="submit" className="btn-primary">
                          Cambiar contraseña
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

export default ChangePassword;
