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
  const [checkoutSessionId, setCheckoutSessionId] = useState(null);

  useEffect(() => {
    initMercadoPago("TEST-13eb1554-c4f9-44b9-832b-e455aabb8502", {
      locale: "es-MX",
    });
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  useEffect(() => {
    const ventaJSON = localStorage.getItem("Venta");
    if (ventaJSON) {
      const item = JSON.parse(ventaJSON);
      setVenta(item);
    }
  }, []);
  console.log(venta)

  
  const handleMetodoPagoChange = (event) => {
    setSelectedPayment(event.target.value);
    if (event.target.value === "mercadoPago") {
      handleBuy();
    }
  };

  const handlePagarEnSucursalClick = async () => {
    try {
      const customerId = decodedToken.customerId;
      const response = await axios.post(
        "https://backend-c-r-production.up.railway.app/ventas/",
        {
          metodoPagoId: 1,
          customerId,
          venta,
        }
      );

      toast.success("Compra exitosa, acuda a la sucursal que eligió para la entrega y pago de su producto");
      setTimeout(() => {
        window.location.href = "/purchase-history";
      }, 3000);

      console.log("Venta creada:", response.data);
    } catch (error) {
      toast.error("Error al crear la venta");
      console.error("Error al crear la venta:", error);
    }
  };

  const renderPaymentButton = () => {
    if (selectedPayment === "mercadoPago") {
      return (
        preferenceId && (
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )
      );
    } else if (selectedPayment === "pagarEnSucursal") {
      return (
        <button className="btn-primary" onClick={handlePagarEnSucursalClick}>
          Pagar en la sucursal
        </button>
      );
    } else {
      return null;
    }
  };

  const createPreference = async () => {
    try {
      const items = venta.productos.map((item) => ({
        title: item.producto,
        quantity: item.cantidad,
        price: item.precio,
        imagen: item.imagen,
      }));

      items.push({
        title: "Envío",
        quantity: 1,
        price: venta.totalEnvio,
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
      toast.error("Error al crear la preferencia de Mercado Pago");
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const handleStripeCheckout = async () => {
    try {
      const items = venta.productos.map((item) => ({
        title: item.producto,
        quantity: item.cantidad,
        price: Math.round(item.precio * 100),
        imagen: item.imagen,
      }));

      console.log(items)
  
      let shipping = null;
      if (venta.domicilioId) {
        shipping = {
          price: Math.round(venta.totalEnvio * 100),
        };
      }
  
      const response = await axios.post('https://backend-c-r-production.up.railway.app/ventas/create-checkout-session', {
        items,
        shipping,
        venta
      });
  
      const { id } = response.data;
      const stripe = window.Stripe('pk_test_51Pf8IA2NI1ZNadeOLivsZnTK9wtGno4CEo8viraLEc0NBdl9CFbhubTvVVuo7gpznAfJt6mqR10IhaeVQQNutEQ500WkPoYuht');
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error al redirigir a Stripe Checkout:', error);
      toast.error('Error al iniciar el pago con Stripe');
    }
  };

  return (
    <main>
      <PageTitle title="Chucherías & Regalos | Carrito" />
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
                    onChange={handleMetodoPagoChange}
                  />
                </div>
                <div className="col-md-11">
                  <h5 className="card-title fw-bold" style={{ fontSize: "20px" }}>
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
                    onChange={handleMetodoPagoChange}
                  />
                </div>
                <div className="col-md-11 row ml-1">
                  <h5 className="card-title fw-bold" style={{ fontSize: "20px" }}>
                    Pago en efectivo en la sucursal elegida
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3 mt-4" style={{ backgroundColor: "white", borderColor: "white" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 row ml-1">
                  <button onClick={handleStripeCheckout} className="btn btn-primary">
                    Pagar con Tarjeta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {venta && venta.cantidad > 0 && (
          <div className="colum-add">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="text-center">Información de compra</h5>
                <hr className="hr-primary-cont" />
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Productos ({venta.cantidad})</strong></td>
                      <td className="text-right"><strong>${venta.totalProductos}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Envío</strong></td>
                      <td className="text-right">
                        {venta.domicilioId ? <strong>${venta.totalEnvio}</strong> : <strong>No aplica</strong>}
                      </td>
                    </tr>
                    <hr />
                    <tr>
                      <td><strong>Total a pagar</strong></td>
                      <td className="text-right"><strong>${venta.total}</strong></td>
                    </tr>
                  </tbody>
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
