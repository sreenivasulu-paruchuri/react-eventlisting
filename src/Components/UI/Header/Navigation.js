import React from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
const Navigation = (props) => {
  const BaseUrl = window.location.origin + "/";
  return (
    <div className={classes["flex-container"]}>
      <h1 className={classes.logo}>
        <NavLink to="/">
          <img src={`${BaseUrl}images/Vector.png`} alt="site-logo" />{" "}
          <img src={`${BaseUrl}images/LOGOIPSUM.png`} alt="site-logo" />
        </NavLink>
      </h1>
      <ul className={classes.navigation}>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/events" activeClassName="selected">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/help">Help</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
