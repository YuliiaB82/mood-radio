import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "./return-card.css";

export const ReturnCard = (props) => {
  return (
    <div className="return-card-wrapper">
      <FontAwesomeIcon
        icon={faArrowRotateLeft}
        size="8x"
        className="return-card-icon"
        onClick={props.onClick}
      />
    </div>
  );
};
