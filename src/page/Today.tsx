import React from "react";
import classes from "./css/today.module.css";

import WeatherSection from "../component/WeatherSection";
import WeatherBar from "../component/WeatherBar";
import Highlight from "../component/Highlight";
import HourlyForecast from "../component/HourlyForecast";
import Overview from "../component/Overview";
import { TodayData } from "../util/DateFormat";
import {
  selectOffsetTime,
  selectWeatherData,
  selectedTempUnit,
} from "../store/weatherSlice";
import { useSelector } from "react-redux";
import {
  formatDataForHighllight,
  formatDataForWeatherBar,
  formatDataForHourlyForecast,
  formatDataForChart,
  formatDataForWeatherSection,
} from "../util/DataFormat";

const Today = () => {
  // get data from redux
  const data = useSelector(selectWeatherData);
  const tempUnit = useSelector(selectedTempUnit);
  const offsetTime = useSelector(selectOffsetTime);

  //formatting data for weatherSecion
  const today = new Date();
  const todayData = TodayData(today, offsetTime);
  const dataForWeatherSection = formatDataForWeatherSection(data, offsetTime);

  //formatting data for weatherData Section
  const currentWeatherData = data[1].timelines.daily[0].values;
  const dataForWeatherBar = formatDataForWeatherBar(currentWeatherData);

  // formatting data for highlight Section
  const dataForHighlight = formatDataForHighllight(currentWeatherData);

  // formatting data for HourlyForecast Section
  const dataArrayForHourlyForecast = formatDataForHourlyForecast(
    data[0].timelines.hourly,
    data[1].timelines.daily,
    data[2].timelines.hourly,
    offsetTime
  );

  /// Formatting data for Chart / overview Section
  const dataArrayForChart =
    dataArrayForHourlyForecast.hourlyDataforToday.filter(
      (dataArray, index) => index % 3 === 0
    );

  const preciDataFromApi = formatDataForChart(
    dataArrayForChart,
    "precipitationProbability",
    "%",
    "hourly",
    `${tempUnit}`,
    offsetTime
  );
  const windDataFromApi = formatDataForChart(
    dataArrayForChart,
    "windGust",
    "mph",
    "hourly",
    `${tempUnit}`,
    offsetTime
  );
  const TempDataFromApi = formatDataForChart(
    dataArrayForChart,
    "temperature",
    "°C",
    "hourly",
    `${tempUnit}`,
    offsetTime
  );
  const dataObj = { windDataFromApi, TempDataFromApi, preciDataFromApi };

  return (
    <div className={classes.weatherContainer}>
      <WeatherSection dateData={todayData} data={dataForWeatherSection} />
      <WeatherBar data={dataForWeatherBar} />
      <Highlight data={dataForHighlight} day={"Today's Highlights"} />
      <HourlyForecast data={dataArrayForHourlyForecast} />
      <Overview dataObj={dataObj} />
    </div>
  );
};

export default Today;
