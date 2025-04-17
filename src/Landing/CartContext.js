import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
