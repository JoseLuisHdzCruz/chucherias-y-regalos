import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  role: Yup.string().required('Por favor, selecciona un rol'),
  username: Yup.string().required('Correo es obligatorio'),
  password: Yup.string().required('Contraseña es obligatoria'),
});

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('/api/login', values)
      .then((response) => {
        console.log('Respuesta de la API:', response.data);
        // Aquí puedes redirigir al dashboard u otro proceso
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        // Aquí puedes manejar errores y mostrar mensajes al usuario
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h1>Chucherías<b> & </b>Regalos</h1>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">Inicia sesión para comenzar</p>
            <div className="text-center mt-4 mb-4">
              <img
                className="img-fluid"
                src="/images/Imagen1-3n4j4J1C4-transformed (1).jpg"
                alt="Chucherías & Regalos"
                style={{ height: "200px", width: "200px", borderRadius: "100%" }}
              />
            </div>

            <Formik
              initialValues={{ role: '', username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mr-4 ml-4">
                  <div className="input-group mb-3">
                    <Field
                      as="select"
                      className="form-select"
                      name="role"
                    >
                      <option value="" disabled>Seleccionar Rol</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Empleado">Empleado</option>
                    </Field>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user-tie"></span>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage name="role" component="div" className="text-danger mb-3" />

                  <div className="input-group mb-3">
                    <Field
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Correo del usuario"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage name="username" component="div" className="text-danger mb-3" />

                  <div className="input-group mb-4">
                    <Field
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Contraseña"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-danger mb-3" />

                  <div className="row mt-4">
                    <div className="col-9">
                      <Link to="">Olvidé mi contraseña</Link>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                        {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
