import React, { useState } from "react";
import classes from "./css/CFBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectedTempUnit, weatherDataActions } from "../store/weatherSlice";

const CFBar = () => {
  const tempUnit = useSelector(selectedTempUnit).toLocaleLowerCase();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string>(tempUnit);
  const clickHanderCelcius = () => {
    setSelected("celsius");
    dispatch(weatherDataActions.changeTempUnit("Celsius"));
  };
  const clickHanderFarenheit = () => {
    setSelected("farenheit");
    dispatch(weatherDataActions.changeTempUnit("Farenheit"));
  };

  return (
    <div className={classes.container}>
      <button
        onClick={clickHanderCelcius}
        className={`${
          selected === "celsius" ? classes.selected : classes.unselected
        }`}
        disabled={selected === "celsius"}
      >
        °C
      </button>
      <button
        onClick={clickHanderFarenheit}
        className={`${
          selected === "farenheit" ? classes.selected : classes.unselected
        }`}
        disabled={selected === "farenheit"}
      >
        °F
      </button>
    </div>
  );
};

export default CFBar;
