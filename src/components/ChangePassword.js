import React from "react";
import PageTitle from "../components/PageTitle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Importar Link desde react-router-dom
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

//validaciones correspondientes al formulario de registro
const validationEmail = Yup.object().shape({
  contraseña: Yup.string()
    .required("Contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/\d{1,2}/, "Debe contener al menos 1 o 2 dígitos")
    .matches(/[A-Z]{1,2}/, "Debe contener al menos 1 o 2 letras mayúsculas")
    .matches(/[a-z]{1,2}/, "Debe contener al menos 1 o 2 letras minúsculas")
    .matches(
      /[^A-Za-z0-9]{1,2}/,
      "Debe contener al menos 1 o 2 caracteres especiales"
    ),
  RContraseña: Yup.string()
    .required("Campo obligatorio")
    .oneOf([Yup.ref("contraseña"), null], "Las contraseñas deben coincidir"),
});

const ChangePassword = () => {

  const { correo } = useParams();
  const navigate = useNavigate();

  //valores por defecto de los campos de registro
  const initialValues = {
    contraseña: "",
    RContraseña: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post("http://localhost:5000/users/changePassword", {
        correo: correo,
        nuevaContraseña: values.contraseña
      });

      console.log(correo + " " + values.contraseña)


      // Mostrar un mensaje de éxito
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 5000);

    } catch (error) {
      // Mostrar un mensaje de error si ocurre algún problema
      toast.error(error.response.data.error);
    } finally {
      // Establecer setSubmitting a false para permitir que el formulario sea enviado nuevamente
      setSubmitting(false);
    }
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
              <Link to="/" className="h1">
                Chucherias <b>&</b> Regalos
              </Link>
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
                    validateOnChange={true}
                  >
                    <Form>
                      <p className="login-box-msg">
                        Estás a solo un paso de tu nueva contraseña, recupera tu
                        contraseña ahora.
                      </p>
                      <div className="form-group mb-4">
                        <label htmlFor="Contraseña" className="fw-bold">
                          Ingrese su nueva contraseña
                        </label>
                        <div className="input-group mb-3">
                          <Field
                            type="password"
                            className="form-control"
                            id="contraseña"
                            name="contraseña"
                            placeholder="Ingrese su contraseña"
                          />
                          
                          <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                          </div>
                        </div>
                        <ErrorMessage
                          name="contraseña"
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
                            type="password"
                            className="form-control"
                            id="RContraseña"
                            name="RContraseña"
                            placeholder="Confirme su contraseña"
                          />
                          <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
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
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
