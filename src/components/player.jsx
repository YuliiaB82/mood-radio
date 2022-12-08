import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForwardStep,
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";

export function Player({ track, isPaused, onToggleClick, onNextClick }) {
  return (
    <div className="radio-player p-4 shadow">
      <div className="radio-track row">
        <div className="col-md-4">
          <img src={track.album.images[0].url} className="radio-track-img" />
        </div>
        <div className="col-md-4 pt-4">
          <strong className="song-name">{track.name}</strong>
          <br />
          <small className="album-name">{track.album.name}</small>
        </div>

        <div className="col-md-4 radio-control pt-5">
          <FontAwesomeIcon
            icon={isPaused ? faCirclePlay : faCirclePause}
            onClick={onToggleClick}
            size="8x"
          />
          <FontAwesomeIcon
            icon={faForwardStep}
            onClick={onNextClick}
            size="6x"
          />

          <input type="range" className="form-range" id="customRange1" />
        </div>
      </div>
    </div>
  );
}
