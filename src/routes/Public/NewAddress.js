import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  Nombre: Yup.string().required("El nombre es requerido"),
  Telefono: Yup.string().required("El teléfono es requerido"),
  CP: Yup.string().notRequired(),
  Calle: Yup.string().required("La calle es requerida"),
  Colonia: Yup.string().required("La colonia es requerida"),
  Estado: Yup.string().required("El estado es requerido"),
  Ciudad: Yup.string().required("La ciudad es requerida"),
  NumExterior: Yup.string().required("El número exterior es requerido"),
  Referencias: Yup.string().required("Las referencias son requeridas"),
});

const NewAddress = () => {
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [capchaValue, setCaptchaValue] = useState(null);
  const [captchaExpired, setCaptchaExpired] = useState(false);
  const [colonias, setColonias] = useState([]);
  const [codigo, setCodigoP] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Regresa a la ruta anterior
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backend-c-r-production.up.railway.app/address/get-colonias/${codigo}`
        );
        if (!response.ok) {
          throw new Error(
            `Error al obtener las colonias: ${response.statusText}`
          );
        }
        const data = await response.json();
        setColonias(data);
      } catch (error) {
        console.error(error);
      }
    };

    console.log(codigo, colonias);

    fetchData();
  }, [codigo]);

  const handleChange = (value) => {
    setCaptchaValue(value);
  };

  const handleExpired = () => {
    setCaptchaExpired(true); // Actualizar el estado cuando el tiempo del captcha expire
  };

  const initialValues = {
    Nombre: "",
    Telefono: "",
    Calle: "",
    Colonia: "",
    Estado: "",
    Ciudad: "",
    NumInterior: "",
    NumExterior: "",
    Referencias: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Combinar los valores del formulario con el customerId
      const data = {
        ...values,
        customerId: decodedToken.customerId,
      };

      // Realizar la solicitud POST a la API para agregar la dirección
      await axios.post(
        "https://backend-c-r-production.up.railway.app/address/add-domicilio",
        data
      );
      toast.success("La dirección se agregó correctamente");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Error al agregar la dirección:", error);
      toast.error("Error al agregar la dirección");
    }
    setSubmitting(false);
  };
  

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Nueva dirección" />

      <h3 className="title-pag fw-bold text-uppercase">
        Agregar nueva dirección
      </h3>
      <hr className="hr-primary" />
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <img
              src="/images/paqueteria-transformed.jpg"
              className="img-fluid rounded-start mt-4"
              alt="Chucherias & Regalos"
            />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="col-md-7">
                <div className="col-md-12 mt-2">
                  <h3 className="fw-bold">Ingrese su domicilio de entrega</h3>

                  <div className="text-login">
                    <p>
                      Tomar en cuenta que los datos ingresados son solo con
                      fines de realizar la entrega de sus compras.
                    </p>
                  </div>

                  <span className="blockquote-footer text-danger">
                    Aviso!!... Por el momento la entrega a domicilio se limita
                    solamente el municipio de Huejutla de Reyes, Hidalgo
                  </span>
                  <div className="form-group mb-4 mt-2 col-sm-12">
                    <label htmlFor="Nombre" className="fw-bold">
                      Nombre completo
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      name="Nombre"
                      placeholder="Nombre y apellidos"
                    />
                    <ErrorMessage
                      name="Nombre"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group mt-2 mb-4 row">
                    <span className="blockquote-footer">Domicilio</span>
                    <div className="form-group col-sm-6">
                      <label htmlFor="CP" className="fw-bold">
                        Codigo Postal
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="CP"
                        placeholder="Codigo Postal"
                        onChange={(e) => {
                          const cpValue = e.target.value;

                          if (cpValue.trim() !== "") {
                            setFieldValue("CP", cpValue);
                            setCodigoP(cpValue); // Llamamos a la función para obtener las colonias solo si el campo no está vacío
                          }
                        }}
                      />
                      <ErrorMessage
                        name="CP"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="Estado" className="fw-bold">
                        Estado
                      </label>
                      <Field as="select" className="form-select" name="Estado">
                        <option value="" hidden>
                          Selecciona tu Estado
                        </option>
                        {colonias.length > 0 && (
                          <option value={colonias[0].estado} selected={true}>
                            {colonias[0].estado}
                          </option>
                        )}
                      </Field>
                      <ErrorMessage
                        name="Estado"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4 row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="Ciudad" className="fw-bold">
                        Municipio
                      </label>
                      <Field as="select" className="form-select" name="Ciudad">
                        <option value="" hidden>
                          Selecciona tu municipio
                        </option>
                        {colonias.length > 0 && (
                          <option value={colonias[0].municipio} selected={true}>
                            {colonias[0].municipio}
                          </option>
                        )}
                      </Field>
                      <ErrorMessage
                        name="Ciudad"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="Colonia" className="fw-bold">
                        Colonia
                      </label>
                      <Field as="select" className="form-select" name="Colonia">
                        <option value="" selected hidden>
                          Selecciona tu Colonia
                        </option>
                        {colonias.map((colonias, index) => (
                          <option key={index} value={colonias.colonia}>
                            {colonias.colonia}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="Colonia"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4 row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="Calle" className="fw-bold">
                        Calle
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="Calle"
                        placeholder="Calle"
                      />
                      <ErrorMessage
                        name="Calle"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="NumExterior" className="fw-bold">
                        Numero Exterior
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="NumExterior"
                        placeholder="Numero Exterior"
                      />
                      <ErrorMessage
                        name="NumExterior"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4 row">
                    <div className="form-group col-sm-6">
                      <label htmlFor="NumInterior" className="fw-bold">
                        Numero Interior (opcional)
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="NumInterior"
                        placeholder="Numero Interior"
                      />
                      <ErrorMessage
                        name="NumInterior"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="Telefono" className="fw-bold">
                        Telefono de contacto
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        name="Telefono"
                        placeholder="Telefono"
                      />
                      <ErrorMessage
                        name="Telefono"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4 row col-sm-12">
                    <label htmlFor="Referencias" className="fw-bold">
                      Referencias de domicilio
                    </label>
                    <Field
                      as="textarea"
                      placeholder="Referencia de domicilio"
                      rows="2"
                      name="Referencias"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="Referencias"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-4 ">
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
                    <button className="btn-secondary" onClick={handleBack}>
                      Regresar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={!capchaValue || captchaExpired || isSubmitting}
                    >
                      {isSubmitting ? "Registrando..." : "Registrar"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default NewAddress;
