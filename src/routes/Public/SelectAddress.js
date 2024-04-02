import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const SelectAddress = () => {
  const [sucursales, setSucursales] = useState([]);
  const [domicilioS, setDomicilios] = useState([]);
  const [mostrarSucursales, setMostrarSucursales] = useState(false);
  const [mostrarDomicilios, setMostrarDomicilios] = useState(false);
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken && decodedToken.customerId) {
      const UserId = decodedToken.customerId;

      // Obtener sucursales
      fetch(
        "https://backend-c-r-production.up.railway.app/address/get-sucursal"
      )
        .then((response) => response.json())
        .then((data) => setSucursales(data))
        .catch((error) =>
          console.error("Error fetching sucursales data:", error)
        );

      // Obtener domicilios
      fetch(
        `https://backend-c-r-production.up.railway.app/address/get-domicilio/${UserId}`
      )
        .then((response) => response.json())
        .then((data) => setDomicilios(data))
        .catch((error) =>
          console.error("Error fetching domicilios data:", error)
        );
    }
  }, [decodedToken]);

  const { cart } = useContext(CartContext);
  const totalItemsEnCarrito = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Calcular el total del IVA sumando el IVA de cada producto en el carrito
  const totalIVA = cart.reduce(
    (total, item) => total + item.IVA * item.cantidad,
    0
  );

  const handleChangeEnvio = (event) => {
    if (event.target.value === "domicilio") {
      setMostrarDomicilios(true);
    } else {
      setMostrarDomicilios(false);
    }
    if (event.target.value === "sucursal") {
      setMostrarSucursales(true);
    } else {
      setMostrarSucursales(false);
    }
  };

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
                <div className="col-md-1">
                  <input
                    type="radio"
                    name="envio"
                    value="domicilio"
                    className="form-check-input ml-4"
                    onChange={handleChangeEnvio}
                  />
                </div>
                <div className="col-md-11 row ml-1">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Enviar a domicilio
                  </h5>
                </div>
              </div>

              {mostrarDomicilios &&
                (domicilioS.length > 0 ? (
                  <div className="row mt-2">
                    {domicilioS.map((domicilio, index) => (
                      <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                          <div className="card-body d-flex flex-column">
                            <div className="row">
                              <div className="col-md-1 d-flex align-items-center justify-content-center">
                                <input
                                  type="radio"
                                  name={`domicilio`}
                                  value={domicilio.DomicilioId}
                                  className="form-check-input"
                                />
                              </div>
                              <div className="col-md-11">
                                <h5 className="card-title fw-bold">
                                  {domicilio.Nombre}
                                </h5>
                              </div>
                            </div>
                            <div className="row ml-2 mr-2 flex-grow-1">
                              <span>{domicilio.Calle}</span>
                              <span>{domicilio.Telefono}</span>
                              <span>{domicilio.Referencias}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="row mt-4 text-center">
                    <p className="text-muted mt-2">
                      Aún no tiene domicilios registrados, por favor añada uno.
                    </p>
                  </div>
                ))}

              <div className="row"></div>
              <div className="row">
                <div className="text-login">
                  <Link to="/new-address" className="text-primary fw-bold">
                    <p>Agregar nueva direccion</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3 mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-1">
                  <input
                    type="radio"
                    name="envio"
                    value="sucursal"
                    className="form-check-input ml-4"
                    onChange={handleChangeEnvio}
                  />
                </div>
                <div className="col-md-11 row ml-1">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Recoger en alguna de nuestras sucursales
                  </h5>
                </div>
              </div>
              {mostrarSucursales && (
                <div className="row mt-2">
                  {sucursales.map((sucursal, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                          <div className="row">
                            <div className="col-md-1 d-flex align-items-center justify-content-center">
                              <input
                                type="radio"
                                name={`sucursal`}
                                value={sucursal.SucursalId}
                                className="form-check-input"
                              />
                            </div>
                            <div className="col-md-11">
                              <h5 className="card-title fw-bold">
                                {sucursal.Nombre}
                              </h5>
                            </div>
                          </div>
                          <div className="row ml-2 mr-2 mt-2 flex-grow-1">
                            <span>{sucursal.Calle}</span>
                            <span>{sucursal.Telefono}</span>
                            <span>{sucursal.Horario}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                          $ {(item.precioFinal * item.cantidad).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <hr />
                  <tr>
                    <td>
                      <strong>IVA incluido</strong>
                    </td>
                    <td className="text-right">
                      <strong>${totalIVA.toFixed(2)}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
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
                </table>

                <div className="cont-buttons text-center mt-4">
                  <Link to="/select-address" className="btn-primary">
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
