import React, { useEffect, useState } from "react";
import classes from "./css/HourlyForecast.module.css";
import PreviousButton from "../ui/PreviousButton";
import NextButton from "../ui/NextButton";
import Precipitation from "../ui/Precipitation";
import TemperatureBar from "../ui/TemperatureBar";
import {
  formatHourToLocale,
  fahrenheitToCelsius,
  weatherCodeToweather,
  checkNightHourWeather,
} from "../util/DataFormat";

import NightTime from "../ui/NightTime";
import { useSelector } from "react-redux";
import { selectOffsetTime, selectedTempUnit } from "../store/weatherSlice";

interface dataProps {
  data: { hourlyDataforToday: any[]; sunriseTime: string; sunsetTime: string };
}

const HourlyForecast = (props: dataProps) => {
  const deviceWidth = window.innerWidth;

  const tempUnit = useSelector(selectedTempUnit);
  const offsetTime = useSelector(selectOffsetTime);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { hourlyDataforToday, sunriseTime, sunsetTime } = props.data;

  useEffect(() => {
    const currentTime =
      new Date().getUTCHours() + offsetTime > 24
        ? new Date().getUTCHours() + offsetTime - 24
        : new Date().getUTCHours() + offsetTime < 0
        ? new Date().getUTCHours() + offsetTime + 24
        : new Date().getUTCHours() + offsetTime;

    if (currentTime < 8) {
      setCurrentIndex(0);
    } else if (currentTime > 8 && currentTime < 16) {
      setCurrentIndex(8);
    } else {
      setCurrentIndex(16);
    }
  }, [offsetTime]);

  //styles for icon

  const TemperatureBarStyle: React.CSSProperties = {
    height: "35px",
    width: "35px",
    fill: "#002658",
  };
  const style: React.CSSProperties =
    deviceWidth < 800
      ? {
          height: "45px",
          width: "45px",
          fill: "#ffffff",
        }
      : {
          height: "70px",
          width: "70px",
          fill: "#ffffff",
        };

  //handler functions
  const nextHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 8) % 24);
  };
  const previousHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 8 + 24) % 24);
  };

  const visibleHours = hourlyDataforToday.slice(currentIndex, currentIndex + 8);

  return (
    <div className={classes.forecast}>
      <h3 className={classes.heading}>Today | Hourly</h3>
      <div className={classes.hourlySection}>
        <button onClick={previousHandler} className={classes.button}>
          <PreviousButton />
        </button>
        <ul className={classes.weatherBox}>
          {visibleHours.map((item, index) => (
            <li key={index} className={classes.eachHourBox}>
              <div
                className={
                  deviceWidth > 500
                    ? `${
                        index === 0 || index === 8 || index === 16
                          ? ""
                          : classes.bars
                      }`
                    : `${
                        index === 0 ||
                        index === 4 ||
                        index === 8 ||
                        index === 12 ||
                        index === 16
                          ? ""
                          : classes.bars
                      }`
                }
              ></div>
              <div className={classes.eachHour}>
                <h3 className={classes.times}>
                  {`${
                    `${Number(
                      formatHourToLocale(item.time, Math.floor(offsetTime))
                    )}` === "24"
                      ? "00"
                      : Number(
                          formatHourToLocale(item.time, Math.floor(offsetTime))
                        ) < 0
                      ? Number(
                          formatHourToLocale(item.time, Math.floor(offsetTime))
                        ) + 24
                      : Number(
                          formatHourToLocale(item.time, Math.floor(offsetTime))
                        ) > 24
                      ? Number(
                          formatHourToLocale(item.time, Math.floor(offsetTime))
                        ) - 24
                      : formatHourToLocale(item.time, Math.floor(offsetTime))
                  }:00`}
                </h3>
                {checkNightHourWeather(
                  sunriseTime,
                  sunsetTime,
                  item.time,
                  offsetTime
                ) && item.values.weatherCode.toString().startsWith("1") ? (
                  <NightTime style={style} />
                ) : (
                  weatherCodeToweather(item.values.weatherCode, style).icon
                )}
                <p className={classes.weather}>
                  {checkNightHourWeather(
                    sunriseTime,
                    sunsetTime,
                    item.time,
                    offsetTime
                  ) &&
                  weatherCodeToweather(
                    item.values.weatherCode,
                    style
                  ).text.startsWith("Sunny")
                    ? "Clear"
                    : weatherCodeToweather(item.values.weatherCode, style).text}
                </p>

                <div className={classes.icons}>
                  <Precipitation style={TemperatureBarStyle} />
                  <TemperatureBar style={TemperatureBarStyle} />
                </div>
                <div className={classes.values}>
                  <p>{item.values.precipitationProbability} %</p>
                  <p>
                    {" "}
                    {tempUnit === "Celsius"
                      ? `${fahrenheitToCelsius(
                          item.values.temperatureApparent
                        ).toFixed(0)}°C`
                      : `${item.values.temperatureApparent.toFixed(0)}°F`}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={nextHandler} className={classes.button}>
          <NextButton />
        </button>
      </div>
    </div>
  );
};
export default HourlyForecast;
