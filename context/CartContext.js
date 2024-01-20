"use client";
import React, { createContext, useState } from "react";

const useCartState = (initialCart) => useState(initialCart);

export const CartContext = createContext(null);

export const useCart = () => {
  const cart = React.useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cart;
};

const CartProvider = ({ cart: initialCart, children }) => {
  const [cart, setCart] = useCartState(initialCart);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
