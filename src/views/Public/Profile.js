import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Public/PageTitle";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState("");
  const [edad, setEdad] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Regresa a la ruta anterior
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);

      // Establece el sexo seleccionado igual al sexo del token decodificado
      setSelectedSexo(decoded.sexo);

      // Calcula la edad actual del usuario a partir de la fecha de nacimiento en el token
      const fechaNacimiento = new Date(decoded.edad);
      const edadActual = calcularEdad(fechaNacimiento);
      setEdad(edadActual);
    }
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

  // Función para manejar la carga de la imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // Función para enviar la imagen a la API
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("imagen", selectedImage); // Cambiado de "image" a "imagen" para que coincida con la clave esperada en el servidor

      const response = await axios.post(
        `https://backend-c-r-production.up.railway.app/users/usuario/${decodedToken.customerId}/imagen`,
        formData
      );

      if (response.status === 200) {
        // Manejar la respuesta de la API, por ejemplo, actualizar la imagen en el estado
        toast.success("Imagen subida exitosamente");
        console.log("Imagen subida exitosamente", response.data);
      } else {
        // Manejar errores de la API
        console.error("Error al subir la imagen");
        toast.error("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Perfil de usuario" />

      <h3 className="title-pag fw-bold text-uppercase">Información Personal</h3>
      <hr className="hr-primary" />
      {decodedToken ? (
        <div className="container">
          <div className="row">
            <div className="profile-usr col-md-5">
              <h4 className="fw-bold">
                {decodedToken.nombre} {decodedToken.aPaterno}{" "}
                {decodedToken.aMaterno}
              </h4>

              {decodedToken.imagen !== null ? (
                <img
                  src={decodedToken.imagen}
                  className="img-fluid mt-2"
                  alt="Chucherias & Regalos"
                />
              ) : selectedSexo === "masculino" ? (
                <img
                  src="/images/user-masculino.png"
                  className="img-fluid mt-2"
                  alt="Chucherias & Regalos"
                />
              ) : (
                <img
                  src="/images/OIP (1).jpg"
                  className="img-fluid mt-2"
                  alt="Chucherias & Regalos"
                />
              )}

              {/* <div className="row text-center">
                <span
                  className="fw-bold mb-2"
                  style={{
                    color: "blue",
                    fontSize: "20px",
                  }}
                >
                  Actualizar foto de perfil
                </span>
                <div className="row col-md-12">
                  <div className="row col-md-9">
                    <input
                      type="file"
                      accept="imagen/*"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="row col-md-3">
                    <button onClick={uploadImage} className="btn btn-primary">
                      Subir
                    </button>
                  </div>
                </div>
              </div> */}
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
                  value={`${decodedToken.nombre} ${decodedToken.aPaterno} ${decodedToken.aMaterno}`}
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
                  value={`${decodedToken.correo}`}
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
                    value={`${decodedToken.telefono}`}
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

              {/* <div className="text-login mb-4">
                    <Link to="/forgot -password" className="fw-bold">
                      Cambiar contraseña
                    </Link>
                  </div> */}

              <div className="cont-btn mt-4">
                <button className="btn-secondary" onClick={handleBack}>
                  Regresar
                </button>
                {/* <button className="btn-warning">Actualizar <MdUpdate size={25}/></button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No hay token disponible</p>
      )}
    </main>
  );
};

export default Profile;
