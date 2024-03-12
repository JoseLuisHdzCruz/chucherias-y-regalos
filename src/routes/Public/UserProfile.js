import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext"; 

const UserProfile = () => {
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState("");
  const [edad, setEdad] = useState(null);

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
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Perfil de usuario" />

      <h3 className="title-pag fw-bold text-uppercase">
        Perfil de usuario
      </h3>
      <hr className="hr-primary" />
      {decodedToken ? (<div className="container">
        <div className="row">
          <div className="profile-usr col-md-5">
            <h4 className="fw-bold">{decodedToken.nombre} {decodedToken.aPaterno} {decodedToken.aMaterno}</h4>
            <img
              src="/images/OIP (1).jpg"
              className="img-fluid mt-2"
              alt="Chucherias & Regalos"
            />
            <p className="mt-3">{decodedToken.correo}</p>
            <p className="fw-bold">{decodedToken.telefono}</p>
              <Link to="/change-password" className="fw-bold" style={{color:'red', textDecoration:'none', fontSize:'20px' }}>
                Administrar direcciones
              </Link>
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
                <select className="form-control" id="Sexo" value={selectedSexo} disabled>
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

            <div className="text-login mb-4">
              <Link to="/change-password" className="fw-bold" >
                Cambiar contraseña
              </Link>
            </div>

            <div className="cont-btn mt-4">
              <button className="btn-secondary">Regresar</button>
              <button className="btn-primary">Actualizar</button>
            </div>
          </div>
        </div>
      </div>) : (<p>No hay token disponible</p>)}
      
    </main>
  );
};

export default UserProfile;
