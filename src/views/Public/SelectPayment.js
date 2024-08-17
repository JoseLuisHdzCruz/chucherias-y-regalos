import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Public/PageTitle";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { MdCreditCard, MdStorefront } from "react-icons/md";
import { Card } from 'primereact/card';
        

const SelectPayment = () => {
  const [venta, setVenta] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isMercadoPagoButtonCreated, setIsMercadoPagoButtonCreated] = useState(false);

  const handleMetodoPagoChange = (event) => {
    setSelectedPayment(event.target.value);
    if (event.target.value === "mercadoPago" && !isMercadoPagoButtonCreated) {
      handleBuy();
      setIsMercadoPagoButtonCreated(true);
    }
  };

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

  const handlePagarEnSucursalClick = async () => {
    try {
      const customerId = decodedToken.customerId;
      const response = await axios.post(
        "http://localhost:5000/ventas/",
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
        "http://localhost:5000/order/create-order",
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
      const customerId = decodedToken.customerId;

      const items = venta.productos.map((item) => ({
        title: item.producto,
        quantity: item.cantidad,
        price: Math.round(item.precio * 100),
        imagen: item.imagen,
      }));

      let shipping = null;
      if (venta.domicilioId) {
        shipping = {
          price: Math.round(venta.totalEnvio * 100),
        };
      }

      const response = await axios.post(
        "http://localhost:5000/ventas/create-checkout-session",
        {
          items,
          shipping,
          venta,
          customerId,
          metodoPagoId: 4,
        }
      );

      const { id } = response.data;
      const stripe = window.Stripe(
        "pk_test_51Pf8IA2NI1ZNadeOLivsZnTK9wtGno4CEo8viraLEc0NBdl9CFbhubTvVVuo7gpznAfJt6mqR10IhaeVQQNutEQ500WkPoYuht"
      );
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Error al redirigir a Stripe Checkout:", error);
      toast.error("Error al iniciar el pago con Stripe");
    }
  };

  const renderPaymentButton = () => {
    switch (selectedPayment) {
      case "mercadoPago":
        return preferenceId ? (
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        ) : null;
      case "pagarEnSucursal":
        return (
          <button className="btn btn-success" onClick={handlePagarEnSucursalClick}>
            <MdStorefront size={25} className="mr-2" /> Pagar en la sucursal
          </button>
        );
      case "stripe":
        return (
          <button onClick={handleStripeCheckout} className="btn btn-success">
            <MdCreditCard size={25} className="mr-2" /> Pagar con Tarjeta
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <PageTitle title="Chucherías & Regalos | Carrito" />
      <h3 className="title-pag fw-bold text-uppercase">Forma de Pago</h3>
      <hr className="hr-primary" />

      <div className="row">
        <div className="col-lg-8">
          <Card className="card mb-3 mt-4">
            <div className="card-body">
              <h5 className="text-uppercase fw-bold">Seleccione su forma de pago</h5>
              <hr className="hr-primary-cont" />
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="mercadoPago"
                      className="form-check-input"
                      onChange={handleMetodoPagoChange}
                    />
                    <h5 className="card-title ms-2" style={{ fontSize: "20px" }}>
                      <MdCreditCard size={35} color="#9087b1" className="ml-4 mr-2" /> Pagar con Mercado Pago
                    </h5>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="pagarEnSucursal"
                      className="form-check-input"
                      onChange={handleMetodoPagoChange}
                    />
                    <h5 className="card-title ms-2" style={{ fontSize: "20px" }}>
                      <MdStorefront size={35} color="#9087b1" className="ml-4 mr-2" /> Pago en la sucursal elegida
                    </h5>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="stripe"
                      className="form-check-input"
                      onChange={handleMetodoPagoChange}
                    />
                    <h5 className="card-title ms-2" style={{ fontSize: "20px" }}>
                      <MdCreditCard size={35} color="#9087b1" className="ml-4 mr-2" /> Pagar con Tarjeta (Stripe)
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {venta && venta.cantidad > 0 && (
          <div className="col-lg-4">
            <Card className="card mt-4">
              <div className="card-body">
                <h5 className="text-center text-uppercase fw-bold">Información de compra</h5>
                <hr className="hr-primary-cont" />
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td><strong>Productos ({venta.cantidad})</strong></td>
                      <td className="text-right"><strong>${venta.totalProductos}</strong></td>
                    </tr>
                    <tr>
                      <td>Envío</td>
                      <td className="text-right">
                        {venta.domicilioId ? <strong>${venta.totalEnvio}</strong> : <span>No aplica</span>}
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
                  {renderPaymentButton()}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
};

export default SelectPayment;
