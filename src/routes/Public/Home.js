import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle'
import { Link } from 'react-router-dom'
import BootstrapCarousel from '../../components/Public/BootstrapCarousel';
// import CookieBanner from '../components/CookieBanner';

function Home({ searchResults }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      // Si hay resultados de búsqueda, establece los resultados como productos a mostrar
      setProducts(searchResults);
    } else {
      // Si no hay resultados de búsqueda, carga los productos desde la API
      fetch('https://backend-c-r-production.up.railway.app/products/')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, [searchResults]);

  // Calcular el índice del primer y último producto en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <BootstrapCarousel />
    <main> 
      <PageTitle title="Chucherias & Regalos | Inicio" />

      <h2 className="title-pag fw-bold">Recomendados</h2>
      <hr className="hr-primary" />

      <div className="catalog">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link to={`/product/${product.productoId}`} key={product.productoId}>
                <div className="card mt-4" style={{ width: '18rem' }}>
                  <div className="cont-img">
                    <img src={product.imagen} className="card-img-top img-catalog" alt={product.nombre} />
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
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>

        {/* Agregar paginación */}
      <ul className="pagination text-center mt-4">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      </main>
    </>
  );
}

export default Home;