import React from "react";
import { Card } from "primereact/card";

const PurchaseCard = ({ purchase, openModal, openCancelModal }) => {
  return (
    <Card key={purchase.ventaId} className="card mb-3 mt-4">
      <div className="card-body">
        <div className="row">
          <div className="text-center item-responsive">
            {purchase.statusVentaId === 1 && (
              <span className="fw-bold">
                <strong>Estado de la venta: </strong>En proceso
              </span>
            )}
            {purchase.statusVentaId === 2 && (
              <span className="fw-bold">
                <strong>Estado de la venta: </strong>En camino
              </span>
            )}
            {purchase.statusVentaId === 3 && (
              <span className="fw-bold">
                <strong>Estado de la venta: </strong>Entregado
              </span>
            )}
            {purchase.statusVentaId === 4 && (
              <span className="fw-bold">
                <strong>Estado de la venta: </strong>En espera de recolección en
                sucursal
              </span>
            )}
            {purchase.statusVentaId === 5 && (
              <span className="text-danger fw-bold">
                <strong>Estado de la venta: </strong>Cancelada
              </span>
            )}
          </div>
          <div className="col-md-2 item-center">
            <img
              src={
                purchase.detalleVenta && purchase.detalleVenta.length > 0
                  ? purchase.detalleVenta[0].imagen
                  : ""
              }
              className="img-fluid img-purchase"
              alt={
                purchase.detalleVenta && purchase.detalleVenta.length > 0
                  ? purchase.detalleVenta[0].producto
                  : ""
              }
            />
          </div>
          <div className="col-md-7 row ml-1 purchase-products">
            <h4 className="text-info mt-2 item-no-responsive">
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
                Comprado el{" "}
                <strong>{new Date(purchase.fecha).toLocaleDateString()}</strong>
              </span>
            </div>
            <div className="row item-responsive">
              <div className="cont-cant d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-primary my-4"
                  onClick={() => openModal(purchase, purchase.ventaId)}
                >
                  Ver detalle
                </button>
              </div>
              {(purchase.statusVentaId === 1 ||
                purchase.statusVentaId === 4) && (
                <div className="cont-cant d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => openCancelModal(purchase.folio)}
                  >
                    Cancelar compra
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-3 aling-center-cont item-no-responsive">
            <div className="row">
              <div className="text-center">
                {purchase.statusVentaId === 1 && (
                  <span className="fw-bold">
                    <strong>Estado de la venta: </strong>En proceso
                  </span>
                )}
                {purchase.statusVentaId === 2 && (
                  <span className="fw-bold">
                    <strong>Estado de la venta: </strong>En camino
                  </span>
                )}
                {purchase.statusVentaId === 3 && (
                  <span className="fw-bold">
                    <strong>Estado de la venta: </strong>Entregado
                  </span>
                )}
                {purchase.statusVentaId === 4 && (
                  <span className="fw-bold">
                    <strong>Estado de la venta: </strong>En espera de
                    recolección en sucursal
                  </span>
                )}
                {purchase.statusVentaId === 5 && (
                  <span className="text-danger fw-bold">
                    <strong>Estado de la venta: </strong>Cancelada
                  </span>
                )}
              </div>
              <div className="cont-cant d-flex align-items-center justify-content-center">
                <button
                  className="btn-primary my-4"
                  onClick={() => openModal(purchase, purchase.ventaId)}
                >
                  Ver detalle
                </button>
              </div>
              {(purchase.statusVentaId === 1 ||
                purchase.statusVentaId === 4) && (
                <div className="cont-cant d-flex align-items-center justify-content-center">
                  <button
                    className="btn-danger"
                    onClick={() => openCancelModal(purchase.folio)}
                  >
                    Cancelar compra
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PurchaseCard;
