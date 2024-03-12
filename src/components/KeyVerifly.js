import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom"; // Importar Link desde react-router-dom
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  digit1: Yup.string()
    .matches(/^\d+$/, "Solo se permiten números")
    .length(1, "Debe tener exactamente un dígito")
    .required("Este campo es obligatorio"),
  digit2: Yup.string()
    .matches(/^\d+$/, "Solo se permiten números")
    .length(1, "Debe tener exactamente un dígito")
    .required("Este campo es obligatorio"),
  digit3: Yup.string()
    .matches(/^\d+$/, "Solo se permiten números")
    .length(1, "Debe tener exactamente un dígito")
    .required("Este campo es obligatorio"),
  digit2: Yup.string()
    .matches(/^\d+$/, "Solo se permiten números")
    .length(1, "Debe tener exactamente un dígito")
    .required("Este campo es obligatorio"),
  digit3: Yup.string()
    .matches(/^\d+$/, "Solo se permiten números")
    .length(1, "Debe tener exactamente un dígito")
    .required("Este campo es obligatorio"),
  digit4: Yup.string()
    .matches(/^\d+$/, "Solo se permiten números")
    .length(1, "Debe tener exactamente un dígito")
    .required("Este campo es obligatorio"),
});

const KeyVerifly = () => {
  const [isResending, setIsResending] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const { correo } = useParams();
  const navigate = useNavigate();

  // Valores por defecto de los campos de contraseña
  const initialValues = {
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting }) => {
    // Concatenar los valores de los campos digit1 a digit4 para formar la clave
    const clave = values.digit1 + values.digit2 + values.digit3 + values.digit4;

    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post(
        "https://backend-c-r-production.up.railway.app/users/keyCompare",
        {
          correo: correo,
          clave: clave,
        }
      );

      // Manejar la respuesta de la API
      console.log("Respuesta de la API:", response.data);

      // Verificar si la clave se verificó con éxito
      if (response.data.success) {
        // Mostrar un mensaje de éxito al usuario
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(`/change-password/${correo}`);
        }, 3000);
      } else {
        // Mostrar un mensaje de error al usuario
        toast.error(response.data.message);
      }
    } catch (error) {
      // Manejar los errores
      console.error("Error al consumir la API:", error);
      // Mostrar un mensaje de error al usuario
      if (error.response) {
        // Error de respuesta del servidor
        const responseData = error.response.data;
        if (responseData.message) {
          // Mostrar mensaje del servidor si está disponible
          toast.error(responseData.message);
        } else {
          // Mostrar mensaje de error genérico
          toast.error(
            "Error al verificar la clave. Por favor, inténtalo de nuevo."
          );
        }
      } else {
        // Error de red u otro error
        toast.error(
          "Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const reenviarClave = async () => {
    try {
      if (isCooldown) {
        toast.warning(
          "Por favor, espere 5 minutos antes de volver a intentarlo."
        );
        return;
      }

      setIsResending(true);

      await axios.post("https://backend-c-r-production.up.railway.app/users/forgotPassword", {
        correo,
      });

      toast.success(`Se ha enviado a su correo el código de verificación!`);

      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 5 * 60 * 1000); // Establece un tiempo de espera de 5 minutos antes de que se pueda reenviar nuevamente
    } catch (error) {
      console.error(error);
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.error) {
          toast.error(responseData.error);
        } else {
          toast.error(
            "Error al reenviar la clave. Por favor, inténtalo de nuevo."
          );
        }
      } else {
        toast.error(
          "Error de conexión. Por favor, verifica tu conexión a Internet e inténtalo de nuevo."
        );
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="wrapper row3 m-5">
      <PageTitle title="Chucherias & Regalos | Recuperar contraseña" />
      <div
        className="login-page"
        style={{ minHeight: "600px", background: "none" }}
      >
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
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                  >
                    <Form>
                      <p className="login-box-msg mb-1">
                        Se le hizo llegar un codigo de verificacion a su correo
                        electronico asociado a su cuenta, por favor introduzca
                        su clave.
                      </p>

                      <div className="form-group mb-4">
                        <label htmlFor="correo" className="fw-bold">
                          Su correo electronico
                        </label>
                        <div className="input-group mb-3">
                          <Field
                            type="text"
                            className="form-control"
                            id="correo"
                            name="correo"
                            value={correo}
                            disabled
                          />
                          <div className="input-group-append">
                            <div className="input-group-text">
                              <span className="fas fa-envelope"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="clave" className="fw-bold">
                          Ingrese su clave de verificacion
                        </label>
                        <div className="row">
                          <div className="col-md-3">
                            <Field
                              name="digit1"
                              type="text"
                              maxLength={1}
                              className="form-control text-center"
                            />
                            <ErrorMessage
                              name="digit1"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-3">
                            <Field
                              name="digit2"
                              type="text"
                              maxLength={1}
                              className="form-control text-center"
                            />
                            <ErrorMessage
                              name="digit2"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-3">
                            <Field
                              name="digit3"
                              type="text"
                              maxLength={1}
                              className="form-control text-center"
                            />
                            <ErrorMessage
                              name="digit3"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-3">
                            <Field
                              name="digit4"
                              type="text"
                              maxLength={1}
                              className="form-control text-center"
                            />
                            <ErrorMessage
                              name="digit4"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-login">
                        <p>¿No recibio su codigo?</p>
                        <Link
                          className="fw-bold"
                          onClick={reenviarClave}
                          disabled={isResending}
                        >
                          {isResending ? "Reenviando..." : "Reenviar ahora"}
                        </Link>
                      </div>

                      <div className="text-login">
                        <Link to={`/forgot-passworg-secret-question/${correo}`} className="text-primary fw-bold">Probar por pregunta secreta</Link>
                      </div>

                      <div className="cont-btn-2 mt-4 mb-4">
                        <button type="submit" className="btn-primary">
                          Enviar
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

export default KeyVerifly;
