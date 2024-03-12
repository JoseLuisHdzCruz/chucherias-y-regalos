import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const CarruselProductos = () => {
  const [startIdx, setStartIdx] = useState(0);
  const elementsPerPage = 3;
  const handleMoveLeft = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - 1);
    }
  };

  const handleMoveRight = () => {
    const maxStartIdx = 4 - elementsPerPage; // Ajusta esto según la cantidad total de elementos
    if (startIdx < maxStartIdx) {
      setStartIdx(startIdx + 1);
    }
  };
  return (
    <>
      <hr className="hr-primary" />
      <h4 className="title-pag fw-bold mt-3">Tambien podria gustarte</h4>

      <div className="carrusel-container mb-4">
        <div className="carrusel-detalle mt-4">
          <Link
            to="/product"
            style={{ display: startIdx <= 0 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="Oso de peluche"
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Oso Osito De Peluche Teo</h5>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/product"
            style={{ display: startIdx <= 1 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="..."
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Alcancia de cerdito colorida</h5>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/product"
            style={{ display: startIdx <= 2 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="..."
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Mochila para niñas con forma de catarina</h5>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/product"
            style={{ display: startIdx <= 3 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="..."
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Collar para dama con piedra preciosa</h5>
                </div>
              </div>
            </div>
          </Link>
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
      {startIdx < 4 - elementsPerPage && (
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
