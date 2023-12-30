import React, { useState } from "react";
import {
    MdChevronRight,
    MdAdd,
    MdRemove,
  } from "react-icons/md";
import PageTitle from '../../components/PageTitle'


const Carrito = () => {

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
      <PageTitle title="Chucherias & Regalos | Carrito" />
      <h5 className="fw-semibold">
        Inicio <MdChevronRight size={25} className="icon-aling" /> Carrito
      </h5>
      <h3 className="title-pag fw-bold text-uppercase mt-3">
        CARRITO DE COMPRAS
      </h3>
      <hr className="hr-primary" />

      <div className="detail-product">
        <div className="colum-detail">
          <div className="card mb-3 mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="./images/R (1).jpg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-5 row">
                  <h5 className="card-title" style={{ fontSize: "20px" }}>
                    Caja registradora de juguete para niñas
                  </h5>
                  <div className="cont-options">
                    <button className="btn-option">Eliminar</button>
                    <a className="a-option" href="">
                      Comprar ahora
                    </a>
                  </div>
                </div>
                <div className="col-md-5 aling-center-cont">
                  <div className="cont-cant d-flex align-items-center justify-content-center">
                  <div className="counter">
                    <button className="decrement" onClick={handleDecrement}>
                        <MdRemove size={25} />
                    </button>
                    <span className="value">{quantity}</span>
                    <button className="increment" onClick={handleIncrement}>
                        <MdAdd size={25} />
                    </button>
                  </div>
                    <h2>$ 150.00</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3 mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="./images/collar.jpg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-5 row">
                  <h5 className="card-title" style={{ fontSize: "20px" }}>
                    Collar para dama con piedra preciosa
                  </h5>
                  <div className="cont-options">
                    <button className="btn-option">Eliminar</button>
                    <a className="a-option" href="">
                      Comprar ahora
                    </a>
                  </div>
                </div>
                <div className="col-md-5 aling-center-cont">
                  <div className="cont-cant d-flex align-items-center justify-content-center">
                  <div className="counter">
                    <button className="decrement" onClick={handleDecrement}>
                        <MdRemove size={25} />
                    </button>
                    <span className="value">{quantity}</span>
                    <button className="increment" onClick={handleIncrement}>
                        <MdAdd size={25} />
                    </button>
                  </div>
                    <h2>$ 150.00</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="colum-add">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="text-center">Informacion de compra</h5>
              <hr className="hr-primary-cont" />
              <table>
                <tr>
                  <td>Producto(2)</td>
                  <td className="text-righ">$ 300.00</td>
                </tr>
                <tr>
                  <td>Envio</td>
                  <td className="text-righ">$ 50.00</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td className="text-righ">
                    <strong>$ 350.00</strong>
                  </td>
                </tr>
              </table>
              <div className="cont-buttons text-center mt-4">
                <button className="btn-primary">Proceder a pago</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Carrito;
