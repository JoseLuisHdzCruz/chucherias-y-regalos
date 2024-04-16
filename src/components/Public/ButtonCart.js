import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

function ButtonCart() {
    const { cart } = useContext(CartContext);
    const totalItemsEnCarrito = cart.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  
  return (
    <>
          <Link to="/checkup">
            <MdShoppingCart size={40} />
            {totalItemsEnCarrito > 0 && (
              <span className="text-center" style={{ position: 'absolute', top: '75px', right: '170px', backgroundColor: 'red', color: 'white', borderRadius: '100%', padding: '5px', fontSize: '14px', width: '20px', height: '20px' }}>
                {totalItemsEnCarrito}
              </span>
            )}
          </Link>
    </>
  );
}

export default ButtonCart;
