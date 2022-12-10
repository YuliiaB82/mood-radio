import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";
import "./photo-card.css";
export function PhotoCard(props) {
  return (
    <div className="photo-card-wrapper">
      <div className="photo-card" onClick={() => props.onClick(props.id)}>
        <div
          className="photo-card-photo"
          style={{
            backgroundColor: props.color,
            backgroundImage: `url("${props.image}")`,
          }}
        >
          {props.image ? (
            <FontAwesomeIcon
              icon={props.isActive ? faCirclePause : faCirclePlay}
              size="3x"
              className="photo-card-status-icon"
            />
          ) : (
            <></>
          )}
          <div
            style={{
              backgroundColor: props.color,
            }}
            className="photo-card-color"
          ></div>
        </div>
        <div className="photo-card-description">{props.title}</div>
      </div>
    </div>
  );
}
