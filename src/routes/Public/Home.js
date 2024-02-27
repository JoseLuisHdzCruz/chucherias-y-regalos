import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle'
import { Link } from 'react-router-dom'
import BootstrapCarousel from '../../components/Public/BootstrapCarousel';
// import CookieBanner from '../components/CookieBanner';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch('https://backend-c-r-production.up.railway.app/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
    <BootstrapCarousel />
    <main> 
      <PageTitle title="Chucherias & Regalos | Inicio" />

      <h2 className="title-pag fw-bold">Recomendados</h2>
      <hr className="hr-primary" />

      <div className="catalog">
        {products.map((product) => (
          <Link to={`/product/${product.productoId}`} key={product.productoId}>
            <div className="card mt-4" style={{ width: '18rem' }}>
              <div className="cont-img">
                <img src="/images/icono-producto.jpg" className="card-img-top img-catalog" alt={product.nombre} />
              </div>
              <div className="card-body mt-3">
                <div className="cont-description">
                  <h5>{product.nombre}</h5>
                </div>
                <div className="cont-price mt-4">
                  <h3 className="fw-bold">{`$ ${product.precio}`}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
    </>
    
  );
}

export default Home;
