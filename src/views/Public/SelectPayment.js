import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Public/PageTitle";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const SelectPayment = () => {
  const [venta, setVenta] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-13eb1554-c4f9-44b9-832b-e455aabb8502", {
    locale: "es-MX",
  });

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  useEffect(() => {
    // Obtener el objeto Venta del localStorage
    const ventaJSON = localStorage.getItem("Venta");
    if (ventaJSON) {
      // Convertir la cadena JSON de Venta de nuevo a un objeto JavaScript
      const item = JSON.parse(ventaJSON);
      setVenta(item);
      console.log(item);
    }
  }, []); // El segundo argumento de useEffect debe ser un array vacío para que se ejecute solo una vez después del montaje del componente

  // Función para manejar el cambio en la selección del método de pago
  const handleMetodoPagoChange = (event) => {
    setSelectedPayment(event.target.value); // Actualiza el estado con el método de pago seleccionado

    if (event.target.value === "mercadoPago") {
      handleBuy();
    }
  };

  // Función para manejar el clic en el botón "Pagar en la sucursal"
  const handlePagarEnSucursalClick = async () => {
    try {
      const customerId = decodedToken.customerId;
      // Aquí puedes incluir la lógica para crear la venta
      const response = await axios.post(
        "https://backend-c-r-production.up.railway.app/ventas/",
        {
          metodoPagoId: 1,
          customerId, // Aquí debes proporcionar el ID del cliente
          venta// Aquí debes proporcionar los detalles de la venta
        }
      );

      toast.success(
        "Compra exitosa, acuda a la sucursal que eligio para la entrega y pago de su producto"
      );
      setTimeout(() => {
        window.location.href ="/purchase-history";
      }, 3000);

      // Aquí puedes manejar la respuesta de la creación de la venta, si es necesario

      console.log("Venta creada:", response.data);
    } catch (error) {
      toast.error(
        "Error al crear la venta"
      );
      console.error("Error al crear la venta:", error);
      // Aquí puedes manejar el error de la creación de la venta, si es necesario
    }
  };

  // Renderiza el botón correspondiente al método de pago seleccionado
  const renderPaymentButton = () => {
    if (selectedPayment === "mercadoPago") {
      return (
        preferenceId && (
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )
      );
    } else if (selectedPayment === "pagarEnSucursal") {
      return <button className="btn-primary" onClick={handlePagarEnSucursalClick}>Pagar en la sucursal</button>;
    } else {
      return null; // No muestra ningún botón si no se ha seleccionado un método de pago
    }
  };

  const createPreference = async () => {
    try {
      const items = venta.productos.map((producto) => ({
        title: producto.nombre,
        quantity: producto.cantidad,
        price: producto.precio,
        imagen: producto.imagen,
      }));

      items.push({
        title: "Envío",
        quantity: 1, // Cantidad de envío (puedes ajustarla según tus necesidades)
        price: venta.totalEnvio, // Precio del envío
        imagen: "",
      });

      const customerId = decodedToken.customerId;

      const response = await axios.post(
        "https://backend-c-r-production.up.railway.app/order/create-order",
        {
          items,
          customerId,
          venta,
          metodoPagoId: 3,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Carrito" />
      <h3 className="title-pag fw-bold text-uppercase">Forma de Pago</h3>
      <hr className="hr-primary" />
      <div className="ml-4 mr-4">
        <div className="d-flex mr-4 ml-4">
          <h3>Elija su forma de pago</h3>
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
                    name="metodoPago"
                    value="mercadoPago"
                    className="form-check-input ml-4"
                    onChange={handleMetodoPagoChange} // Manejar cambio de selección
                  />
                </div>
                <div className="col-md-11">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Pagar con Mercado Pago
                  </h5>
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
                    name="metodoPago"
                    value="pagarEnSucursal"
                    className="form-check-input ml-4"
                    onChange={handleMetodoPagoChange} // Manejar cambio de selección
                  />
                </div>
                <div className="col-md-11 row ml-1">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Pago en efectivo en la sucursal elegida
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {venta && venta.cantidad > 0 && (
          <div className="colum-add">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="text-center">Informacion de compra</h5>
                <hr className="hr-primary-cont" />
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Productos ({venta.cantidad})</strong>
                      </td>
                      <td className="text-right">
                        <strong>${venta.totalProductos}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Envio</strong>
                      </td>
                      <td className="text-right">
                        {venta.domicilioId ? (
                          <strong>${venta.totalEnvio}</strong>
                        ) : (
                          <strong>No aplica</strong>
                        )}
                      </td>
                    </tr>
                  </tbody>

                  <hr />

                  <tr>
                    <td>
                      <strong>Total a pagar</strong>
                    </td>
                    <td className="text-right">
                      <strong>${venta.total}</strong>
                    </td>
                  </tr>
                </table>
                <div className="cont-buttons text-center mt-4">
                  <div>{renderPaymentButton()}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SelectPayment;
