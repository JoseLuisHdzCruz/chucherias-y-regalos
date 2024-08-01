import React, { useState, useEffect, useRef } from "react";
import { MdSearch, MdClose, MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ModalComponent from "./Modal";
import SidebarMenu from "./SidebarMenu";
import "../../styles/styles.css";
import "../../styles/stylesResponsive.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import ButtonCart from "./ButtonCart";
import ButtonCartResponsive from "./ButtonCartResponsive";
import axios from "axios";

function PublicHeader({ onSearch }) {
  const [usuario, setUsuario] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [verificacionRealizada, setVerificacionRealizada] = useState(false);
  const { token, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const overlayRef = useRef(null);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm !== null && searchTerm !== "") {
      onSearch(searchTerm);
      navigate("/");
    } else {
      onSearch(null);
      event.target.value = "";
    }
  };

  const limpiarBusqueda = () => {
    setSearchTerm("");
    onSearch(null);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUsuario(decoded);
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
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [token, menuVisible]);

  useEffect(() => {
    if (usuario && usuario.sesion && !verificacionRealizada) {
      fetch(
        `https://backend-c-r-production.up.railway.app/users/getSession/${usuario.sesion}`
      )
        .then((response) => response.json())
        .then((data) => {
          setVerificacionRealizada(true);
          if (data.sessionId === 0 || data.sessionId === null) {
            logout();
            toast.error("La sesión ha expirado", {
              autoClose: 2000,
              closeOnClick: true,
            });
          }
        })
        .catch((error) =>
          console.error("Error fetching domicilios data:", error)
        );
    }
  }, [usuario, verificacionRealizada]);

  const cerrarSesion = async () => {
    try {
      await axios.post(
        "https://backend-c-r-production.up.railway.app/users/logout",
        { sessionId: usuario.sesion }
      );

      logout();

      toast.error("Cierre de sesión exitoso. ¡Hasta pronto!");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <>
      <header
        className={`header-public d-flex ${scrolled ? "hidden" : "sticky"} ${
          menuVisible ? "show-menu" : ""
        }`}
      >
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
              placeholder="¿Qué productos buscas el día de hoy?"
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
          <nav className="opciones-cinta mt-3">
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

            {usuario ? (
              <>
                <div className="perfil">
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
        <ButtonCartResponsive />
        <button
          className="toggle-button"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuVisible ? <MdClose size={25} /> : <MdMenu size={25} />}
        </button>
      </header>

      {/* Overlay */}
      {menuVisible && <div className="overlay" onClick={toggleMenu}></div>}

      {/* Sidebar Component */}
      <SidebarMenu
        activarModal={activarModal}
        mostrarModal={mostrarModal}
        cerrarModal={cerrarModal}
        cerrarSesion={cerrarSesion}
        menuVisible={menuVisible}
        toggleMenu={toggleMenu}
        setMenuVisible={setMenuVisible}
      />
    </>
  );
}

export default PublicHeader;
