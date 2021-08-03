import React, { useState } from "react";
import classes from "./search.module.css";

const SearchBar = (props) => {
  const [searchKeyword, setsearchKeyword] = useState("");
  const handleChange = (event) => {
    if (event.target.value.trim() === "") {
      setsearchKeyword("");
    } else {
      setsearchKeyword(event.target.value);
    }

    props.filterEvents(searchKeyword);
  };
  return (
    <>
      <div className={classes["search__section"]}>
        <input
          type="Search"
          placeholder="Search Events"
          onChange={handleChange}
          name="search"
          className={classes["search__input"]}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </>
  );
};

export default SearchBar;
