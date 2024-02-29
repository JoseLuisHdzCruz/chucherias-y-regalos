import React, { useState, useEffect } from "react";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom"; 
import DropdownMenu from "./DropdownMenu";
import ModalComponent from "./Modal";
import "../../styles/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PublicHeader() {
  const [usuario, setUsuario] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
  
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
  
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setScrolled(true);
      } else {
        // Scrolling up
        setScrolled(false);
      }
  
      lastScrollTop = currentScrollTop;
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    toast.error("Cierre de sesión exitoso. ¡Hasta pronto!");
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

  // modal iniciar sesion
  const [mostrarModal, setMostrarModal] = useState(false);

  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <header className={`d-flex ${scrolled ? 'hidden' : 'sticky'}`}>
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
          />
          <Link to="/search">
            {" "}
            {/* Cambiado <a> por <Link> y href por to */}
            <MdSearch size={25} />
          </Link>
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
          {usuario ? <h3>{usuario.nombre} {usuario.aPaterno}</h3> : <h3>Usuario</h3>}
        </div>
        <div className="cart">
          <Link to="/checkup">
            {/* Cambiado <a> por <Link> y href por to */}
            <MdShoppingCart size={40} />
          </Link>
        </div>
      </div>
      <ToastContainer />
    </header>
  );
}

export default PublicHeader;
