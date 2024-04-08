import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Modal } from "react-bootstrap"; // Importa el Modal de React Bootstrap
import { MdFilterAlt, MdRemove, MdFilterAltOff } from "react-icons/md";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const PurchaseHistory = () => {
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [venta, setVenta] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    fechaInicial: "",
    fechaFinal: "",
  });

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get(
          `https://backend-c-r-production.up.railway.app/ventas/cliente/${decodedToken.customerId}`
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
        setDataHistory(purchaseDetails);
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

  // Función para limpiar los filtros y restaurar los datos originales
  const handleClearFilter = () => {
    setPurchaseHistory(dataHistory);
    setFilterValues({
      fechaInicial: "",
      fechaFinal: "",
    });
    toast.success("Se limpio el filtro de busqueda.");
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Historial de compra" />

      <h3 className="title-pag fw-bold text-uppercase">Historial de compras</h3>
      <hr className="hr-primary" />

      <div className="cont-filter mt-4">
        <Formik
          initialValues={filterValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post(
                "https://backend-c-r-production.up.railway.app/ventas/filtroVentas",
                {
                  fechaInicial: values.fechaInicial,
                  fechaFinal: values.fechaFinal,
                }
              );

              const filterHistory = response.data;

              // Obtener los detalles de cada compra
              const purchaseDetailsPromises = filterHistory.map(
                async (purchase) => {
                  const detailResponse = await axios.get(
                    `https://backend-c-r-production.up.railway.app/ventas/detalle/${purchase.ventaId}`
                  );
                  return {
                    ...purchase,
                    detalleVenta: detailResponse.data,
                  };
                }
              );

              // Esperar a que todas las promesas se resuelvan
              const purchaseDetails = await Promise.all(
                purchaseDetailsPromises
              );

              setPurchaseHistory(purchaseDetails);
              toast.success("Se aplico el filtro de historial de compra.");
            } catch (error) {
              console.error("Error fetching filtered purchase history:", error);
            }
            setSubmitting(false);
          }}
          // Dentro del bloque validate de Formik
          validate={(values) => {
            const errors = {};

            const currentDate = new Date();
            const minDate = new Date("2000-01-01");

            if (values.fechaInicial < minDate) {
              errors.fechaInicial =
                "La fecha inicial no puede ser menor a 2000";
              toast.error("La fecha inicial no puede ser menor a 2000");
            }

            if (values.fechaFinal > currentDate.toISOString().split("T")[0]) {
              errors.fechaFinal =
                "La fecha final no puede ser mayor a la fecha actual";
              toast.error(
                "La fecha final no puede ser mayor a la fecha actual"
              );
            }

            if (values.fechaFinal < values.fechaInicial) {
              errors.fechaFinal =
                "La fecha final no puede ser menor a la fecha inicial";
              toast.error(
                "La fecha final no puede ser menor a la fecha inicial"
              );
            }

            return errors;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="filters mr-4">
                <h5>Filtrar por fecha:</h5>
                <Field type="date" name="fechaInicial" />
                <h5>
                  <MdRemove size={25} />
                </h5>
                <Field type="date" name="fechaFinal" />
                <button
                  type="submit"
                  className="btn-filter btn-info"
                  disabled={isSubmitting}
                >
                  <MdFilterAlt size={25} />
                </button>
                <button
                  type="button"
                  className="btn-filter btn-danger"
                  onClick={handleClearFilter}
                >
                  <MdFilterAltOff size={25} />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="detail-product">
        <div className="colum-detail-history">
          {purchaseHistory && purchaseHistory.length > 0 ? (
            loading ? (
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
                            onClick={() =>
                              openModal(purchase, purchase.ventaId)
                            }
                          >
                            Ver detalle
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="d-flex ml-4 text-center">
              <h2 className="text-center">No hay compras aun</h2>
            </div>
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
            <p className="text-secondary fw-bold">
              Fecha de compra: {venta.fecha.split("T")[0]}
            </p>
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
