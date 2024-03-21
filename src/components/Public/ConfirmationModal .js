import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <hr className="hr-primary" />
      <Modal.Body>
        <div className="row">
          <div className="col-md-5">
            <img
              src="/images/PreguntaConfirmacion.png"
              alt="Chucherias & Regalos"
              className="img-fluid rounded-start mt-4"
            />
          </div>
          <div className="col-md-7">
            <h3 className=" text-center fw-bold text-uppercase">
              Vaciar carrito
            </h3>

            <div className="text-login">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between ml-4 mr-4">
        <Button className="btn-primary" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
