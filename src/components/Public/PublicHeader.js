// PublicHeader.js
import React, { useState, useEffect, useContext } from "react";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ModalComponent from "./Modal";
import "../../styles/styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

function PublicHeader({ onSearch }) {
  const [usuario, setUsuario] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [verificacionRealizada, setVerificacionRealizada] = useState(false);
  const { token, logout } = useAuth();
  const { cart, clearCart } = useContext(CartContext);
  const totalItemsEnCarrito = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    const searchTerm = event.target.value; // Obtener el valor del campo de búsqueda
    if (searchTerm !== null && searchTerm !== "") {
      onSearch(searchTerm); // Llamar a la función de búsqueda solo si el término de búsqueda no está vacío
    } else {
      onSearch(null); // Si el campo de búsqueda está vacío, enviar null o 0 según sea necesario
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUsuario(decoded);
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
      fetch(`https://backend-c-r-production.up.railway.app/users/getSession/${usuario.sesion}`)
        .then(response => response.json())
        .then(data =>{
          setVerificacionRealizada(true);
          // Mostrar una alerta de Toast si la sesión ha expirado
          if (data.sessionId=== 0 || data.sessionId === null) {
            logout();
            toast.error("La sesión ha expirado", {
              autoClose: 2000, // La alerta se cerrará automáticamente después de 2 segundos
              closeOnClick: true // La alerta se cerrará al hacer clic en ella
            });
          }
        })
        .catch(error => console.error('Error fetching domicilios data:', error));
    }}
  }, [usuario,verificacionRealizada]);


  const cerrarSesion = async () => {
    try {
      // Llamada a la API para cerrar sesión
      await axios.post('https://backend-c-r-production.up.railway.app/users/logout', { sessionId:usuario.sesion });
  
      // Ejecutar la función logout() (suponiendo que ya está definida en tu código)
      logout();
  
      // Realizar otras acciones (por ejemplo, mostrar un mensaje de éxito)
      toast.error("Cierre de sesión exitoso. ¡Hasta pronto!");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      clearCart();
    } catch (error) {
      // Manejar errores si la llamada a la API falla
      console.error('Error al cerrar sesión:', error);
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
            placeholder="¿Qué productos buscas el dia de hoy?"
            onChange={handleSearch}
          />
          <button>
            <MdSearch size={25} />
          </button>
        </div>
        <nav className="mt-3">
          <ul>
            <li className="cinta-opciones">
              <DropdownMenu />
            </li>
            <li className="cinta-opciones">
              <Link to="/purchase-history">Historial</Link>
            </li>
            <li className="cinta-opciones">
              <Link to="">Compras</Link>
            </li>
            <li className="cinta-opciones">
              <Link to="">Ofertas</Link>
            </li>
            {!usuario ? (
              <li className="cinta-opciones">
                <a onClick={activarModal}>Iniciar sesión</a>
                {mostrarModal && (
                  <ModalComponent show={mostrarModal} onClose={cerrarModal} />
                )}
              </li>
            ) : (
              <li className="cinta-opciones">
                <Link onClick={cerrarSesion}>Cerrar sesión</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="columna" style={{ width: "25%" }}>
        <div className="profile">
          <img
            className="logo-user"
            src="/images/user.png"
            alt="Banner de Usuario"
          />
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
        <div className="cart">
          <Link to="/checkup">
            <MdShoppingCart size={40} />
            {totalItemsEnCarrito > 0 && (
              <span className="numero-items-carrito fw-bold">
                {totalItemsEnCarrito}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
