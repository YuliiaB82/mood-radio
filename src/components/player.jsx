import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForwardStep,
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import "./main-screen.css";

export function Player({
  track,
  isPaused,
  volume,
  onToggleClick,
  onNextClick,
  onVolumeChange,
}) {
  return (
    <div className="radio-player p-4 shadow">
      <div className="radio-track row">
        <div className="col-md-3">
          <img src={track.album.images[0].url} className="radio-track-img" />
        </div>
        <div className="col-md-5 pt-4">
          <strong className="song-name">{track.name}</strong>
          <br />
          <small className="album-name">{track.album.name}</small>
        </div>

        <div className="col-md-4 radio-control pt-5">
          <FontAwesomeIcon
            icon={isPaused ? faCirclePlay : faCirclePause}
            onClick={onToggleClick}
            size="8x"
            className="play-icon"
          />
          <FontAwesomeIcon
            icon={faForwardStep}
            onClick={onNextClick}
            size="4x"
            className="next-icon"
          />

          <input
            type="range"
            className="form-range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={onVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
