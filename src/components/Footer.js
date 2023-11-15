import React from 'react';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdEmail, MdCall, MdHelpOutline, MdGavel, MdPolicy } from 'react-icons/md';

function Footer() {
  return (
    <footer>
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
              <MdEmail size={25} />
            </div>
            Chucherías&Regalos@gmail.com
          </li>
          <li>
            <div className="icon-container">
              <MdCall size={25} />
            </div>
            771 002 0231
          </li>
        </ul>
      </div>
      <div className="column">
        <h3>Acerca de</h3>
        <ul>
          <li>
            <div className="icon-container">
              <MdGavel size={25} />
            </div>
            Términos y condiciones
          </li>
          <li>
            <div className="icon-container">
              <MdPolicy size={25} />
            </div>
            Políticas de privacidad
          </li>
          <li>
            <div className="icon-container">
              <MdHelpOutline size={25} />
            </div>
            Preguntas frecuentes
          </li>
        </ul>
      </div>

      
    </footer>
    
  );
}

export default Footer;
