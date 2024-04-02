import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const CarruselProductos = () => {
  const [products, setProducts] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const elementsPerPage = 3;

  useEffect(() => {
    fetch("https://backend-c-r-production.up.railway.app/products/randomProducts")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleMoveLeft = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - 1);
    }
  };

  const handleMoveRight = () => {
    const maxStartIdx = products.length - elementsPerPage;
    if (startIdx < maxStartIdx) {
      setStartIdx(startIdx + 1);
    }
  };

  return (
    <>
      <hr className="hr-primary" />
      <h4 className="title-pag fw-bold mt-3">También podría gustarte</h4>

      <div className="carrusel-container mb-4">
        <div className="carrusel-detalle mt-4">
          {products.slice(startIdx, startIdx + elementsPerPage).map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src={product.imagen}
                    className="card-img-top img-catalog"
                    alt={product.nombre}
                  />
                </div>
                <div className="card-body mt-2">
                  <div className="cont-description">
                    <h5>{product.nombre}</h5>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {startIdx > 0 && (
        <button
          type="button"
          className="carrusel-button carrusel-button-left"
          onClick={handleMoveLeft}
        >
          <span aria-hidden="true">
            <MdArrowLeft size={40} />
          </span>
        </button>
      )}
      {startIdx < products.length - elementsPerPage && (
        <button
          type="button"
          className="carrusel-button carrusel-button-right"
          onClick={handleMoveRight}
        >
          <span aria-hidden="true">
            <MdArrowRight size={40} />
          </span>
        </button>
      )}
    </>
  );
};

export default CarruselProductos;
