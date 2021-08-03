import classes from "./card.module.css";
const Card = (props) => {
  const cardClasses = [classes.card, props.cardclasses].join(" ");
  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
