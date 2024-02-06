import React from "react";
import classes from "./css/NavigationBar.module.css";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <ul className={classes.navigationBar}>
      <NavLink
        to="/today"
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Today
      </NavLink>
      <NavLink
        to="/tomorrow"
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Tomorrow
      </NavLink>
      <NavLink
        to="/yesterday"
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Yesterday
      </NavLink>
      <NavLink
        to="/nextDays"
        className={({ isActive }) => (isActive ? classes.active : classes.link)}
      >
        Next 3 days
      </NavLink>
    </ul>
  );
};

export default NavigationBar;
