import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"; // Importa el Modal de React Bootstrap
import { MdFilterAlt, MdRemove } from "react-icons/md";
import PageTitle from "../../components/PageTitle";
import axios from "axios";

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [venta, setVenta] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const customerId = 1; // Obtener customerId de donde sea necesario
        const response = await axios.get(
          `https://backend-c-r-production.up.railway.app/ventas/cliente/${customerId}`
        );
        const historyData = response.data;

        // Obtener los detalles de cada compra
        const purchaseDetailsPromises = historyData.map(async (purchase) => {
          const detailResponse = await axios.get(
            `https://backend-c-r-production.up.railway.app/ventas/detalle/${purchase.ventaId}`
          );
          return {
            ...purchase,
            detalleVenta: detailResponse.data,
          };
        });

        // Esperar a que todas las promesas se resuelvan
        const purchaseDetails = await Promise.all(purchaseDetailsPromises);

        setPurchaseHistory(purchaseDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  const openModal = async (purchase, ventaId) => {
    try {
      const response = await axios.get(
        `https://backend-c-r-production.up.railway.app/ventas/${ventaId}`
      );
      setSelectedPurchase(purchase);
      setVenta(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    }
  };

  const closeModal = () => {
    setSelectedPurchase(null);
    setVenta(null);
  };
  

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Historial de compra" />

      <h3 className="title-pag fw-bold text-uppercase">Historial de compras</h3>
      <hr className="hr-primary" />

      <div className="cont-filter mt-4">
        <div className="filters">
          <h5>Filtrar por fecha:</h5>
          <input type="date" />
          <h5>
            <MdRemove size={25} />
          </h5>
          <input type="date" />
          <button className="btn-filter">
            <MdFilterAlt size={25} />
          </button>
        </div>
      </div>

      <div className="detail-product">
        <div className="colum-detail-history">
          {loading ? (
            <p>Cargando historial de compras...</p>
          ) : (
            purchaseHistory.map((purchase) => (
              <div key={purchase.ventaId} className="card mb-3 mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src={
                          purchase.detalleVenta &&
                          purchase.detalleVenta.length > 0
                            ? purchase.detalleVenta[0].imagen
                            : ""
                        }
                        className="img-fluid"
                        alt={
                          purchase.detalleVenta &&
                          purchase.detalleVenta.length > 0
                            ? purchase.detalleVenta[0].producto
                            : ""
                        }
                        style={{ borderRadius: "100px" }}
                      />
                    </div>
                    <div className="col-md-7 row ml-1">
                      <h4 className="text-primary mt-2">
                        <strong>Productos: </strong>
                        {purchase.detalleVenta
                          .map((detalle) => detalle.producto)
                          .join(", ")}
                      </h4>
                      <span>
                        <strong>Folio: </strong>
                        {purchase.folio}
                      </span>
                      <span>Cantidad de productos: {purchase.cantidad}</span>
                      <span>Total: ${purchase.total}</span>
                      <div className="cont-options">
                        <span className="text-muted">
                          Comprado el <strong>{purchase.fecha}</strong>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-3 aling-center-cont">
                      <div className="cont-cant d-flex align-items-center justify-content-center">
                        <button
                          className="btn-primary my-4"
                          onClick={() => openModal(purchase, purchase.ventaId)}
                        >
                          Ver detalle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            ))
          )}
        </div>
      </div>

      {selectedPurchase && venta && (
        <Modal show={modalOpen} onHide={() => setModalOpen(false)} size="lg">
          <Modal.Header closeButton className="bg-primary-c">
            <Modal.Title>Detalle de la compra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Total de productos comprados ({venta.cantidad})</p>
            <p className="text-secondary fw-bold">Fecha de compra: {venta.fecha.split('T')[0]}</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedPurchase.detalleVenta.map((detalle) => (
                  <tr key={detalle.detalleVentaId}>
                    <td>
                      <img
                        src={detalle.imagen}
                        alt={detalle.producto}
                        style={{ borderRadius: "100px", height: "80px" }}
                      />
                    </td>
                    <td>{detalle.producto}</td>
                    <td>${detalle.precio}</td>
                    <td className="text-center">{detalle.cantidad}</td>
                    <td>${detalle.totalDV}</td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-bold text-danger">Total:</td>
                  <td className="fw-bold text-danger">$ {venta.total}</td>
                </tr>
              </tbody>
            </table>
            <span className="text-muted">Folio: {venta.folio}</span>
          </Modal.Body>
        </Modal>
      )}
    </main>
  );
};

export default PurchaseHistory;
