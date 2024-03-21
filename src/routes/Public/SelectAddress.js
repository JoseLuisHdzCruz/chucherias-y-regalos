import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { CartContext } from "../../context/CartContext";

const SelectAddress = () => {
  const { cart } =
    useContext(CartContext);
  const totalItemsEnCarrito = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Carrito" />
      <h3 className="title-pag fw-bold text-uppercase">CARRITO DE COMPRAS</h3>
      <hr className="hr-primary" />
      <div className="ml-4 mr-4">
        <div className="d-flex mr-4 ml-4">
          <h3>Elige la forma de entrega</h3>
        </div>

        <hr className="hr-primary" />
      </div>

      <div className="detail-product">
        <div className="colum-detail">
          <div className="card mb-3 mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 row ml-1">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Enviar a domicilio
                  </h5>
                  <div className="cont-options btn-delete ml-4">
                    <button className="btn-option">
                      <MdDelete size={25} color="white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3 mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 row ml-1">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Recoger en alguna de nuestras sucursales
                  </h5>
                  <div className="cont-options btn-delete ml-4">
                    <button className="btn-option">
                      <MdDelete size={25} color="white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                          $ {item.precio * item.cantidad}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <hr />
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className="text-right">
                      <strong>
                        ${" "}
                        {Object.values(cart).reduce(
                          (total, item) => total + item.precio * item.cantidad,
                          0
                        )}
                      </strong>
                    </td>
                  </tr>
                </table>

                <div className="cont-buttons text-center mt-4">
                  <Link to="" className="btn-primary">
                    Continuar con la compra
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SelectAddress;
