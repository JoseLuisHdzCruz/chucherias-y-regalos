import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdUpdate } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const validationRespuesta = Yup.object().shape({
  respuesta: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúñÑÁÉÍÓÚüÜ\s]+$/,
      "La respuesta solo puede contener letras, acentos y espacios"
    )
    .min(3, "La respuesta debe tener al menos 3 caracteres")
    .max(50, "La respuesta no puede tener más de 50 caracteres")
    .required("Este campo es obligatorio"),
});

const ProfileSecurity = () => {
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token && !decodedToken) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  const initialValues = {
    respuesta: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Perfil de usuario" />

      <h3 className="title-pag fw-bold text-uppercase">
        Seguridad de la cuenta
      </h3>
      <hr className="hr-primary" />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src="/images/forgot-password.jpg"
              alt="Recuperar contraseña"
              className="img-fluid mt-4"
            />
          </div>
          <div className="col-md-8">
            <h3 className="fw-bold">Cambiar pregunta secreta</h3>
            <div className="container">
              <div className="row">
              <Formik
                    initialValues={initialValues}
                    validationSchema={validationRespuesta}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                  >
                    <Form>
                      <p class="text-justify mr-4">
                        Puede recuperar el acceso a su cuenta mediante Pregunta
                        Secreta. Puede actualizar su pregunta y respuesta para volver a tener el acceso a su cuenta.
                      </p>
                      <div className="form-group mb-1 text-center">
                        <p className="fw-bold">
                        </p>
                      </div>
                      <div className="row">
                      <div className="form-group col-sm-6">
                      <label htmlFor="preguntaSecreta" className="fw-bold">
                        Pregunta Secreta
                      </label>
                      <Field
                        as="select"
                        className="form-select"
                        id="preguntaSecreta"
                        name="preguntaSecreta"
                      >
                        <option value="" disabled hidden selected>
                          Selecciona tu pregunta secreta
                        </option>
                        <option value="¿Color favorito?">¿Color favorito?</option>
                        <option value="¿Nombre de tu primera mascota?">¿Nombre de tu primera mascota?</option>
                        <option value="¿Equipo de futbol favorito?">¿Equipo de futbol favorito?</option>
                        <option value="¿Deporte favorito?">¿Deporte favorito?</option>
                        <option value="¿Fruta favorita?">¿Fruta favorita?</option>
                      </Field>
                      <ErrorMessage
                        name="preguntaSecreta"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                      <div className="form-group col-sm-6">
                        <label htmlFor="respuesta" className="fw-bold">
                          Su respuesta:
                        </label>
                        <div className="input-group mb-3">
                          <Field
                            type="text"
                            className="form-control"
                            id="respuesta"
                            name="respuesta"
                            placeholder="Ingrese su respuesta a la pregunta"
                            value={decodedToken.respuestaPSecreta}
                          />
                        </div>
                        <ErrorMessage
                          name="respuesta"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      </div>
                      

                      <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn-warning">
                          Actualizar <MdUpdate size={25} />
                        </button>
                      </div>
                    </Form>
                  </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSecurity;
