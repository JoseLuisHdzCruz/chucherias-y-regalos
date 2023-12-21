import React from 'react';
import '../styles/styles.css';
import { MdChevronRight } from 'react-icons/md';
// import CookieBanner from '../components/CookieBanner';

function Home() {
  return (
    <main>
      <h5 className="fw-semibold">Inicio < MdChevronRight size={25} className='icon-aling' /></h5>

      <h2 className="title-pag fw-bold mt-3">Recomendados</h2>
      <hr className="hr-primary" />

      <div className="catalog">
        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/oso de peluche.jpg" className="card-img-top img-catalog" alt="Oso de peluche" />
            </div>
            <div className="card-body mt-3">
              
              <div className="cont-description">
                <h4>Oso Osito De Peluche Teo</h4>
              </div>
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 150.00</h3>
              </div>
              
            </div>
          </div>
        </a>

        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/R (2).jpg" className="card-img-top img-catalog" alt="..." />
            </div>
            <div className="card-body mt-3">
              <div className="cont-description">
                <h4>Alcancia de cerdito colorida</h4>
              </div>
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 70.00</h3>
              </div>
            </div>
          </div>
        </a>

        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/R.jpg" className="card-img-top img-catalog" alt="..." />
            </div>
            <div className="card-body mt-3">
              <div className="cont-description">
                <h4>Mochila para niñas con forma de catarina</h4>
              </div>
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 160.00</h3>
              </div>
            </div>
          </div>
        </a>

        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/collar.jpg" className="card-img-top img-catalog" alt="..." />
            </div>
            <div className="card-body mt-3">
              <div className="cont-description">
                <h4>Collar para dama con piedra preciosa</h4>
              </div>
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 120.00</h3>
              </div>
            </div>
          </div>
        </a>
      </div>

      <h2 className="title-pag fw-bold mt-4">Ofertas</h2>
      <hr className="hr-primary" />

      <div className="catalog">
        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/R (1).jpg" className="card-img-top img-catalog" alt="..." />
            </div>
            <div className="card-body mt-3">
              <div className="cont-description">
                <h4>Caja registradora de juguete para niñas</h4>
              </div>
              
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 150.00</h3>
              </div>
            </div>
          </div>
        </a>

        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/R (2).jpg" className="card-img-top img-catalog" alt="..." />
            </div>
            <div className="card-body mt-3">
              <div className="cont-description">
                <h4>Alcancia de cerdito colorida</h4>
              </div>
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 70.00</h3>
              </div>
            </div>
          </div>
        </a>

        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/R.jpg" className="card-img-top img-catalog" alt="..." />
            </div>
            <div className="card-body mt-3">
              <div className="cont-description">
                <h4>Mochila para niñas con forma de catarina</h4>
              </div>
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 160.00</h3>
              </div>
            </div>
          </div>
        </a>

        <a href="/product">
          <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="cont-img">
              <img src="/images/collar.jpg" className="card-img-top img-catalog" alt="..." />
            </div>
            <div className="card-body mt-3">
              <div className="cont-description">
                <h4>Collar para dama con piedra preciosa</h4>
              </div>
              <div className="cont-price mt-4">
                <h3 className="fw-bold">$ 120.00</h3>
              </div>
            </div>
          </div>
        </a>
      </div>

    </main>
  );
}

export default Home;
