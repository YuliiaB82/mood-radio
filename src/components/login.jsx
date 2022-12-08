import React from "react";
import "./login.css";

export function Login() {
  return (
    <div className="Login">
      <a className="LoginSpotifyLink" href="/api/auth/login">
        LOGIN <br /> WITH <br />
        SPOTIFY
      </a>
    </div>
  );
}
