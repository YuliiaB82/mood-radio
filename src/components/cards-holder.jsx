import { PhotoCard } from "./photo-card";
import "./cards-holder.css";

export function CardHolder(props) {
  return (
    <div className="cardsContainer">
      {props.cards.map((card) => (
        <PhotoCard title={card.title} color={card.color} />
      ))}
    </div>
  );
}
