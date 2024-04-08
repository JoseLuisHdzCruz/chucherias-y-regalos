import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {
  MdHome,
  MdStore
} from "react-icons/md";

const SelectAddress = () => {
  const [sucursales, setSucursales] = useState([]);
  const [domicilioS, setDomicilios] = useState([]);
  const [mostrarSucursales, setMostrarSucursales] = useState(false);
  const [mostrarDomicilios, setMostrarDomicilios] = useState(false);
  const [envio, setEnvio] = useState(0); // Nuevo estado para almacenar el CP seleccionado
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(false); // Nuevo estado para rastrear la selección de dirección
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(false); // Nuevo estado para rastrear la selección de sucursal
  const [selectedSucursalId, setSelectedSucursalId] = useState(null);
  const [selectedDomicilioId, setSelectedDomicilioId] = useState(null);

  const navigate = useNavigate(); // Importa useHistory para redireccionar

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

  const handleSelectDomicilio = async (event) => {
    try {
      const selectedCPValue = event.target.dataset.cp;
      console.log(selectedCPValue);
      const response = await fetch(
        `https://backend-c-r-production.up.railway.app/address/get-colonias/${selectedCPValue}`
      );
      if (!response.ok) {
        throw new Error(
          `Error al obtener las colonias: ${response.statusText}`
        );
      }
      const data = await response.json();
      const envio = data[0].envio;
      setEnvio(envio); // Actualizar el estado del CP seleccionado
      setSelectedDomicilioId(event.target.value);
      setDireccionSeleccionada(true); // Actualizar el estado cuando se seleccione una dirección
    } catch (e) {
      console.log("Error al obtener el CP del usuario");
    }
  };

  const handleChangeEnvio = (event) => {
    if (event.target.value === "domicilio") {
      setMostrarDomicilios(true);
      setMostrarSucursales(false); // Ocultar las sucursales cuando se selecciona domicilio
      setSucursalSeleccionada(false); // Reiniciar el estado de selección de sucursal
    } else if (event.target.value === "sucursal") {
      setMostrarSucursales(true);
      setMostrarDomicilios(false); // Ocultar los domicilios cuando se selecciona sucursal
      setDireccionSeleccionada(false); // Reiniciar el estado de selección de dirección
      setEnvio(0);
    }
  };

  const handleSelectSucursal = (event) => {
    setSelectedSucursalId(event.target.value);
    setSucursalSeleccionada(true); // Actualizar el estado cuando se seleccione una sucursal
  };

  const handleProceedToPayment = () => {
    if (direccionSeleccionada || sucursalSeleccionada) {
      navigate("/select-payment"); // Redirigir solo si se ha seleccionado una dirección
    } else {
      toast.warning(
        "Por favor, seleccione una dirección antes de proceder al pago."
      );
    }
  };

  const productosEnCarrito = cart.map((item) => ({
    productoId: item.productoId, // Suponiendo que tienes un campo productId en tus objetos de producto en el carrito
    producto: item.nombre, // Suponiendo que tienes un campo nombre en tus objetos de producto en el carrito
    precio: parseFloat(item.precioFinal).toFixed(2), // Precio final del producto en el carrito
    cantidad: item.cantidad, // Cantidad del producto en el carrito
    totalDV: (parseFloat(item.precioFinal) * item.cantidad).toFixed(2), // Total del detalle de venta para este producto
    IVA: item.IVA,
    imagen: item.imagen
  }));

  const Venta = {
    cantidad: totalItemsEnCarrito, // Cantidad total de productos
    total: (
      Object.values(cart).reduce(
        (total, item) => total + item.precioFinal * item.cantidad,
        0
      ) + parseFloat(envio)
    ).toFixed(2), // Total a pagar
    totalProductos: Object.values(cart)
      .reduce((total, item) => total + item.precioFinal * item.cantidad, 0)
      .toFixed(2), // Total de productos
    totalEnvio: parseFloat(envio).toFixed(2), // Total del envío
    totalIVA: totalIVA.toFixed(2), // Total del IVA
    sucursalesId: sucursalSeleccionada ? selectedSucursalId : null,
    domicilioId: direccionSeleccionada ? selectedDomicilioId : null,
    productos: productosEnCarrito,
  };

  // Convertir el objeto Venta a una cadena JSON
  const ventaJSON = JSON.stringify(Venta);

  // Guardar la cadena JSON en el localStorage
  localStorage.setItem("Venta", ventaJSON);

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Carrito" />
      <h3 className="title-pag fw-bold text-uppercase">Metodo de entrega</h3>
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
                    <MdHome size={35} color="#9087b1" className="mr-2"/> Enviar a domicilio
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
                                  data-cp={domicilio.CP} // Añadir el CP como un data attribute
                                  onChange={handleSelectDomicilio} // Manejar el evento de selección
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
                    <MdStore size={35} color="#9087b1" className="mr-2"/> Recoger en alguna de nuestras sucursales
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
                                onChange={handleSelectSucursal}
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
                  <hr />

                  <tr>
                    <td>
                      <strong>Envio</strong>
                    </td>
                    <td className="text-right">
                      {mostrarDomicilios ? (
                        envio !== 0 ? (
                          <strong>${envio}</strong>
                        ) : (
                          <strong>$ 0.00</strong>
                        )
                      ) : mostrarSucursales ? (
                        <strong>No aplica</strong>
                      ) : (
                        <span className="text-muted">
                          Elija la forma de entrega
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total a pagar</strong>
                    </td>
                    <td className="text-right">
                      <strong>
                        ${" "}
                        {(
                          Object.values(cart).reduce(
                            (total, item) =>
                              total + item.precioFinal * item.cantidad,
                            0
                          ) + parseFloat(envio)
                        ).toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                </table>

                <div className="cont-buttons text-center mt-4">
                  <button
                    className="btn-primary"
                    onClick={handleProceedToPayment} // Cambiar el enlace por un botón con la función handleProceedToPayment
                    disabled={!direccionSeleccionada && !sucursalSeleccionada} // Deshabilitar el botón si no se ha seleccionado una dirección
                  >
                    Proceder a pago
                  </button>
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