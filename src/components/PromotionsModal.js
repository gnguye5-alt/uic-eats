import React, { useState, useContext } from 'react';
import { PromotionsContext } from './PromotionsContext';
import './PromotionsModal.css';

const PromotionsModal = ({ onClose, onApplyPromo, orderType }) => {
  const { promotions, loading } = useContext(PromotionsContext);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'code'
  const [searchQuery, setSearchQuery] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  
  // Filter promotions based on search query and order type
  const filteredPromotions = promotions.filter(promo => {
    // Basic text search filtering
    const textMatch = promo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     promo.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter out delivery-specific promotions for pickup or group orders
    if ((orderType === 'Pickup' || orderType === 'Group order') && 
        promo.type === 'free_delivery') {
      return false;
    }
    
    return textMatch;
  });

  // Handle selecting a promotion
  const handleSelectPromotion = (promo) => {
    setSelectedPromotion(promo.id === selectedPromotion?.id ? null : promo);
  };

  // Handle applying selected promotion
  const handleConfirmPromotion = () => {
    if (selectedPromotion) {
      onApplyPromo(selectedPromotion.code);
      onClose();
    } else {
      // If no promotion selected, go to manual entry screen
      setViewMode('code');
    }
  };

  // Handle manual entry button
  const handleManualEntry = () => {
    setViewMode('code');
  };

  // Handle promo code submit
  const handlePromoCodeSubmit = () => {
    if (promoCode.trim()) {
      onApplyPromo(promoCode);
    }
    onClose();
  };

  return (
    <div className="promotions-modal-backdrop">
      <div className="promotions-modal">
        {viewMode === 'list' ? (
          // Available offers view
          <>
            <div className="promotions-modal-header">
              <button className="back-button" onClick={onClose}>Back</button>
              <h1 className="promotions-title">Promotions</h1>
            </div>
            
            <div className="promotions-content">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
              
              <div className="manual-entry-container">
                <button className="manual-entry-button" onClick={handleManualEntry}>
                  Enter manually
                </button>
              </div>
              
              <div className="promotions-list">
                {loading ? (
                  <div className="loading-message">Loading promotions...</div>
                ) : filteredPromotions.length > 0 ? (
                  filteredPromotions.map((promo) => (
                    <div 
                      key={promo.id} 
                      className={`promotion-item ${selectedPromotion?.id === promo.id ? 'selected' : ''}`}
                      onClick={() => handleSelectPromotion(promo)}
                    >
                      <div>
                        <div className="promotion-description">{promo.description}</div>
                        <div className="promotion-code">Code: {promo.code}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-promotions-message">
                    {searchQuery ? 'No matching promotions found' : 'No promotions available'}
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button 
                  className="confirm-button" 
                  onClick={handleConfirmPromotion}
                  disabled={!selectedPromotion}
                >
                  Confirm
                </button>
              </div>
            </div>
          </>
        ) : (
          // Entering offer code view
          <>
            <div className="promotions-modal-header">
              <button className="close-button" onClick={() => setViewMode('list')}>×</button>
              <h1 className="promotions-title">Promotions</h1>
            </div>
            
            <div className="promotions-content code-entry">
              <div className="code-input-container">
                <input
                  type="text"
                  className="code-input"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              
              <button className="done-button" onClick={handlePromoCodeSubmit}>
                Done
              </button>
              
              <div className="keyboard-mockup">
                <div className="keyboard-row">
                  {['q','w','e','r','t','y','u','i','o','p'].map(key => (
                    <div 
                      key={key} 
                      className="keyboard-key"
                      onClick={() => setPromoCode(promoCode + key)}
                    >
                      {key}
                    </div>
                  ))}
                </div>
                <div className="keyboard-row">
                  {['a','s','d','f','g','h','j','k','l'].map(key => (
                    <div 
                      key={key} 
                      className="keyboard-key"
                      onClick={() => setPromoCode(promoCode + key)}
                    >
                      {key}
                    </div>
                  ))}
                </div>
                <div className="keyboard-row">
                  <div className="keyboard-key keyboard-special">⇧</div>
                  {['z','x','c','v','b','n','m'].map(key => (
                    <div 
                      key={key} 
                      className="keyboard-key"
                      onClick={() => setPromoCode(promoCode + key)}
                    >
                      {key}
                    </div>
                  ))}
                  <div 
                    className="keyboard-key keyboard-special"
                    onClick={() => setPromoCode(promoCode.slice(0, -1))}
                  >
                    ⌫
                  </div>
                </div>
                <div className="keyboard-row">
                  <div className="keyboard-key keyboard-special">123</div>
                  <div 
                    className="keyboard-key keyboard-space"
                    onClick={() => setPromoCode(promoCode + ' ')}
                  >
                    space
                  </div>
                  <div 
                    className="keyboard-key keyboard-special"
                    onClick={handlePromoCodeSubmit}
                  >
                    return
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PromotionsModal;