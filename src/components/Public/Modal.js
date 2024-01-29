// ModalComponent.js
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar Link desde react-router-dom
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//validaciones correspondientes al formulario de registro
const loginValidationSchema = Yup.object().shape({
  correo: Yup.string()
    .email("Correo electrónico inválido")
    .required("Email es obligatorio")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Ingresa una dirección de correo electrónico válida"
    ),
  contraseña: Yup.string()
    .required("Contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/\d{1,2}/, "Debe contener al menos 1 o 2 dígitos")
    .matches(/[A-Z]{1,2}/, "Debe contener al menos 1 o 2 letras mayúsculas")
    .matches(/[a-z]{1,2}/, "Debe contener al menos 1 o 2 letras minúsculas")
    .matches(/[^A-Za-z0-9]{1,2}/, "Debe contener al menos 1 o 2 caracteres especiales"
    )
});

const ModalComponent = ({ show, onClose }) => {
  //valores por defecto de los campos de registro
  const initialValues = {
    correo: "",
    contraseña: "",
  };

  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Enviar datos al backend para la autenticación
      const response = await axios.post(
        "http://localhost:5000/users/login",
        values
      );
      console.log(response.data);

      toast.success("Inicio de sesion exitoso!, En breve sera redirigido a la pagina principal");
      setTimeout(() => {
      onClose();
      }, 5000); // Redirigir después de 1 segundo (1000 milisegundos)

    } catch (error) {
      if (error.response) {
        // Si la respuesta de la API contiene errores
        const responseData = error.response.data;
        if (responseData.error === "El correo ingresado no esta asociado a una cuenta") {
          toast.error("El correo ingresado no esta asociado a una cuenta.");
          setErrors({ correo: "El correo ingresado no esta asociado a una cuenta" });
        } else if (responseData.error === "Contraseña incorrecta") {
          toast.error("Contraseña incorrecta.");
          setErrors({ contraseña: "La contraseña es incorrecta" });
        }
      } else {
        // Si hay un error de red u otro tipo de error
        console.error(error);
        toast.error("Error de conexión. Por favor, verifica tu conexión a Internet e inténtalo de nuevo más tarde.");
        // Redirigir a la vista de error 500
        navigate("/error-500");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header className="modal-header" closeButton>
        <h1 className="modal-title fs-5">Iniciar sesión</h1>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
        >
          <Form>
            <div className="row">
              <div className="col-md-5">
                <img
                  src="/images/Imagen1-3n4j4J1C4-transformed (1).jpg"
                  alt=""
                  className="img-fluid rounded-start mt-4"
                />
              </div>
              <div className="col-md-7">
                <h3 className="title-pag fw-bold text-uppercase">
                  INICIAR SESIÓN
                </h3>
                <hr className="hr-primary" />

                <div className="text-login">
                  <p>
                    Inicie sesión ahora, comencemos con sus compras. ¿No tiene
                    una cuenta?
                  </p>
                  <Link to="/registro" className="fw-bold" onClick={onClose}>
                    Registrarse ahora
                  </Link>
                </div>

                <div className="credentials">
                  <div className="form-group">
                    <label htmlFor="correo" className="fw-bold">
                      Correo electronico
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="correo"
                      name="correo"
                      placeholder="Correo electronico"
                    />
                    <ErrorMessage
                      name="correo"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="contraseña" className="fw-bold">
                      Contraseña
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="contraseña"
                      name="contraseña"
                      placeholder="Contraseña"
                    />
                    <ErrorMessage
                      name="contraseña"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="text-login">
                  <p>¿Olvido su contraseña?</p>
                  <Link to="/forgot-password" className="fw-bold text-primary" onClick={onClose}>
                    Recuperar contraseña
                  </Link>
                </div>
              </div>
            </div>
            <Modal.Footer className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default ModalComponent;