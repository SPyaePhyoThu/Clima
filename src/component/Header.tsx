import React from "react";
import classes from "./css/Header.module.css";
import logo from "../assets/images/logo.png";
import SearchBar from "./SearchBar";

import NavigationBar from "./NavigationBar";

const Header = () => {
  return (
    <div className={classes.header}>
      <img className={classes.logo} src={logo} alt="logo" />
      <h1 className={classes.heading}>Clima</h1>

      <NavigationBar />
      <SearchBar />
    </div>
  );
};

export default Header;
