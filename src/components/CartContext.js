import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null); // 🔥 Track current restaurant
  const [currentRestaurantName, setCurrentRestaurantName] = useState('');
  
  // Load from localStorage on first load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedRestaurantId = localStorage.getItem('restaurantId');
      const savedRestaurantName = localStorage.getItem('restaurantName');
      
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedRestaurantId) setCurrentRestaurantId(parseInt(savedRestaurantId));
      if (savedRestaurantName) setCurrentRestaurantName(savedRestaurantName);
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
  }, []);
  
  // Save to localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cart]);
  
  // Save current restaurant ID and name
  useEffect(() => {
    try {
      if (currentRestaurantId !== null) {
        localStorage.setItem('restaurantId', currentRestaurantId.toString());
      }
      if (currentRestaurantName) {
        localStorage.setItem('restaurantName', currentRestaurantName);
      }
    } catch (e) {
      console.error('Error saving restaurant info to localStorage:', e);
    }
  }, [currentRestaurantId, currentRestaurantName]);
  
  // Add item to cart
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
  
  // Remove item from cart - needed for CartPage.js
  const removeItem = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Update item quantity - needed for CartPage.js
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  // Calculate cart totals - needed for CartPage.js
  const getCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    const tax = (parseFloat(subtotal) * 0.0625).toFixed(2); // 6.25% tax rate
    const deliveryFee = 2.99;
    const serviceFee = (parseFloat(subtotal) * 0.05).toFixed(2); // 5% service fee
    const total = (parseFloat(subtotal) + parseFloat(tax) + deliveryFee + parseFloat(serviceFee)).toFixed(2);
    
    return {
      subtotal,
      tax,
      deliveryFee,
      serviceFee,
      total
    };
  };
  
  // Set restaurant data
  const setRestaurant = (id, name) => {
    setCurrentRestaurantId(id);
    setCurrentRestaurantName(name);
  };
  
  // Clear cart
  const clearCart = () => setCart([]);
  
  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateItemQuantity,
      getCartTotals,
      clearCart,
      currentRestaurantId,
      setCurrentRestaurantId,
      currentRestaurantName,
      setCurrentRestaurantName,
      setRestaurant
    }}>
      {children}
    </CartContext.Provider>
  );
};