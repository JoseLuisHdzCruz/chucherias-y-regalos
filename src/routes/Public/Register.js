import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import ModalComponent from "../../components/Public/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

//validaciones correspondientes al formulario de registro
const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/,
      "El nombre solo puede contener letras, acentos y espacios"
    )
    .min(3, "El nombre debe tener al menos 10 caracteres")
    .max(20, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es obligatorio"),
  aPaterno: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/,
      "El nombre solo puede contener letras, acentos y espacios"
    )
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(15, "El nombre no puede tener más de 15 caracteres")
    .required("El nombre es obligatorio"),
  aMaterno: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/,
      "El nombre solo puede contener letras, acentos y espacios"
    )
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(15, "El nombre no puede tener más de 15 caracteres")
    .required("El nombre es obligatorio"),
  correo: Yup.string()
    .email("Correo electrónico inválido")
    .required("Email es obligatorio")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Ingresa una dirección de correo electrónico válida"
    ),
  telefono: Yup.number()
    .typeError("Formato invalido")
    .required("Telefono requerido")
    .min(10, "El Telefono debe tener al menos 10 digitos"),
  sexo: Yup.string().required("Seleccione su sexo"),
  fecha_nacimiento: Yup.date()
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "Debes ser mayor de 18 años"
    )
    .required("Fecha de nacimiento es obligatoria"),

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

const Register = () => {
  const [capchaValue, setCaptchaValue] = useState(null);

  const handleChange = (value) => {
    setCaptchaValue(value);
  };

  //acciones para desplegar el mopdal de iniciar sesion
  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);
  //fin de modal iniciar sesion

  //valores por defecto de los campos de registro
  const initialValues = {
    nombre: "",
    aMaterno: "",
    aPaterno: "",
    correo: "",
    telefono: "",
    sexo: "",
    fecha_nacimiento: "",
    contraseña: "",
    RContraseña: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      if (!capchaValue) {
        toast.error("Por favor, completa el CAPTCHA.");
        setErrors({ captcha: "Complete el Captcha" });
        return;
      }

      const response = await axios.post("http://localhost:5000/users", values);
      console.log(response.data);
      toast.success(
        "¡Registro exitoso!, En breve sera redirigido a la pagina principal"
      );
      setTimeout(() => {
        navigate("/");
      }, 5000); // Redirigir después de 1 segundo (1000 milisegundos)
    } catch (error) {
      if (error.response) {
        // Si la respuesta de la API contiene errores
        const responseData = error.response.data;
        if (responseData.error === "El correo electrónico ya está en uso") {
          toast.error(
            "El correo electrónico ya está en uso. Por favor, utiliza otro."
          );
          // Actualizar el estado del formulario para mostrar el mensaje de error y mantener el valor del correo electrónico ingresado
          setErrors({ correo: "Correo electrónico en uso" });
        } else {
          // Manejar otros errores de la API
          toast.error("Error al registrar. Por favor, inténtalo de nuevo.");
        }
      } else {
        // Si hay un error de red u otro tipo de error
        console.error(error);
        toast.error(
          "Error de conexión. Por favor, verifica tu conexión a Internet e inténtalo de nuevo más tarde."
        );
        // Redirigir a la vista de error 500
        navigate("/error-500");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Registrarse" />

      <h3 className="title-pag fw-bold text-uppercase">Crear cuenta</h3>
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
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnChange={true}
            >
              <Form>
                <h2 className="mb-4">Registro de Usuario</h2>

                <span className="blockquote-footer">Información personal</span>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="nombre" className="fw-bold">
                      Nombre (s)
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre y apellidos"
                    />
                    <ErrorMessage
                      name="nombre"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-sm-6">
                    <label htmlFor="aPaterno" className="fw-bold">
                      Apellido Paterno
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="aPaterno"
                      name="aPaterno"
                      placeholder="Apellido paterno"
                    />
                    <ErrorMessage
                      name="aPaterno"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="aMaterno" className="fw-bold">
                      Apellido Materno
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="aMaterno"
                      name="aMaterno"
                      placeholder="Apellido materno"
                      maxLength="10"
                    />
                    <ErrorMessage
                      name="aMaterno"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-7">
                    <label htmlFor="sexo" className="fw-bold">
                      Sexo
                    </label>
                    <Field
                      as="select"
                      className="form-select"
                      id="sexo"
                      name="sexo"
                    >
                      <option value="" disabled hidden>
                        Selecciona tu sexo
                      </option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </Field>
                    <ErrorMessage
                      name="sexo"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group col-sm-5">
                    <label htmlFor="fecha_nacimiento" className="fw-bold">
                      Fecha de nacimiento
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="fecha_nacimiento"
                      name="fecha_nacimiento"
                      placeholder="fecha_nacimiento"
                    />
                    <ErrorMessage
                      name="fecha_nacimiento"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <span className="blockquote-footer">Datos de acceso</span>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-7">
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

                  <div className="form-group col-sm-5">
                    <label htmlFor="telefono" className="fw-bold">
                      Teléfono
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      placeholder="Teléfono"
                      maxLength="10"
                    />
                    <ErrorMessage
                      name="telefono"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="form-group mb-4 row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="contraseña" className="fw-bold">
                      Contraseña
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="contraseña"
                      name="contraseña"
                      placeholder="contraseña"
                    />
                    <ErrorMessage
                      name="contraseña"
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

                <div className="form-group mt-4">
                  <ReCAPTCHA
                    sitekey="6LcbDGApAAAAANIKHKiUNtO-2ae77SgnoFzKXlO-"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="captcha"
                    component="div"
                    className="text-danger"
                  />
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
      <ToastContainer />
    </main>
  );
};

export default Register;
