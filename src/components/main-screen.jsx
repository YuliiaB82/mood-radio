import { useState, useEffect } from "react";
import { CardHolder } from "./cards-holder";
import { Player } from "./player";
import { wait } from "../helper";
import "./main-screen.css";

const moodList = [];
const track = {
  name: "loading ..",
  album: {
    name: "",
    images: [
      {
        url: "https://i1.sndcdn.com/artworks-000233344566-lkcewz-t500x500.jpg",
      },
    ],
  },
  artists: [{ name: "" }],
};

export function MainScreen({ token }) {
  const [playbackReady, setPlaybackReady] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [isPaused, setPaused] = useState(true);
  const [currentTrack, setTrack] = useState(track);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => setPlaybackReady(true);
  }, []);

  useEffect(() => {
    if (!playbackReady) return;
    console.log("Spotify Sdk is ready");
    const newPlayer = new window.Spotify.Player({
      name: "Mood player",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 0.5,
    });
    setPlayer(newPlayer);
    newPlayer.addListener("ready", async ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      // "Device not found" error workaround
      await wait(1900);
      await fetch("/api/changeDevice", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ device_ids: [device_id], token }),
      });
    });

    newPlayer.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    newPlayer.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      setTrack(state.track_window.current_track);
      setPaused(state.paused);
    });

    newPlayer.connect();
  }, [playbackReady, token]);

  const handleToggleClick = () => {
    player.togglePlay();
  };
  const handleNextClick = () => {
    player.nextTrack();
  };

  return (
    <div>
      <h1 className="mt-5"> MOOD RADIO </h1>
      <Player
        track={currentTrack}
        isPaused={isPaused}
        onToggleClick={handleToggleClick}
        onNextClick={handleNextClick}
      />
      <CardHolder
        cards={moodList.map((item) => {
          return {
            title: item.emotion,
            color: item.color,
          };
        })}
      />
    </div>
  );
}
