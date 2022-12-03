import "./App.css";
import "./styles.css";
import { Player } from "./Player";
import { useState } from "react";
import { CardHolder } from "./components/cards-holder";

const moodList = [
  { emotion: "Energy", color: "#F5B971" },
  { emotion: "Peace & Calm", color: "#AAC4FF" },
  { emotion: "Happiness & Optimism", color: "#FFF89A" },
  { emotion: "Passion & Excitement", color: "#FF8080" },
  { emotion: "Nature & Simplicity", color: "#796465" },
  { emotion: "Nature & Life", color: "#CBE2B0" },
  { emotion: "Intrigue & Spirituality", color: "#CAABD8" },
  { emotion: "Love & Compassion", color: "#F5B0CB" },
];

export default function App() {
  const [trackName, useTrackName] = useState("Mind Off (feat. Kudu Blue)");
  const [albumName, useAlbumName] = useState("by Cosmso's Midnight ");
  return (
    <div className="App">
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
