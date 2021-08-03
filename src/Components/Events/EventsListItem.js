import React from "react";
import classes from "./events.module.css";
import { useHistory } from "react-router-dom";

const EventsListItem = (props) => {
  const BaseUrl = window.location.origin + "/";
  const Available = props.item.tickets_available > 0;
  let history = useHistory();
  const bookEventHandler = (eventID) => {
    history.push(`/book-an-event/${eventID}`);
  };
  return (
    <li className={classes.cards__item}>
      <div className={classes.card}>
        <div>
          <img
            src={`${BaseUrl}${props.item.imgPath}`}
            alt={props.item.name}
            // style={{
            //   width: "100%",
            // }}
          />
        </div>
        <div className={classes.card__content}>
          <div className={classes.card__title}>{props.item.name}</div>
          <p className={classes.card__text}>
            <span>{props.item.date}</span>
            <span>
              Tickets Available:
              <span className={Available ? classes.available : ""}>
                {Available ? props.item.tickets_available : "N/A"}
              </span>
            </span>
          </p>
          {Available && (
            <button
              type="button"
              className={`${classes.btn} ${classes["btn--block"]} ${classes.card__btn} ${classes["btn--available"]}`}
              onClick={() => bookEventHandler(props.item.id)}
            >
              Book An Event
            </button>
          )}
          {!Available && (
            <button
              type="button"
              className={`${classes.btn} ${classes["btn--block"]} ${classes.card__btn}`}
            >
              SOLD OUT
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default EventsListItem;
