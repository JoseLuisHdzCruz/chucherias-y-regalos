import React from "react";
import { Modal } from "react-bootstrap";
import { MdLocalMall } from "react-icons/md";

const PurchaseDetailModal = ({ show, onHide, venta, selectedPurchase }) => {
  if (!venta || !selectedPurchase) {
    return null; // Si venta o selectedPurchase son null, no renderiza nada
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="bg-primary-c">
        <Modal.Title>Detalle de la compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-8">
            {venta.domicilioId && venta.domicilioId !== null ? (
              <p>
                <strong>Metodo de entrega: </strong>Envio a domicilio
              </p>
            ) : (
              <p>
                <strong>Metodo de entrega: </strong>Recoleccion en sucursal
              </p>
            )}

            <p>Total de productos comprados ({venta.cantidad})</p>
            <p className="text-secondary fw-bold">
              Fecha de compra: {venta.fecha.split("T")[0]}
            </p>
          </div>
          <div className="col-sm-4 item-center item-no-responsive">
            <MdLocalMall size={80} color="#c9c9c9" />
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
  );
};

export default PurchaseDetailModal;
