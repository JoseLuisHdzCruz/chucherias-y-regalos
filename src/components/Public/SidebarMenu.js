import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ModalComponent from "./Modal";
import { MdClose, MdLogout, MdLogin, MdHistory, MdSell, MdAddShoppingCart, MdCategory } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import "../../styles/styles.css";
import "../../styles/stylesResponsive.css";

function SidebarMenu({
  activarModal,
  mostrarModal,
  cerrarModal,
  cerrarSesion,
  menuVisible,
  toggleMenu,
}) {
  const [usuario, setUsuario] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUsuario(decoded);
      setSelectedSexo(decoded.sexo);
    } else {
      setUsuario(null);
    }
  }, [token]);

  const handleLogin = () => {
    toggleMenu();
    activarModal();
  };
  return (
    <>
      <nav className={`Menu ${menuVisible ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          <MdClose size={30} />
        </button>
        <ul>
          {usuario ? (
            <li className="sidebar-item fw-bold">
              <Link onClick={toggleMenu} to="/user-profile">
                {usuario.imagen ? (
                  <img
                    src={usuario.imagen}
                    className="img-fluid mt-2 rounded-image"
                    alt={usuario.nombre}
                  />
                ) : selectedSexo === "masculino" ? (
                  <img
                    src="/images/user-masculino.png"
                    className="logo-user rounded-image"
                    alt={usuario.nombre}
                  />
                ) : (
                  <img
                    src="/images/OIP (1).jpg"
                    className="logo-user rounded-image"
                    alt={usuario.nombre}
                  />
                )}
                {usuario.nombre}
              </Link>
            </li>
          ) : (
            <li className="sidebar-item fw-bold">
              <Link>
                <img
                    className="logo-user rounded-image"
                    src="/images/user.png"
                    alt="Banner de Usuario"
                />
                Usuario
              </Link>
            </li>
          )}
        </ul>
        <hr className="border border-secondary border-3 opacity-75" />
        <ul>
          <li className="sidebar-item">
          <DropdownMenu />
          </li>
          <li className="sidebar-item">
            <Link onClick={toggleMenu} to="/ofertas"><MdSell size={25}/> Ofertas</Link>
          </li>
          <li className="sidebar-item">
            <Link onClick={toggleMenu} to="/mas-vendidos"><MdAddShoppingCart size={25}/> Más vendidos</Link>
          </li>
          {!usuario ? (
            <>
              <li className="sidebar-item login">
                <a onClick={handleLogin}><MdLogin size={25}/> Iniciar sesión</a>
                {mostrarModal && (
                  <ModalComponent show={mostrarModal} onClose={cerrarModal} />
                )}
              </li>
            </>
          ) : (
            <>
              <li className="sidebar-item">
                <Link onClick={toggleMenu} to="/purchase-history"><MdHistory size={25}/> Historial de compra</Link>
              </li>
              <li className="sidebar-item logout">
                <Link onClick={cerrarSesion}><MdLogout size={25}/> Cerrar sesión</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default SidebarMenu;
