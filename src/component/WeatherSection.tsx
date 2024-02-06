import CFBar from "./CFBar";
import classes from "./css/WeatherSection.module.css";
import NightTime from "../ui/NightTime";
import day from "../assets/images/sunnyAdjust.jpg";
import night from "../assets/images/Night1.jpg";

import {
  weatherCodeToweather,
  checkNightHourWeather,
  formatTimeToLocale,
} from "../util/DataFormat";

import { useSelector } from "react-redux";
import {
  selectCity,
  selectCountry,
  selectOffsetTime,
} from "../store/weatherSlice";

interface DateData {
  day: string;
  weekOfTheDay: string;
  date: string;
}

interface WeatherSectionProps {
  dateData: DateData;
  data: { weatherCode: number; sunriseTime: string; sunsetTime: string };
}

const Style: React.CSSProperties = {
  height: "120px",
  width: "120px",
  fill: "#ffffff",
};

const WeatherSection: React.FC<WeatherSectionProps> = (props) => {
  const city = useSelector(selectCity);
  const country = useSelector(selectCountry);
  const offsetTime = useSelector(selectOffsetTime);

  const currentTime = new Date().toUTCString();
  const currentHour =
    new Date().getUTCHours() + offsetTime > 24
      ? new Date().getUTCHours() + offsetTime - 24
      : new Date().getUTCHours() + offsetTime < 0
      ? new Date().getUTCHours() + offsetTime + 24
      : new Date().getUTCHours() + offsetTime;

  const { weatherCode, sunriseTime, sunsetTime } = props.data;

  const localTime = new Date();
  const localCurrentHour = formatTimeToLocale(`${localTime}`, offsetTime);

  return (
    <div className={classes.weatherSection}>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${
            currentHour <= +sunriseTime || currentHour >= +sunsetTime
              ? night
              : day
          })`,
        }}
      >
        <div className={classes.overlay}>
          <div className={classes.dates}>
            <p className={classes.day}>
              {props.dateData.day} | {props.dateData.weekOfTheDay}
            </p>
            <p className={classes.date}>{props.dateData.date}</p>
          </div>
          <div className={classes.weatherContainer}>
            {checkNightHourWeather(
              sunriseTime,
              sunsetTime,
              currentTime,
              offsetTime
            ) && weatherCode.toString().startsWith("1") ? (
              <NightTime style={Style} />
            ) : (
              weatherCodeToweather(weatherCode, Style).icon
            )}

            <p className={classes.weather}>
              {checkNightHourWeather(
                sunriseTime,
                sunsetTime,
                currentTime,
                offsetTime
              ) &&
              weatherCodeToweather(weatherCode, Style).text.startsWith("Sunny")
                ? "Clear"
                : weatherCodeToweather(weatherCode, Style).text}
            </p>
          </div>
          <div className={classes.rightSection}>
            <div className={classes.place}>
              <p className={classes.city}>{city}</p>
              <p className={classes.country}>{country}</p>
              <p>{`${localCurrentHour}`}</p>
            </div>
            <CFBar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherSection;
