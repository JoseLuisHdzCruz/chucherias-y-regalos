import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { MdPayments } from "react-icons/md";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const SelectPayment = () => {
  const [venta, setVenta] = useState(null);
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [botonPagar, setBotonPagar] = useState(); // Estado para manejar el texto del botón
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-13eb1554-c4f9-44b9-832b-e455aabb8502", {locale: "es-MX"});

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
      console.log(item)
    }
  }, []); // El segundo argumento de useEffect debe ser un array vacío para que se ejecute solo una vez después del montaje del componente

  // Función para manejar el cambio en la selección del método de pago
  const handleMetodoPagoChange = (event) => {
    if (event.target.value === "1") {
      setBotonPagar(
        <button className="btn btn-primary">
          Terminar compra <MdPayments className="ml-4" size={25} />
        </button>
      );
      console.log(venta);
    } else if (event.target.value === "2") {
      handleBuy()
    }
  };

  const createPreference = async () =>{
    try {
      const items = venta.productos.map(producto => ({
        title: producto.nombre,
        quantity: producto.cantidad,
        price: producto.precio,
        imagen: producto.imagen
      }));
  
      items.push({
        title: "Envío",
        quantity: 1, // Cantidad de envío (puedes ajustarla según tus necesidades)
        price: venta.totalEnvio, // Precio del envío
        imagen: ""
      });

      const customerId = decodedToken.customerId;

      const response = await axios.post("https://backend-c-r-production.up.railway.app/order/create-order",{
        items, customerId, venta, metodoPagoId: 2
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }    
  }

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
                    value="2"
                    className="form-check-input ml-4"
                    onChange={handleMetodoPagoChange} // Manejar cambio de selección
                  />
                </div>
                <div className="col-md-11">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Mercado Pago
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
                    value="1"
                    className="form-check-input ml-4"
                    onChange={handleMetodoPagoChange} // Manejar cambio de selección
                  />
                </div>
                <div className="col-md-11 row ml-1">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Pagar en efectivo en la sucursal elegida
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
                  {botonPagar}
                  {preferenceId && <Wallet
          initialization={{ preferenceId: preferenceId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />}
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
