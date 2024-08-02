import React, { useContext, useState } from "react";
import {
  MdAdd,
  MdRemove,
  MdDelete,
  MdRemoveShoppingCart,
} from "react-icons/md";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Public/PageTitle";
import { CartContext } from "../../context/CartContext";
import ConfirmationModal from "../../components/Public/ConfirmationModal";

const Carrito = () => {
  const { cart, removeFromCart, addToCart, clearCart } =
    useContext(CartContext);
  const totalItemsEnCarrito = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Calcular el total del IVA sumando el IVA de cada producto en el carrito
  const totalIVA = cart.reduce(
    (total, item) => total + item.IVA * item.cantidad,
    0
  );

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
              <h4 className="mr-4">
                Actualmente tiene: {totalItemsEnCarrito} productos en su carrito
              </h4>
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
              <h4 className="text-center">El carrito actualmente está vacío</h4>
            </div>
            <hr className="hr-primary" />
            <div className="text-center">
              <MdRemoveShoppingCart size={150} color="gray" />
            </div>
          </>
        )}
      </div>

      <div className="row">
        <div className="col-lg-8">
          {Object.values(cart).map((item, index) => (
            <div key={index} className="card column-detail mb-3 mt-4">
              <div className="card-body">
                <div className="row">
                <div className="col-md-5 row ml-4 item-carrito-responsive">
                    <h5
                      className="card-title fw-bold mr-2"
                      style={{ fontSize: "20px" }}
                    >
                      {item.nombre}
                    </h5>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.productoId)}
                    >
                      Quitar del carrito <MdDelete size={25} />
                    </button>
                  </div>
                  <div className="col-md-2 item-center">
                    <img
                      src={item.imagen}
                      className="card-img-top img-catalog img-carrito-row"
                      alt={item.nombre}
                    />
                  </div>
                  <div className="col-md-5 row ml-1 item-no-responsive">
                    <h5
                      className="card-title fw-bold product-carrito"
                      style={{ fontSize: "20px" }}
                    >
                      {item.nombre}
                    </h5>
                    <div className="cont-options ml-4">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.productoId)}
                      >
                        Quitar de carrito <MdDelete size={25} color="white" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5 aling-center-cont">
                    <div className="d-flex flex-column align-items-center col-md-6">
                      <h5>Cantidad</h5>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary me-2"
                          onClick={() => handleDecrement(item)}
                        >
                          <MdRemove size={25} />
                        </button>
                        <span className="value">{item.cantidad}</span>
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() => handleIncrement(item)}
                        >
                          <MdAdd size={25} />
                        </button>
                      </div>
                    </div>

                    <div className="d-flex text-center col-md-6">
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
          <div className="col-lg-4">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="text-center text-uppercase fw-bold">
                  Información de compra
                </h5>
                <hr className="hr-primary-cont" />
                <table className="table table-borderless">
                  <tbody>
                    {Object.values(cart).map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.nombre} ({item.cantidad})
                        </td>
                        <td className="text-right">
                          $ {(item.precioFinal * item.cantidad).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>IVA incluido</td>
                      <td className="text-right">${totalIVA.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total productos ({totalItemsEnCarrito})</strong>
                      </td>
                      <td className="text-right">
                        <strong>
                          ${" "}
                          {Object.values(cart)
                            .reduce(
                              (total, item) =>
                                total + item.precioFinal * item.cantidad,
                              0
                            )
                            .toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center mt-4">
                  <Link to="/select-address" className="btn btn-success">
                    Continuar con la compra
                  </Link>
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
        title="¿VACIAR CARRITO?"
        message="¿Estás seguro de que deseas vaciar tu carrito? Esta acción no se puede deshacer."
      />
    </main>
  );
};

export default Carrito;
