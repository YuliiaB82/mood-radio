import React from "react";

export function Player(props) {
  function Play(event) {
    event.preventDefault();
    alert("Play music coming soon..");
  }
  function Skip(event) {
    event.preventDefault();
    alert("Play skip coming soon..");
  }
  return (
    <div className="radio-player p-4 shadow">
      <div className="radio-track row">
        <div className="col-md-4">
          <img
            src="https://i1.sndcdn.com/artworks-000233344566-lkcewz-t500x500.jpg"
            className="radio-track-img"
          />
        </div>
        <div className="col-md-4 pt-4">
          <strong className="song-name">{props.trackName}</strong>
          <br />
          <small className="album-name">{props.albumName}</small>
        </div>

        <div className="col-md-4 radio-control pt-5">
          <button className="play">
            <span className="material-symbols-outlined fa-8x" onClick={Play}>
              play_circle
            </span>
          </button>
          <button className="skip">
            <span
              className="material-symbols-outlined fa-4x skip-next mt-4"
              onClick={Skip}
            >
              skip_next
            </span>
          </button>
          <input type="range" className="form-range" id="customRange1" />
        </div>
      </div>
    </div>
  );
}
