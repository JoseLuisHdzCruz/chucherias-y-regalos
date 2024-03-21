import React, { useContext, useState } from "react";
import {
  MdAdd,
  MdRemove,
  MdDelete,
  MdRemoveShoppingCart,
} from "react-icons/md";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { CartContext } from "../../context/CartContext";
import ConfirmationModal from "../../components/Public/ConfirmationModal ";

const Carrito = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useContext(
    CartContext
  );
  const totalItemsEnCarrito = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Calcular el total del IVA sumando el IVA de cada producto en el carrito
  const totalIVA = cart.reduce((total, item) => total + (item.IVA * item.cantidad), 0);

  // Estado para controlar la visibilidad del modal de confirmación
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleIncrement = (product) => {
    addToCart(product, 1); // Suponiendo que addToCart actualiza la cantidad en 1
  };

  const handleDecrement = (product) => {
    // Comprueba si la cantidad es mayor que 1 antes de decrementar
    const itemInCart = cart.find(
      (item) => item.productoId === product.productoId
    );
    if (itemInCart && itemInCart.cantidad > 1) {
      addToCart(product, -1); // Suponiendo que addToCart permite actualizar la cantidad
    } else {
      removeFromCart(product.productoId); // Eliminar si la cantidad llega a 0
    }
  };

  const vaciarCarrito = () => {
    setIsConfirmationModalOpen(true); // Mostrar el modal de confirmación
  };

  const confirmVaciarCarrito = () => {
    clearCart();
    setIsConfirmationModalOpen(false); // Cerrar el modal de confirmación después de vaciar el carrito
  };

  const cancelVaciarCarrito = () => {
    setIsConfirmationModalOpen(false); // Cerrar el modal de confirmación sin vaciar el carrito
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Carrito" />
      <h3 className="title-pag fw-bold text-uppercase">CARRITO DE COMPRAS</h3>
      <hr className="hr-primary" />
      <div className="ml-4 mr-4">
        {totalItemsEnCarrito > 0 ? (
          <>
            <div className="d-flex mr-4 ml-4 justify-content-between">
              <h3>
                Actualmente tiene: {totalItemsEnCarrito} productos en su carrito
              </h3>
              <button
                className="btn btn-danger fw-bold"
                onClick={vaciarCarrito}
              >
                Vaciar carrito <MdRemoveShoppingCart size={25} />
              </button>
            </div>

            <hr className="hr-primary" />
          </>
        ) : (
          <>
            <div className="d-flex ml-4 text-center">
              <h2 className="text-center">El carrito actualmente esta vacio</h2>
            </div>

            <hr className="hr-primary" />
            <div className="text-center">
              <MdRemoveShoppingCart size={150} color="gray" />
            </div>
          </>
        )}
      </div>

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
                      alt={item.nombre}
                    />
                  </div>
                  <div className="col-md-5 row ml-1">
                    <h5
                      className="card-title fw-bold"
                      style={{ fontSize: "20px" }}
                    >
                      {item.nombre}
                    </h5>
                    <div className="cont-options btn-delete ml-4">
                      <button
                        className="btn-option"
                        onClick={() => removeFromCart(item.productoId)}
                      >
                        <MdDelete size={25} color="white" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5 aling-center-cont">
                    <div className="cont-cant d-flex align-items-center justify-content-center">
                      <div className="d-flex text-center row">
                        <span className="mb-3">Cantidad</span>
                        <div className="counter">
                          <button
                            className="decrement"
                            onClick={() => handleDecrement(item)}
                          >
                            <MdRemove size={25} className="fw-bold" />
                          </button>
                          <span className="value">{item.cantidad}</span>
                          <button
                            className="increment"
                            onClick={() => handleIncrement(item)}
                          >
                            <MdAdd size={25} />
                          </button>
                        </div>
                      </div>

                      <div className="d-flex text-center row">
                        <span>Precio por pieza:</span>
                        <h2>$ {item.precioFinal}</h2>
                        <span>IVA: ${item.IVA}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalItemsEnCarrito > 0 && (
          <div className="colum-add">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="text-center">Informacion de compra</h5>
                <hr className="hr-primary-cont" />
                <table>
                  <tbody>
                    {Object.values(cart).map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.nombre} ({item.cantidad})
                        </td>
                        <td className="text-right">
                          $ {item.precioFinal * item.cantidad}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <hr />
                  <tr>
                  <td>
                      <strong>IVA Incluido</strong>
                    </td>
                    <td className="text-right">
                      <strong>${totalIVA}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className="text-right">
                      <strong>
                        ${" "}
                        {Object.values(cart).reduce(
                          (total, item) => total + item.precioFinal * item.cantidad,
                          0
                        )}
                      </strong>
                    </td>
                  </tr>
                </table>

                <div className="cont-buttons text-center mt-4">
                  <Link to="/select-address" className="btn-primary">Continuar con la compra</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={cancelVaciarCarrito}
        onConfirm={confirmVaciarCarrito}
        title="¿Vaciar Carrito?"
        message="¿Estás seguro de que deseas vaciar tu carrito? Esta acción no se puede deshacer."
      />
    </main>
  );
};

export default Carrito;
