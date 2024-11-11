import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

const CancelPurchaseModal = ({
  show,
  onHide,
  folioVenta,
  handleCancelPurchase,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary-c">
        <Modal.Title>Cancelación de compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ reason: "" }}
          onSubmit={(values) => {
            handleCancelPurchase(values.reason);
          }}
        >
          <Form>
            <div className="form-group">
              <span className="text-muted">Folio: {folioVenta}</span>
              <br />
              <label htmlFor="reason">Motivo de la cancelación:</label>
              <Field
                as="textarea"
                id="reason"
                name="reason"
                className="form-control"
                style={{ height: "100px" }}
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Confirmar cancelación
            </button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CancelPurchaseModal;
