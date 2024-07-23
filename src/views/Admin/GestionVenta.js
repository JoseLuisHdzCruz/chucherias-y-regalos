import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { MdLocalMall } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { toast } from "react-toastify";

const ViewOrders = ({ title }) => {
  const [ventas, setVentas] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const ordersPerPage = 15;

  useEffect(() => {
    fetchVentas();
    fetchStatuses();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get(
        "https://backend-c-r-production.up.railway.app/ventas/"
      );
      // Sort the ventas by date in descending order (most recent first)
      const sortedVentas = response.data.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );
      setVentas(sortedVentas);
    } catch (error) {
      console.error("Error fetching ventas:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get(
        "https://backend-c-r-production.up.railway.app/ventas/status/getAllStatusVenta"
      );
      setStatuses(response.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const fetchDetalleVenta = async (ventaId) => {
    try {
      const response = await axios.get(
        `https://backend-c-r-production.up.railway.app/ventas/detalle/${ventaId}`
      );
      setDetalleVenta(response.data);
    } catch (error) {
      console.error("Error fetching detalle venta:", error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleViewDetails = (venta) => {
    setSelectedVenta(venta);
    fetchDetalleVenta(venta.ventaId);
    setModalOpen(true);
  };

  const handleChangeStatus = async () => {
    try {
      await axios.put(
        `https://backend-c-r-production.up.railway.app/ventas/updateStatusVenta/${selectedVenta.folio}`,
        {
          statusVentaId: newStatus,
        }
      );
      toast.success("Estado de venta actualizado exitosamente!");
      fetchVentas();
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating sale status:", error);
      toast.error("Error al actualizar el estado de venta.");
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ventas.slice(indexOfFirstOrder, indexOfLastOrder);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(ventas.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {title} |<small> Pedidos</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{title}</a>
                </li>
                <li className="breadcrumb-item active">Pedidos</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Pedidos</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Folio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((venta) => (
                      <tr key={venta.ventaId}>
                        <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                        <td>{venta.folio}</td>
                        <td>{venta.cantidad}</td>
                        <td>${venta.total}</td>
                        <td>
                          {statuses.find(
                            (status) =>
                              status.statusVentaId === venta.statusVentaId
                          )?.statusVenta || "Desconocido"}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info icon-align"
                            onClick={() => handleViewDetails(venta)}
                          >
                            Detalle <MdVisibility size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No se encontraron pedidos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <nav>
              <ul
                className="pagination justify-content-center"
                style={{ marginBottom: 80 }}
              >
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`page-item ${
                      currentPage === number ? "active" : ""
                    }`}
                  >
                    <a
                      onClick={handlePageClick}
                      className="page-link"
                      id={number}
                      href="#"
                    >
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {selectedVenta && (
        <Modal show={modalOpen} onHide={() => setModalOpen(false)} size="lg">
          <Modal.Header closeButton className="bg-primary">
            <Modal.Title>Detalle de la compra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-8">
                {selectedVenta.domicilioId &&
                selectedVenta.domicilioId !== null ? (
                  <p className="fs-5">
                    <strong>Metodo de entrega: </strong>Envio a domicilio
                  </p>
                ) : (
                  <p className="fs-5">
                    <strong>Metodo de entrega: </strong>Recoleccion en socursal
                  </p>
                )}

                <p className="fs-5">Total de productos comprados ({selectedVenta.cantidad})</p>
                <p className="text-secondary fw-bold fs-6">
                  Fecha de compra: {selectedVenta.fecha.split("T")[0]}
                </p>
              </div>

              <div className="col-sm-4 text-center">
                <MdLocalMall size={80} color="#c9c9c9" />
              </div>
            </div>
            <div className="col-sm-12 mt-1 mb-4">
              <div className="row">
                  <div className="col-sm-6">
                    <select
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Seleccionar nuevo estado
                      </option>
                      {statuses.map((status) => (
                        <option
                          key={status.statusVentaId}
                          value={status.statusVentaId}
                        >
                          {status.statusVenta}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <Button
                      variant="primary"
                      onClick={handleChangeStatus}
                    >
                      Cambiar
                    </Button>
                  </div>
                
              </div>
            </div>

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
                {detalleVenta.map((detalle) => (
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
              <tfoot>
                <tr>
                  <td colSpan="3"></td>
                  <td className="fw-bold text-danger">Total:</td>
                  <td className="fw-bold text-danger">
                    ${selectedVenta.total}
                  </td>
                </tr>
              </tfoot>
            </table>
            <span className="text-muted">Folio: {selectedVenta.folio}</span>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ViewOrders;
