import { useSelector } from "react-redux";
import Overview from "../component/Overview";

//icons
import HumidityIcon from "../ui/HumidityIcon";
import Precipitation from "../ui/Precipitation";
import SunsetIcon from "../ui/SunsetIcon";
import TemperatureBar from "../ui/TemperatureBar";
import UVIndex from "../ui/UVIndex";
import VisibilityIcon from "../ui/VisibilityIcon";
import WindIcon from "../ui/WindIcon";
import SunriseIcon from "../ui/sunriseIcon";
import {
  formatDataForNextDays,
  weatherCodeToweather,
  formatDataForChart,
  formatTimeToLocale,
} from "../util/DataFormat";
import { NextDaysData } from "../util/DateFormat";
import classes from "./css/nextDaySection.module.css";
import {
  selectOffsetTime,
  selectWeatherData,
  selectedTempUnit,
} from "../store/weatherSlice";
import { fahrenheitToCelsius } from "../util/DataFormat";
import CFBar from "../component/CFBar";

const NextDays = () => {
  const offsetTime = useSelector(selectOffsetTime);

  const style: React.CSSProperties = {
    height: "30px",
    width: "35px",
    fill: "#ffffff",
  };
  const Weatherstyle: React.CSSProperties = {
    height: "75px",
    width: "75px",
    fill: "#ffffff",
  };
  const styleSmall: React.CSSProperties = {
    height: "25px",
    width: "28px",
    fill: "#ffffff",
  };

  const iconsArray = [
    <TemperatureBar style={style} />,
    <SunriseIcon style={style} />,
    <SunsetIcon style={style} />,
    <HumidityIcon style={styleSmall} />,
    <VisibilityIcon style={styleSmall} />,
    <UVIndex style={styleSmall} />,
    <Precipitation style={style} />,
    <WindIcon style={styleSmall} />,
  ];

  //day Data
  const today = new Date();
  const nextDaysData = NextDaysData(today, offsetTime);

  //Weather data
  const data = useSelector(selectWeatherData);
  const tempUnit = useSelector(selectedTempUnit);
  const WeatherDataForNextDays = data[1].timelines.daily.slice(-3);

  const weatherAndDatedataArray = formatDataForNextDays({
    iconsArray,
    nextDaysData,
    WeatherDataForNextDays,
  });

  //format data for chart
  const dataArrayForChart = data[1].timelines.daily.slice(0, 5);

  const preciDataFromApi = formatDataForChart(
    dataArrayForChart,
    "precipitationProbabilityAvg",
    "%",
    "daily",
    `${tempUnit}`,
    offsetTime
  );
  const windDataFromApi = formatDataForChart(
    dataArrayForChart,
    "windGustAvg",
    "mph",
    "daily",
    `${tempUnit}`,
    offsetTime
  );
  const TempDataFromApi = formatDataForChart(
    dataArrayForChart,
    "temperatureAvg",
    "°C",
    "daily",
    `${tempUnit}`,
    offsetTime
  );
  const dataObj = { windDataFromApi, TempDataFromApi, preciDataFromApi };

  return (
    <div className={classes.nextDaySection}>
      <div className={classes.cfBar}>
        <CFBar />
      </div>
      <div className={classes.boxSection}>
        {weatherAndDatedataArray &&
          weatherAndDatedataArray.map((data, index) => (
            <div
              key={data.date}
              className={`${classes.forecastBox} specialBox${index + 1}`}
            >
              <h3 className={classes.heading}>
                {data.weekOfTheDay} | {data.date}
              </h3>

              <div className={classes.weatherTempBox}>
                <div className={classes.weatherBox}>
                  {weatherCodeToweather(data.weatherCode, Weatherstyle).icon}
                  <p className={classes.weatherText}>
                    {weatherCodeToweather(data.weatherCode, Weatherstyle).text}
                  </p>
                </div>
                <p className={classes.temperature}>
                  {tempUnit === "Celsius"
                    ? `${fahrenheitToCelsius(data.temperature).toFixed(0)}°C`
                    : `${data.temperature.toFixed(0)}°F`}
                </p>
              </div>
              <ul className={classes.detailsBox}>
                {data.dataArray &&
                  data.dataArray.map((staticData) => (
                    <li key={staticData.name} className={classes.details}>
                      <p className={classes.name}>{staticData.name}</p>
                      {staticData.icon}
                      <p className={classes.value}>
                        {staticData.name === "Sunrise" ||
                        staticData.name === "Sunset"
                          ? formatTimeToLocale(staticData.value, offsetTime)
                          : staticData.name === "Feels like"
                          ? tempUnit === "Celsius"
                            ? `${fahrenheitToCelsius(data.temperature).toFixed(
                                0
                              )}°C`
                            : `${data.temperature.toFixed(0)}°F`
                          : staticData.value}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
      <div className={classes.chartSection}>
        <Overview dataObj={dataObj} />
      </div>
    </div>
  );
};
export default NextDays;
