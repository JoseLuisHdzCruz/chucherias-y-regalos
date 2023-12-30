import React from 'react';
import PageTitle from '../../components/PageTitle'
import { MdChevronRight } from 'react-icons/md';
// import CookieBanner from '../components/CookieBanner';

function Home() {
  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Inicio" />

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
                <h5>Oso Osito De Peluche Teo</h5>
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
                <h5>Alcancia de cerdito colorida</h5>
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
                <h5>Mochila para niñas con forma de catarina</h5>
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
                <h5>Collar para dama con piedra preciosa</h5>
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
                <h5>Caja registradora de juguete para niñas</h5>
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
                <h5>Alcancia de cerdito colorida</h5>
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
                <h5>Mochila para niñas con forma de catarina</h5>
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
                <h5>Collar para dama con piedra preciosa</h5>
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
