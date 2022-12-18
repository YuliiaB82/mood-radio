import { useState, useEffect } from "react";
import { CardHolder } from "./cards-holder";
import { Player } from "./player";
import {
  getMoods,
  play,
  searchPlaylists,
  wait,
  defaultPlaylist,
} from "../helper";
import "./main-screen.css";

const defaultTrack = {
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
  const [volume, setVolume] = useState(0.5);
  const [isPaused, setPaused] = useState(true);
  const [currentTrack, setTrack] = useState(defaultTrack);
  const [deviceId, setDeviceId] = useState();
  const [cardsData, setCardsData] = useState([]);
  const [mood, setMood] = useState(undefined);
  const [playList, setPlayList] = useState(defaultPlaylist);

  useEffect(() => {
    const statUp = async () => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => setPlaybackReady(true);

      const defaultMoods = await getMoods();
      setCardsData(defaultMoods);
    };
    statUp();
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
      setDeviceId(device_id);
      play(token, device_id);
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
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    player.setVolume(newVolume);
    setVolume(newVolume);
  };
  const handleCardClick = async (cardId) => {
    if (!mood) {
      const selectedMood = cardsData.find((m) => m.id === cardId);
      const playlists = await searchPlaylists(token, selectedMood.title);
      if (playlists.length < 1) return;
      for (let i = 0; i < playlists.length; i++) {
        playlists[i].color = cardsData[i].color;
      }

      setMood(selectedMood);
      setCardsData(playlists);
    } else {
      play(token, deviceId, cardId);
      setPlayList(cardId);
    }
  };
  const handleReturnClick = async () => {
    const defaultMoods = await getMoods();
    setCardsData(defaultMoods);
    setMood(undefined);
  };

  return (
    <div className="main-screen-container">
      <h1> MOOD RADIO </h1>
      <Player
        track={currentTrack}
        isPaused={isPaused}
        volume={volume}
        onToggleClick={handleToggleClick}
        onNextClick={handleNextClick}
        onVolumeChange={handleVolumeChange}
      />
      <CardHolder
        cards={cardsData}
        activePlaylist={playList}
        activeMood={mood}
        onClick={handleCardClick}
        onReturnClick={handleReturnClick}
      />
    </div>
  );
}
