import PageTitle from '../../components/PageTitle'
import React, { useState, useEffect } from "react";
import {
  MdChevronRight,
  MdAdd,
  MdRemove,
  MdArrowRight,
  MdArrowLeft,
} from "react-icons/md";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Funcion del carrusel
  // const [position, setPosition] = useState(0);

  // const handleMoveLeft = () => {
  //   setPosition((prevPosition) => prevPosition - 1);
  // };

  // const handleMoveRight = () => {
  //   setPosition((prevPosition) => prevPosition + 1);
  // };

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
    <main>
      <PageTitle title="Chucherias & Regalos | Detalle del producto" />

      <h5 className="fw-semibold">
        Inicio <MdChevronRight size={25} className="icon-aling" /> Detalle
        producto
      </h5>

      <h3 className="title-pag fw-bold text-uppercase mt-3">
        Detalle del producto
      </h3>
      <hr className="hr-primary" />

      <div className="detail-product">
        <div className="colum-detail">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src="/images/oso de peluche.jpg"
                  className="img-fluid rounded-start mt-4"
                  alt="Oso de peluche"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h2 className="card-title">Oso Osito De Peluche Teo</h2>
                  <h2 className="text-price mt-4 fw-bold">$ 150.00</h2>
                  <p className="card-text">
                    Hermoso osito Teo súper esponjosito y suave. Calidad
                    PREMIUM. <br /> Ideal para arreglos de mesa y regalo. Si no
                    encuentra los sets de este mismo modelo puede preguntar por
                    ellos.
                    <br /> <br /> Tamaño: 25cm (en diagonal de oreja a pie){" "}
                    <br /> Color: Café **COMO SE VE EN LAS FOTOS** <br />{" "}
                    Material: Poliéster <br /> Edad recomendada: +3 años
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="colum-add">
          {/* <div className="card mb-4">
            <div className="card-title text-center">Escanea con la app!!</div>
            <div className="card-body">
              <div className="qr">
                <img
                  src="./images/qrcode-generado.png"
                  className="img-fluid rounded-start mt-4"
                  alt="..."
                />
              </div>
            </div>
          </div> */}

          <div className="card">
            <div className="card-body">
              <h5 className="text-center">
                Disponible: <strong>10 piezas</strong>
              </h5>
              <div className="cant mt-4">
                <h5>Cantidad</h5>
                <div className="counter">
                  <button className="decrement" onClick={handleDecrement}>
                    <MdRemove size={25} />
                  </button>
                  <span className="value">{quantity}</span>
                  <button className="increment" onClick={handleIncrement}>
                    <MdAdd size={25} />
                  </button>
                </div>
              </div>
              <div className="cont-buttons text-center mt-4">
                <button className="btn-secondary">Comprar ahora</button>
                <button className="btn-primary">Agregar a carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="hr-primary" />
      <h4 className="title-pag fw-bold mt-3">Tambien podria gustarte</h4>

      <div className="carrusel-container mb-4">
        <div
          className="carrusel-detalle mt-4"
        >
            <a href="/product" style={{ display: startIdx <= 0 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/oso de peluche.jpg"
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
            </a>

            <a href="/product" style={{ display: startIdx <= 1 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/R (2).jpg"
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
            </a>

            <a href="/product" style={{ display: startIdx <= 2 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/R.jpg"
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
            </a>

            <a href="/product" style={{ display: startIdx <= 3 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/collar.jpg"
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
            </a>
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
    </main>
  );
};

export default ProductDetail;
