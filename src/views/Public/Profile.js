import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Public/PageTitle";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { FileUpload } from "primereact/fileupload";
import { useAlert } from "../../context/AlertContext";

const Profile = () => {
  const { token } = useAuth();  
  const fileUploadRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const showAlert = useAlert();
  const [customer, setCustomer] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState("");
  const [edad, setEdad] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Regresa a la ruta anterior
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);

          // Establece el sexo seleccionado igual al sexo del token decodificado
          setSelectedSexo(decoded.sexo);

          // Calcula la edad actual del usuario a partir de la fecha de nacimiento en el token
          const fechaNacimiento = new Date(decoded.edad);
          const edadActual = calcularEdad(fechaNacimiento);

          // Llamada a la API para obtener los datos del usuario
          const response = await axios.get(
            `https://backend-c-r.onrender.com/users/${decoded.customerId}`
          );

          // Actualiza el estado con los datos del usuario
          setCustomer(response.data);

          // Actualiza el estado de la edad
          setEdad(edadActual);
        }
      } catch (error) {
        console.error("Error al obtener el usuario", error);
      }
    };

    fetchCustomerData();
  }, [token]);

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimiento.getMonth();
    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  };

  // Función personalizada para manejar la carga de la imagen
  const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const formData = new FormData();
    formData.append("imagen", file); // Cambiado de "image" a "imagen" para que coincida con la clave esperada en el servidor

    try {
      const response = await axios.put(
        `https://backend-c-r.onrender.com/users/banner/${customer.customerId}`,
        formData
      );

      if (response.status === 200) {
        // Limpia el componente FileUpload
        if (fileUploadRef.current) {
          fileUploadRef.current.clear();
        }
        showAlert("success", "Imagen subida exitosamente");
        setUploadedImage(response.data.imagen);
      } else {
        // Manejar errores de la API
        console.error("Error al subir la imagen");
        showAlert("error", "Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="section row3 mt-4">
      <PageTitle title="Chucherias & Regalos | Perfil de usuario" />

      <h3 className="title-pag fw-bold text-uppercase">Información Personal</h3>
      <hr className="hr-primary" />
      {customer ? (
        <div className="hoc section clear m-5">
          <div className="row">
            <div className="profile-usr col-md-5">
              <h4 className="fw-bold">
                {customer.nombre} {customer.aPaterno} {customer.aMaterno}
              </h4>

              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  className="img-fluid mt-2"
                  alt="Chucherias & Regalos"
                />
              ) : (
                // Mostrar la imagen predeterminada o la imagen del usuario si no hay una imagen cargada
                <img
                  src={
                    customer.imagen !== null
                      ? customer.imagen
                      : selectedSexo === "masculino"
                      ? "/images/user-masculino.png"
                      : "/images/OIP (1).jpg"
                  }
                  className="img-fluid mt-2"
                  alt="Chucherias & Regalos"
                />
              )}
              <FileUpload
                ref={fileUploadRef}
                mode="basic"
                name="imagen"
                url={`https://backend-c-r.onrender.com/users/usuario/${customer.customerId}/imagen`}
                accept="image/*"
                customUpload
                uploadHandler={customBase64Uploader}
                chooseLabel="Selecciona una imagen"
                className="mt-4"
              />
            </div>

            <div className="col-md-7 mt-2">
              <h3 className="fw-bold">Datos de la cuenta</h3>

              <div className="form-group mb-4 mt-2 col-sm-12">
                <label htmlFor="Name" className="fw-bold">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Nombre y apellidos"
                  value={`${customer.nombre} ${customer.aPaterno} ${customer.aMaterno}`}
                  readOnly
                />
              </div>

              <div className="form-group mb-4 col-sm-12">
                <label htmlFor="Email" className="fw-bold">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  placeholder="Email"
                  value={`${customer.correo}`}
                  readOnly
                />
              </div>

              <div className="form-group mb-4 row">
                <div className="form-group col-sm-6">
                  <label htmlFor="Telefono" className="fw-bold">
                    Telefono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Telefono"
                    placeholder="Telefono"
                    value={`${customer.telefono}`}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group mb-4 row">
                <div className="form-group col-sm-7">
                  <label htmlFor="Sexo" className="fw-bold">
                    Sexo
                  </label>
                  <select
                    className="form-control"
                    id="Sexo"
                    value={selectedSexo}
                    disabled
                  >
                    <option value="" disabled selected hidden>
                      Selecciona tu sexo
                    </option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
                <div className="form-group col-sm-5">
                  <label htmlFor="Edad" className="fw-bold">
                    Edad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="Edad"
                    placeholder="Edad"
                    value={edad !== null ? edad : ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="cont-btn mt-4">
                <button className="btn-secondary" onClick={handleBack}>
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No hay token disponible</p>
      )}
    </div>
  );
};

export default Profile;
