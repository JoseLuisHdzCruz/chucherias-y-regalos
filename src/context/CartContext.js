import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, quantity) => {
    try {
      const existingProduct = cart.find((item) => item.productoId === product.productoId);
  
      if (existingProduct) {
        const updatedCart = [...cart];
        existingProduct.cantidad += quantity;
        setCart(updatedCart);
        await updateCartItem(product.productoId, decodedToken.customerId, updatedCart);
      } else {
        // Si el producto no está en el carrito, agrégalo como un nuevo elemento
        const newProduct = { ...product, cantidad: quantity };
        setCart([...cart, newProduct]);
  
          const newCartItem = {
            productoId: product.productoId,
            producto: product.nombre,
            precio: product.precioFinal,
            IVA: product.IVA,
            cantidad: quantity,
            imagen: product.imagen,
            customerId: decodedToken.customerId
          };
          await axios.post("https://backend-c-r-production.up.railway.app/cart/", newCartItem);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const updateCartItem = async (productoId, customerId, item) => {
    try {
      await axios.put(`https://backend-c-r-production.up.railway.app/cart/${customerId}/${productoId}`, {cantidad: item[0].cantidad});
    } catch (error) {
      console.error("Error actualizando artículo en el carrito:", error);
    }
  };
  

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter((item) => item.productoId !== productId);
      setCart(updatedCart);
  
      const cartDelete = {
        productoId: productId,
        customerId: decodedToken.customerId
      };
      await axios.delete("https://backend-c-r-production.up.railway.app/cart/", { data: cartDelete });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`https://backend-c-r-production.up.railway.app/cart/clear/${decodedToken.customerId}`);

      setCart([]);
      
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;