import React, {  useState } from "react";

const orderNum = Math.floor(100_000_000 + Math.random() * 900_000_000).toString();

const OrderDetails = ({ deliveryType, selectedType }) => {
    //allows order details section to be extended or minimized
    const [sheetHeight, setSheetHeight] = useState(250); // Initial height

    const handleDrag = (e) => {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight >= 100 && newHeight <= window.innerHeight * 0.5) {
            setSheetHeight(newHeight);
        }
    };

    const startDrag = (e) => {
        e.preventDefault();
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', handleDrag);
        }, { once: true });
    };

    const startTouchDrag = (e) => {
        e.preventDefault();
        const move = (ev) => handleDrag(ev.touches[0]);
        window.addEventListener('touchmove', move);
        window.addEventListener('touchend', () => {
            window.removeEventListener('touchmove', move);
        }, { once: true });
    };

    return(
        <div className="order-details" style={{ height: `${sheetHeight}px` }}>
            <div 
                className="drag-handle" 
                onMouseDown={startDrag}
                onTouchStart={startTouchDrag}
            ></div>
            <div className="order-details-header">
                <h2>Order Details</h2>
                <h3>{selectedType.name}</h3>
            </div>
            <p className="order-num">
                Order No. 
                <br/> 
                {orderNum}
            </p>
            <p className="address">
                {deliveryType === 'pickup' ? 'Pickup: ': 'Deliver To: '}
                <br/>
                {selectedType.address}
            </p>
        </div>
    )
};

export default OrderDetails;