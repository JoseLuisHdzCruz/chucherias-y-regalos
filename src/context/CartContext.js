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
      fetchCartFromAPI(decoded.customerId);
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken && decodedToken.customerId) {
      fetchCartFromAPI(decodedToken.customerId);
    }
  }, [decodedToken]);


  const fetchCartFromAPI = async (customerId) => {
    try {
      const response = await axios.get(`https://backend-c-r-production.up.railway.app/cart/${customerId}`);
      const cartData = response.data.map((item) => ({
        productoId: item.productoId,
        nombre: item.producto,
        precioFinal: item.precio,
        IVA: item.IVA,
        cantidad: item.cantidad,
        imagen: item.imagen,
      }));
      if (cartData.length > 0) {
        setCart(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      } else {
        setCart([]);
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Error fetching cart from API:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, quantity) => {
    try {
      const existingProduct = cart.find((item) => item.productoId === product.productoId);

      if (existingProduct) {
        const updatedCart = cart.map((item) =>
          item.productoId === product.productoId ? { ...item, cantidad: item.cantidad + quantity } : item
        );
        setCart(updatedCart);
        await updateCartItem(product.productoId, decodedToken.customerId, existingProduct.cantidad + quantity);
      } else {
        const newProduct = { ...product, cantidad: quantity };
        const newCart = [...cart, newProduct];
        setCart(newCart);
        await addCartItem(newProduct);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const addCartItem = async (newProduct) => {
    try {
      const newCartItem = {
        productoId: newProduct.productoId,
        producto: newProduct.nombre,
        precio: newProduct.precioFinal,
        IVA: newProduct.IVA,
        cantidad: newProduct.cantidad,
        imagen: newProduct.imagen,
        customerId: decodedToken.customerId,
      };
      await axios.post("https://backend-c-r-production.up.railway.app/cart/", newCartItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const updateCartItem = async (productId, customerId, quantity) => {
    try {
      await axios.put(`https://backend-c-r-production.up.railway.app/cart/${customerId}/${productId}`, {
        cantidad: quantity,
      });
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter((item) => item.productoId !== productId);
      setCart(updatedCart);
      await deleteCartItem(productId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      const cartDelete = {
        productoId: productId,
        customerId: decodedToken.customerId,
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
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
