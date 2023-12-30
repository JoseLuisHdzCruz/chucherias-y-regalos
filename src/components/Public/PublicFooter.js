import React from "react";
import {
  MdEmail,
  MdCall,
  MdHelpOutline,
  MdGavel,
  MdPolicy,
  MdCookie,
  MdGroup,
} from "react-icons/md";

function PublicFooter() {
  return (
    <>
      <footer className="d-flex">
        <div className="column">
          <h3>¿Quiénes somos?</h3>
          <p>
            En Chucherías & Regalos, creamos magia para todas las edades: desde
            juguetes que inspiran sonrisas hasta regalos y accesorios que añaden
            elegancia a la vida de las damas. Celebra la vida con nosotros.
          </p>
        </div>
        <div className="column">
          <h3>Contacto</h3>
          <ul>
            <li>
              <div className="icon-container">
                <MdGroup size={25} />
              </div>
              <a href="/quienes-somos">Acerca de nosotros</a>
            </li>
            <li>
              <div className="icon-container">
                <MdEmail size={25} />
              </div>
              Chucherías&Regalos@gmail.com
            </li>
            <li>
              <div className="icon-container">
                <MdCall size={25} />
              </div>
              771 342 4284
            </li>
          </ul>
        </div>
        <div className="column">
          <h3>Acerca de</h3>
          <ul>
            <li>
              <a href="/terms-cond" className="d-flex">
                <div className="icon-container">
                  <MdGavel size={25} />
                </div>
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="d-flex">
                <div className="icon-container">
                  <MdPolicy size={25} />
                </div>
                Políticas de privacidad
              </a>
            </li>
            <li>
              <a href="/cookies" className="d-flex">
                <div className="icon-container">
                  <MdCookie size={25} />
                </div>
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-end text-center">
        <div className="float-right d-none d-sm-block">
          <b>Versión</b> 1.0 
        </div>
        <strong>
          &copy; 2023 <a href="http://innego.net">Chucherias & Regalos</a>. | Todos los derechos
          reservados.
        </strong>
      </div>
    </>
  );
}

export default PublicFooter;
