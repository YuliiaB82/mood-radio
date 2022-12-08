import { useState } from "react";
import { CardHolder } from "./cards-holder";
import { Player } from "./player";
import "./main-screen.css";

const moodList = [];
export function MainScreen(props) {
  alert(props.token);
  const [trackName, useTrackName] = useState("Mind Off (feat. Kudu Blue)");
  const [albumName, useAlbumName] = useState("by Cosmso's Midnight ");
  return (
    <div>
      <h1 class="mt-5"> MOOD RADIO </h1>
      <Player trackName={trackName} albumName={albumName} />
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
