import React, { useState, useEffect } from "react";
import SearchBar from "../../Components/Search/SearchBar";
import classes from "./events.module.css";
import EventListItem from "./EventsListItem";
const EventsListing = (props) => {
  const [Events, setEvents] = useState([]);
  const [EventsDefault, setEventsDefault] = useState([]);

  const filterEvents = (input) => {
    if (input.trim() !== "") {
      const filtered = EventsDefault.filter((event) => {
        return event.name.toLowerCase().includes(input.toLowerCase());
      });
      setEvents(filtered);
    } else {
      setEvents(EventsDefault);
    }
  };

  const fetchData = async () => {
    return await fetch("/data/Events_list.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
        setEventsDefault(data.events);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <SearchBar filterEvents={filterEvents} />

      {Events && <h1>Events({Events.length})</h1>}
      {Events.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No results found!</h2>
      ) : (
        ""
      )}
      <ul className={classes.cards}>
        {Events &&
          Events.map((item) => {
            return <EventListItem key={item.id} item={item} />;
          })}
      </ul>
    </>
  );
};

export default EventsListing;
