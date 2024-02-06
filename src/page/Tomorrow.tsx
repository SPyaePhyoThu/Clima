import React from "react";
import WeatherSection from "../component/WeatherSection";
import WeatherBar from "../component/WeatherBar";
import Highlight from "../component/Highlight";
import classes from "./css/tomrrow.module.css";
import { TomorrowData } from "../util/DateFormat";
import { selectOffsetTime, selectWeatherData } from "../store/weatherSlice";
import { useSelector } from "react-redux";
import {
  formatDataForWeatherBar,
  formatDataForHighllight,
  formatDataForWeatherSection,
} from "../util/DataFormat";

const Tomorrow = () => {
  //get data from redux store
  const data = useSelector(selectWeatherData);
  const offsetTime = useSelector(selectOffsetTime);

  //format data for Weather Section
  const today = new Date();
  const tomorrowData = TomorrowData(today, offsetTime);
  const dataForWeatherSection = formatDataForWeatherSection(data, offsetTime);

  // format data for WeatherBar Section
  const currentWeatherData = data[1].timelines.daily[1].values;
  const dataForWeatherBar = formatDataForWeatherBar(currentWeatherData);

  //format data forhighlight section
  const dataForHighlight = formatDataForHighllight(currentWeatherData);

  return (
    <div className={classes.weatherContainer}>
      <WeatherSection dateData={tomorrowData} data={dataForWeatherSection} />
      <WeatherBar data={dataForWeatherBar} />

      <Highlight data={dataForHighlight} day={"Tomorrow's Forecast"} />
    </div>
  );
};

export default Tomorrow;
