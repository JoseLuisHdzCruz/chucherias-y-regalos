import React, { useState, useContext } from "react";
import {
  MdAdd,
  MdRemove,
  MdDelete
} from "react-icons/md";
import PageTitle from '../../components/PageTitle'
import { CartContext } from '../../context/CartContext';

const Carrito = () => {
  const { cart, removeFromCart, addToCart  } = useContext(CartContext);

  const handleIncrement = (product) => {
    addToCart(product, 1); // Suponiendo que addToCart actualiza la cantidad en 1
  };
  
  const handleDecrement = (product) => {
    // Comprueba si la cantidad es mayor que 1 antes de decrementar
    const itemInCart = cart.find(item => item.productoId === product.productoId);
    if (itemInCart && itemInCart.cantidad > 1) {
      addToCart(product, -1); // Suponiendo que addToCart permite actualizar la cantidad
    } else {
      removeFromCart(product.productoId); // Eliminar si la cantidad llega a 0
    }
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Carrito" />
      <h3 className="title-pag fw-bold text-uppercase">
        CARRITO DE COMPRAS
      </h3>
      <hr className="hr-primary" />

      <div className="detail-product">
        <div className="colum-detail">
          {Object.values(cart).map((item, index) => (
            <div key={index} className="card mb-3 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <img
                      src={item.imagen}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-5 row ml-1">
                    <h5 className="card-title" style={{ fontSize: "20px" }}>
                      {item.nombre}
                    </h5>
                    <div className="cont-options">
                      <button className="btn-option" onClick={() => removeFromCart(item.productoId)}><MdDelete size={25}/></button>
                    </div>
                  </div>
                  <div className="col-md-5 aling-center-cont">
                    <div className="cont-cant d-flex align-items-center justify-content-center">
                      <div className="counter">
                        <button className="decrement" onClick={() => handleDecrement(item)}>
                          <MdRemove size={25} />
                        </button>
                        <span className="value">{item.cantidad}</span>
                        <button className="increment" onClick={() => handleIncrement(item)}>
                          <MdAdd size={25} />
                        </button>
                      </div>
                      <h2>$ {item.precio}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="colum-add">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="text-center">Informacion de compra</h5>
              <hr className="hr-primary-cont" />
              <table>
                <tbody>
                  {Object.values(cart).map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre} ({item.cantidad})</td>
                      <td className="text-right">$ {item.precio * item.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
                <hr/>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td className="text-right">
                    <strong>$ {Object.values(cart).reduce((total, item) => total + (item.precio * item.cantidad), 0)}</strong>
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
