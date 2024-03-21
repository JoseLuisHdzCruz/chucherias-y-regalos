import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    // Si el producto ya está en el carrito, actualiza la cantidad
    const existingProduct = cart.find((item) => item.productoId === product.productoId);
  
    if (existingProduct) {
      const updatedCart = [...cart];
      existingProduct.cantidad += quantity;
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, agrégalo como un nuevo elemento
      const newProduct = { ...product, cantidad: quantity };
      setCart([...cart, newProduct]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productoId !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
