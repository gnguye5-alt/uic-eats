import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null); // Track current restaurant

  // Load from localStorage on first load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestaurantId = localStorage.getItem('restaurantId');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedRestaurantId) setCurrentRestaurantId(parseInt(savedRestaurantId));
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save current restaurant ID
  useEffect(() => {
    if (currentRestaurantId !== null) {
      localStorage.setItem('restaurantId', currentRestaurantId.toString());
    }
  }, [currentRestaurantId]);

  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  // Calculate cart totals
  const getCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.0625; // 6.25% tax rate
    const deliveryFee = 2.99; // Fixed delivery fee
    const serviceFee = subtotal * 0.05; // 5% service fee
    const total = subtotal + tax + deliveryFee + serviceFee;

    return {
      subtotal,
      tax,
      deliveryFee,
      serviceFee,
      total
    };
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      clearCart,
      currentRestaurantId,
      setCurrentRestaurantId,
      getCartTotals
    }}>
      {children}
    </CartContext.Provider>
  );
};
