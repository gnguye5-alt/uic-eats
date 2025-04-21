import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
export const PromotionsContext = createContext();

// Create provider component
export const PromotionsProvider = ({ children }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedPromotion, setAppliedPromotion] = useState(null);

  // Fetch promotions from JSON file
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        console.log('PromotionsContext: Fetching promotions...');
        const response = await fetch('/data/promotions_data.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch promotions: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('PromotionsContext: Loaded promotions:', data);
        setPromotions(data);
        setLoading(false);
      } catch (error) {
        console.error('PromotionsContext: Error fetching promotions:', error);
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Apply promotion by code
  const applyPromotion = (code) => {
    console.log(`PromotionsContext: Applying promotion code: ${code}`);
    
    // Find promotion with matching code
    const promotion = promotions.find(p => p.code === code);
    
    if (!promotion) {
      console.log('PromotionsContext: No matching promotion found');
      return { 
        success: false, 
        message: 'Invalid promotion code' 
      };
    }
    
    console.log('PromotionsContext: Found matching promotion:', promotion);
    setAppliedPromotion(promotion);
    
    return { 
      success: true, 
      promotion 
    };
  };

  // Clear applied promotion
  const clearPromotion = () => {
    console.log('PromotionsContext: Clearing applied promotion');
    setAppliedPromotion(null);
  };

  // Calculate discount based on applied promotion and order subtotal
  const calculateDiscount = (subtotal) => {
    if (!appliedPromotion) {
      return 0;
    }

    console.log(`PromotionsContext: Calculating discount for subtotal: $${subtotal}`);
    console.log('PromotionsContext: Applied promotion:', appliedPromotion);
    
    const subtotalValue = parseFloat(subtotal);
    
    switch (appliedPromotion.type) {
      case 'percent_discount':
        // Calculate percentage discount
        const percentDiscount = (subtotalValue * appliedPromotion.value / 100).toFixed(2);
        console.log(`PromotionsContext: Calculated ${appliedPromotion.value}% discount: $${percentDiscount}`);
        return percentDiscount;
        
      case 'flat_discount':
        // Check minimum order value if applicable
        if (appliedPromotion.minOrderValue && subtotalValue < appliedPromotion.minOrderValue) {
          console.log(`PromotionsContext: Order subtotal ($${subtotalValue}) is less than minimum required ($${appliedPromotion.minOrderValue})`);
          return 0;
        }
        
        console.log(`PromotionsContext: Applied flat discount: $${appliedPromotion.value}`);
        return appliedPromotion.value;
        
      case 'free_delivery':
        // This would be handled separately in the checkout as a line item
        // For now, let's return a fixed delivery fee value
        console.log('PromotionsContext: Applied free delivery discount');
        return 2.99; // Assuming this is your delivery fee
        
      case 'bogo':
        // Buy one get one at X% off (most complex case)
        // For simplicity, we'll assume this is a cart-wide discount
        // In a real app, you'd apply this to specific eligible items
        const bogoDiscount = (subtotalValue * (appliedPromotion.value / 100) / 2).toFixed(2);
        console.log(`PromotionsContext: Calculated BOGO ${appliedPromotion.value}% discount: $${bogoDiscount}`);
        return bogoDiscount;
        
      default:
        console.log('PromotionsContext: Unknown promotion type, no discount applied');
        return 0;
    }
  };

  // Create context value object
  const contextValue = {
    promotions,
    loading,
    appliedPromotion,
    applyPromotion,
    clearPromotion,
    calculateDiscount
  };

  return (
    <PromotionsContext.Provider value={contextValue}>
      {children}
    </PromotionsContext.Provider>
  );
};

// Custom hook for using promotions
export const usePromotions = () => {
  const context = useContext(PromotionsContext);
  
  if (!context) {
    throw new Error('usePromotions must be used within a PromotionsProvider');
  }
  
  return context;
};