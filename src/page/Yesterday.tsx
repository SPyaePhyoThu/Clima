import React from "react";
import WeatherSection from "../component/WeatherSection";
import WeatherBar from "../component/WeatherBar";
import Highlight from "../component/Highlight";
import classes from "./css/tomrrow.module.css";
import { YesterdayData } from "../util/DateFormat";
import { selectWeatherData, selectOffsetTime } from "../store/weatherSlice";
import {
  formatDataForHighllight,
  formatDataForWeatherBar,
  formatDataForWeatherSection,
} from "../util/DataFormat";
import { useSelector } from "react-redux";

const Yesterday = () => {
  //get data from redux store
  const data = useSelector(selectWeatherData);
  const offsetTime = useSelector(selectOffsetTime);

  //format  dat for weather Section
  const today = new Date();
  const yesterdayData = YesterdayData(today, offsetTime);
  const dataForWeatherSection = formatDataForWeatherSection(data, offsetTime);

  //format data for WeatherBar section
  const currentWeatherData = data[3].timelines.daily[1].values;
  const dataForWeatherBar = formatDataForWeatherBar(currentWeatherData);

  //format data for highlight section
  const dataForHighlight = formatDataForHighllight(currentWeatherData);

  return (
    <div className={classes.weatherContainer}>
      <WeatherSection dateData={yesterdayData} data={dataForWeatherSection} />
      <WeatherBar data={dataForWeatherBar} />
      <Highlight data={dataForHighlight} day={"Yesterday's Highlights"} />
    </div>
  );
};

export default Yesterday;
