import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const BackButton = ({className, route}) => {
    const navigate = useNavigate();

    const handleExit = () => {
        navigate(route);
    }
    
    return (
        <div className={className || "back-button"} onClick={handleExit}>
            <FontAwesomeIcon icon={faXmark} size="2x" className="icon"></FontAwesomeIcon>
        </div>
    );
};

export default BackButton;