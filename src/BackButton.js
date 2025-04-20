/**
 * This component makes a back button icon (x mark) to used to navigate to a
 * specific route.
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const BackButton = ({className, route}) => {
    const navigate = useNavigate();

    const handleExit = () => {
        // Clear stored delivery info -- DELETEME
        localStorage.removeItem('selectedLocation');
        localStorage.removeItem('deliveryType');
        navigate(route);
    }
    
    return (
        <div className={className || "btn-back"} onClick={handleExit}>
            <FontAwesomeIcon icon={faXmark} size="2x" className="icon"></FontAwesomeIcon>
        </div>
    );
};

export default BackButton;