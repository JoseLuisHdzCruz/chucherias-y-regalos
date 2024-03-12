import React from "react";
import Modal from "react-modal";
import { MdAdd, MdRemove, MdDelete, MdClose, MdPayment } from "react-icons/md";

const CartModal = ({ isOpen, onClose, cartItems, total, updateCartItem, deleteCartItem }) => {
  const increaseQuantity = (itemId) => {
    updateCartItem(itemId, cartItems.find(item => item.id === itemId).quantity + 1);
  };

  const decreaseQuantity = (itemId) => {
    const currentItem = cartItems.find(item => item.id === itemId);
    if (currentItem.quantity > 1) {
      updateCartItem(itemId, currentItem.quantity - 1);
    }
  };

  const handleDelete = (itemId) => {
    deleteCartItem(itemId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-cart"
      overlayClassName="overlay-cart"
      shouldCloseOnOverlayClick={true}
    >
      <div className="carrito">
        <div className="header-carrito">
          <h2>Tu Carrito</h2>
          <button className="close-button" onClick={onClose}>
            <MdClose size={25} />
          </button>
        </div>

        <div className="carrito-items">
          {cartItems.map((item, index) => (
            <div key={index}>
              <div className="carrito-item">
                <img src={item.imagen} width="80px" alt="" />
                <div className="carrito-item-detalles">
                  <span className="carrito-item-titulo">{item.nombre}</span>
                  <div className="selector-cantidad align-icons">
                    <span className="selector-item" onClick={() => decreaseQuantity(item.id)}>
                      <MdRemove className="restar-cantidad" size={25} />
                    </span>
                    <input
                      type="text"
                      value={item.quantity}
                      className="carrito-item-cantidad"
                      disabled
                    />
                    <span className="selector-item" onClick={() => increaseQuantity(item.id)}>
                      <MdAdd className="sumar-cantidad" size={25} />
                    </span>
                  </div>
                  <span className="carrito-item-precio">
                    ${item.precio * item.quantity}
                  </span>
                </div>
                <button className="btn-eliminar aling-icon" onClick={() => handleDelete(item.id)}>
                  <MdDelete size={25} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="carrito-total">
          <div className="fila">
            <strong>Tu Total</strong>
            <span className="carrito-precio-total">${total}</span>
          </div>
          <button className="btn-pagar">
            Pagar <MdPayment size={25} className="ml-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;



// import React from "react";
// import Modal from "react-modal";
// import { MdAdd, MdRemove, MdDelete, MdClose, MdPayment } from "react-icons/md";
// import { useCart } from "./CartContext";

// const CartModal = ({ isOpen, onClose }) => {
//   const { cartItems, updateCartItem, deleteCartItem } = useCart();

//   const increaseQuantity = (itemId) => {
//     updateCartItem(itemId, cartItems.find(item => item.id === itemId).quantity + 1);
//   };

//   const decreaseQuantity = (itemId) => {
//     const currentItem = cartItems.find(item => item.id === itemId);
//     if (currentItem.quantity > 1) {
//       updateCartItem(itemId, currentItem.quantity - 1);
//     }
//   };

//   const handleDelete = (itemId) => {
//     deleteCartItem(itemId);
//   };

//   // Calcula el total en función de los elementos del carrito
//   const calculateTotal = () => {
//     let total = 0;
//     cartItems.forEach(item => {
//       total += item.precio * item.quantity;
//     });
//     return total;
//   };

//   // Calcula el total
//   const total = calculateTotal();

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="modal-cart"
//       overlayClassName="overlay-cart"
//       shouldCloseOnOverlayClick={true}
//     >
//       <div className="carrito">
//         <div className="header-carrito">
//           <h2>Tu Carrito</h2>
//           <button className="close-button" onClick={onClose}>
//             <MdClose size={25} />
//           </button>
//         </div>

//         <div className="carrito-items">
//           {cartItems.map((item, index) => (
//             <div key={index}>
//               <div className="carrito-item">
//                 {/* Contenido del item del carrito */}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="carrito-total">
//           <div className="fila">
//             <strong>Tu Total</strong>
//             <span className="carrito-precio-total">${total}</span>
//           </div>
//           <button className="btn-pagar">
//             Pagar <MdPayment size={25} className="ml-4" />
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CartModal;
