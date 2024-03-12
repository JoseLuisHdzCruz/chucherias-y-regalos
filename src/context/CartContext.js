import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const updateCartItem = (itemId, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return {...item, quantity};
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const deleteCartItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCartItem, deleteCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
