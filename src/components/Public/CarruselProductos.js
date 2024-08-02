import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const CarruselProductos = () => {
  const [products, setProducts] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const elementsPerPage = 3;

  useEffect(() => {
    fetch(
      "https://backend-c-r-production.up.railway.app/products/randomProducts"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
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
        <div className="carrusel-detalle catalogo mt-4">
          {products
            .slice(startIdx, startIdx + elementsPerPage)
            .map((product) => (
              <Link
                      to={`/product/${product.productoId}`}
                      className="text-decoration-none"
                    >
                      <div className="card shadow-sm">
                        <div className="cont-img item-center">
                          <img
                            src={product.imagen}
                            className="card-img-top img-catalog"
                            alt={product.nombre}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{product.nombre}</h5>
                          <p className="card-text fw-bold mt-3">{`$ ${product.precioFinal}`}</p>
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
