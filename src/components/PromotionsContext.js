import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const PromotionsContext = createContext();

// Create a custom hook for using the promotions context
export const usePromotions = () => useContext(PromotionsContext);

export const PromotionsProvider = ({ children }) => {
  // Initialize state for promotions
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load promotions data from public folder
  useEffect(() => {
    fetch('/data/promotions-data.json')
      .then(response => response.json())
      .then(data => {
        setPromotions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading promotions data:', error);
        setLoading(false);
      });
  }, []);

  // State for currently applied promotion
  const [appliedPromotion, setAppliedPromotion] = useState(null);
  
  // Function to apply a promotion code
  const applyPromotion = (code) => {
    const promo = promotions.find(p => 
      p.code === code && p.active
    );
    
    if (promo) {
      // Check for any time or day restrictions
      if (promo.daysOfWeek) {
        const today = new Date().getDay();
        if (!promo.daysOfWeek.includes(today)) {
          return { 
            success: false, 
            message: 'This promotion is only valid on specific days' 
          };
        }
      }
      
      if (promo.timeRestriction) {
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`;
        if (currentTime < promo.timeRestriction.start || currentTime > promo.timeRestriction.end) {
          return { 
            success: false, 
            message: `This promotion is only valid between ${promo.timeRestriction.start} and ${promo.timeRestriction.end}` 
          };
        }
      }
      
      setAppliedPromotion(promo);
      return { success: true, promotion: promo };
    }
    
    return { success: false, message: 'Invalid or expired promotion code' };
  };
  
  // Function to clear applied promotion
  const clearPromotion = () => {
    setAppliedPromotion(null);
  };
  
  // Calculate discount amount based on total and applied promotion
  const calculateDiscount = (total) => {
    if (!appliedPromotion) return 0;
    
    // Check minimum amount requirement
    if (parseFloat(total) < appliedPromotion.minAmount) {
      return 0;
    }
    
    // Handle special types
    if (appliedPromotion.type === 'free_delivery') {
      return 2.99; // Delivery fee amount
    }
    
    if (appliedPromotion.type === 'fixed_amount') {
      return appliedPromotion.discount; // Fixed amount discount
    }
    
    // Regular percentage discount
    return (parseFloat(total) * appliedPromotion.discount).toFixed(2);
  };
  
  // Context value
  const value = {
    promotions,
    loading,
    appliedPromotion,
    applyPromotion,
    clearPromotion,
    calculateDiscount
  };
  
  return (
    <PromotionsContext.Provider value={value}>
      {children}
    </PromotionsContext.Provider>
  );
};