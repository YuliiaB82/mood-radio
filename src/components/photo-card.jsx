import "./photo-card.css";

export function PhotoCard(props) {
  return (
    <div className="photoCardWrapper">
      <div className="photoCard">
        <div className="photo" style={{ backgroundColor: props.color }}></div>
        <div className="description">{props.title}</div>
      </div>
    </div>
  );
}
