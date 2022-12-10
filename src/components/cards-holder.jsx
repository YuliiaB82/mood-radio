import { PhotoCard } from "./photo-card";
import { ReturnCard } from "./return-card";
import "./cards-holder.css";

export function CardHolder(props) {
  return (
    <div className="cardsContainer">
      {props.cards.map((card) => (
        <PhotoCard
          id={card.id}
          key={card.id}
          title={card.title}
          color={card.color}
          image={card.image}
          isActive={card.id === props.activePlaylist}
          onClick={props.onClick}
        />
      ))}
      {props.activeMood ? <ReturnCard onClick={props.onReturnClick} /> : ""}
    </div>
  );
}
