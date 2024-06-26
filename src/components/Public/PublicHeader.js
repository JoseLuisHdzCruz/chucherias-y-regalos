// PublicHeader.js
import React, { useState, useEffect, useContext } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ModalComponent from "./Modal";
import "../../styles/styles.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import ButtonCart from "./ButtonCart";
import axios from "axios";

function PublicHeader({ onSearch }) {
  const [usuario, setUsuario] = useState(1);
  const [selectedSexo, setSelectedSexo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [verificacionRealizada, setVerificacionRealizada] = useState(false);
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    const searchTerm = event.target.value; // Obtener el valor del campo de búsqueda
    setSearchTerm(searchTerm);
    if (searchTerm !== null && searchTerm !== "") {
      onSearch(searchTerm); // Llamar a la función de búsqueda solo si el término de búsqueda no está vacío
      navigate("/");
    } else {
      onSearch(null); // Si el campo de búsqueda está vacío, enviar null o 0 según sea necesario
      event.target.value = "";
    }
  };

  const limpiarBusqueda = () => {
    setSearchTerm("");
    onSearch(null);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUsuario(decoded);
      // Establece el sexo seleccionado igual al sexo del token decodificado
      setSelectedSexo(decoded.sexo);
    } else {
      setUsuario(null);
    }
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop > lastScrollTop) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [token]); // Agrega token como dependencia para que el efecto se vuelva a ejecutar cuando cambie

  useEffect(() => {
    if (usuario && usuario.sesion) {
      if (!verificacionRealizada) {
        // Obtener domicilios
        fetch(
          `https://backend-c-r-production.up.railway.app/users/getSession/${usuario.sesion}`
        )
          .then((response) => response.json())
          .then((data) => {
            setVerificacionRealizada(true);
            // Mostrar una alerta de Toast si la sesión ha expirado
            if (data.sessionId === 0 || data.sessionId === null) {
              logout();
              toast.error("La sesión ha expirado", {
                autoClose: 2000, // La alerta se cerrará automáticamente después de 2 segundos
                closeOnClick: true, // La alerta se cerrará al hacer clic en ella
              });
            }
          })
          .catch((error) =>
            console.error("Error fetching domicilios data:", error)
          );
      }
    }
  }, [usuario, verificacionRealizada]);

  const cerrarSesion = async () => {
    try {
      // Llamada a la API para cerrar sesión
      await axios.post(
        "https://backend-c-r-production.up.railway.app/users/logout",
        { sessionId: usuario.sesion }
      );

      // Ejecutar la función logout() (suponiendo que ya está definida en tu código)
      logout();

      // Realizar otras acciones (por ejemplo, mostrar un mensaje de éxito)
      toast.error("Cierre de sesión exitoso. ¡Hasta pronto!");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      // Manejar errores si la llamada a la API falla
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <header className={`d-flex ${scrolled ? "hidden" : "sticky"}`}>
      <div className="columna-1">
        <Link to="/">
          <img
            className="logo-app"
            src="/images/Chucherias.png"
            alt="Chucherias & Regalos"
          />
        </Link>
      </div>
      <div className="columna-2">
        <div className="search-bar">
          <input
            type="text"
            id="busquedaTermino"
            placeholder="¿Qué productos buscas el dia de hoy?"
            onChange={handleSearch}
          />
          {searchTerm && searchTerm.length > 0 ? (
            <button onClick={limpiarBusqueda}>
              <MdClose size={25} />
            </button>
          ) : (
            <button>
              <MdSearch size={25} />
            </button>
          )}
        </div>
        <nav className="mt-3">
          <ul>
            <li className="cinta-opciones">
              <DropdownMenu />
            </li>
            <li className="cinta-opciones">
              <Link to="/ofertas">Ofertas</Link>
            </li>
            <li className="cinta-opciones">
              <Link to="/mas-vendidos">Más vendidos</Link>
            </li>
            {!usuario ? (
              <li className="cinta-opciones">
                <a onClick={activarModal}>Iniciar sesión</a>
                {mostrarModal && (
                  <ModalComponent show={mostrarModal} onClose={cerrarModal} />
                )}
              </li>
            ) : (
              <>
                <li className="cinta-opciones">
                  <Link to="/purchase-history">Historial de compra</Link>
                </li>
                <li className="cinta-opciones">
                  <Link onClick={cerrarSesion}>Cerrar sesión</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="columna" style={{ width: "25%" }}>
        <div className="profile">
          {!usuario ? (
            <img
              className="logo-user rounded-image"
              src="/images/user.png"
              alt="Banner de Usuario"
            />
          ) : usuario && usuario.imagen !== null ? (
            <img
              src={usuario.imagen}
              className="img-fluid mt-2 rounded-image"
              alt="Chucherias & Regalos"
            />
          ) : selectedSexo === "masculino" ? (
            <img
              src="/images/user-masculino.png"
              className="logo-user rounded-image"
              alt="Chucherias & Regalos"
            />
          ) : (
            <img
              src="/images/OIP (1).jpg"
              className="logo-user rounded-image"
              alt="Chucherias & Regalos"
            />
          )}

          {/* Mostrar el nombre de usuario si está disponible */}
          {usuario ? (
            <>
              <div className="perfil  ">
                <div className="row">
                  <span className="text-idUser">ID: {usuario.sesion}</span>
                </div>
                <div className="row">
                  <Link className="text-user" to="/user-profile" pointer>
                    {usuario.nombre}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Link className="text-user" to="/user-profile" pointer>
              Usuario
            </Link>
          )}
        </div>
        <ButtonCart />
      </div>
    </header>
  );
}

export default PublicHeader;
