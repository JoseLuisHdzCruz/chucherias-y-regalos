import React, { useState } from 'react';
import '../styles/styles.css';

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

  return (
    <main>
      <h5 className="fw-semibold">Inicio > Detalle producto</h5>

      <h3 className="title-pag fw-bold text-uppercase mt-3">Detalle del producto</h3>
      <hr className="hr-primary" />

      <div className="detail-product">
        <div className="colum-detail">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-6">
                <img src="./images/R (1).jpg" className="img-fluid rounded-start mt-4" alt="Caja Registradora de juguete" />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">Caja registradora de juguete para niñas</h5>
                  <h2 className="text-price mt-4 fw-bold">$ 150.00</h2>
                  <p className="card-text">
                    Estimado cliente. Hola. El juego de juguetes para niños de la
                    caja registradora es adecuado para niñas y niños y es el mejor
                    regalo para los niños.Te regalamos 3 pilas , puede usar el
                    producto directamente. Tenemos colores rosa y gris para
                    elegir. El producto coincide con la imagen. Esperando tu
                    pedido. Estamos aquí para servirle.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="colum-add">

          <div className="card mb-4">
              <div className="card-title text-center">
                Escanea con la app!!
              </div>
            <div className="card-body">
              <div className="qr">
                <img src="./images/qrcode-generado.png" className="img-fluid rounded-start mt-4" alt="..." />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">
                Disponible: <strong>10 piezas</strong>
              </h5>
              <div className="cant mt-4">
                <h4>Cantidad</h4>
                <div className="counter">
                  <button className="decrement" onClick={handleDecrement}>-</button>
                  <span className="value">{quantity}</span>
                  <button className="increment" onClick={handleIncrement}>+</button>
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
    </main>
  );
};

export default ProductDetail;
