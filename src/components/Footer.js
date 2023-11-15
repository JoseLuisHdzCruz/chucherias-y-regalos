import React from 'react';
import '../styles/styles.css';
import { MdEmail, MdCall, MdHelpOutline, MdGavel, MdPolicy, MdCookie, MdGroup } from 'react-icons/md';

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
        <a href='/quienes-somos' cla><MdGroup size={25} className='icon-aling' /> <strong>Acerca de nosotros</strong></a>
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
            771 342 4284
          </li>
        </ul>
      </div>
      <div className="column">
        <h3>Acerca de</h3>
        <ul>
          <li>
            <a href='/terms-cond' className='d-flex'>
              <div className="icon-container">
                <MdGavel size={25} />
              </div>
              Términos y condiciones
            </a>
            
          </li>
          <li>
            <a href='/privacy-policy' className='d-flex'>
              <div className="icon-container">
                <MdPolicy size={25} />
              </div>
              Políticas de privacidad
            </a>
          </li>
          <li>
            <a href='/cookies' className='d-flex'>
              <div className="icon-container">
                <MdCookie size={25} />
              </div>
              Cookies
            </a>
          </li>
        </ul>
      </div>

      
    </footer>
    
  );
}

export default Footer;