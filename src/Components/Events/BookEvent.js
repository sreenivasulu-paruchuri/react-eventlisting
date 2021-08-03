import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import classes from "./events.module.css";
const BookEvent = (props) => {
  const { eventId } = useParams();
  const [eventData, seteventData] = useState([]);
  const baseUrl = window.location.origin + "/";
  const history = useHistory();
  const [attendeesList, setattendeesList] = useState(2);
  const nameref = useRef("");
  const emailRef = useRef("");
  const mobileRef = useRef("");
  useEffect(() => {
    const fetchEventDataByID = async () => {
      const response = await fetch("/data/Events_list.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.events) {
        const filteredData = data.events.filter((item) => item.id === +eventId);
        if (
          filteredData &&
          filteredData[0] &&
          filteredData[0]["tickets_available"] <= 0
        ) {
          history.replace("/events");
        }
        seteventData(filteredData);
      }
    };
    fetchEventDataByID();
  }, [eventId, history]);
  const addAttendeeHandler = (available) => {
    if (available > 0 && available > attendeesList) {
      const counter = attendeesList + 1;
      setattendeesList(counter);
    }
  };
  const disbaleAddAttendeeBtn =
    eventData &&
    eventData[0] &&
    attendeesList === eventData[0]["tickets_available"]
      ? "disabled"
      : "";
  let rows = [];
  for (let i = 0; i < attendeesList; i++) {
    rows.push(
      <div key={i}>
        <h2>{i + 1}</h2>
        <input
          type="text"
          id={`attendee-${i + 3}`}
          placeholder="FirstName LastName"
        />
      </div>
    );
  }
  const bookAnEventHandler = (event) => {
    event.preventDefault();
    console.log(
      emailRef.current.value,
      mobileRef.current.value,
      nameref.current.value
    );
  };
  const cancelHandler = () => {
    history.replace("/events");
  };

  return (
    <>
      {eventData && eventData[0] && (
        <form onSubmit={bookAnEventHandler}>
          <div className={classes.book__event__form}>
            <div className={classes.book__event__details}>
              <h2>{eventData[0]["name"]}</h2>
              <p>{eventData[0]["date"]}</p>
              <p>
                Tickets Available:{" "}
                <span
                  style={{ color: "orange", fontWeight: "bold" }}
                >{`${eventData[0]["tickets_available"]}`}</span>
              </p>
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="FirstName LastName"
                ref={nameref}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="username@domain.com"
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="Mobile"
                placeholder="+91-XXXXXXXXXX"
                ref={mobileRef}
              />
            </div>
            <div className={classes["attendes"]}>
              <p>Attendees</p>
              <div className={classes["attendes-list"]}>
                {rows}
                <div className={classes["add__attendes__actions"]}>
                  <button
                    type="button"
                    onClick={() =>
                      addAttendeeHandler(+eventData[0]["tickets_available"])
                    }
                    className={`${classes.add__attendee__btn} ${
                      disbaleAddAttendeeBtn
                        ? classes["add__attendee__btn_disabled"]
                        : ""
                    }`}
                  >
                    <img
                      src={`${baseUrl}images/add-attendee.png`}
                      alt="plus-icon"
                    />
                    Add Attendee
                  </button>
                </div>
              </div>
              <div className={classes["event-actions"]}>
                <button
                  type="submit"
                  className={`${classes.btn} ${classes["book__event__btn"]}`}
                >
                  Book Tickets
                </button>
                <button
                  type="button"
                  onClick={cancelHandler}
                  className={`${classes.btn} ${classes["book__event__canel__btn"]}`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default BookEvent;
