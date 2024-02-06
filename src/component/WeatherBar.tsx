import { useSelector } from "react-redux";
import TemperatureBar from "../ui/TemperatureBar";
import classes from "./css/WeatherBar.module.css";
import { selectedTempUnit } from "../store/weatherSlice";
import { fahrenheitToCelsius } from "../util/DataFormat";

interface weatherBarData {
  apparentTemp: number;
  actualTemp: number;
  maxTemp: number;
  minTemp: number;
}

interface weatherBarProps {
  data: weatherBarData;
}

const WeatherBar = (props: weatherBarProps) => {
  const tempUnit = useSelector(selectedTempUnit);

  const TemperatureBarStyle: React.CSSProperties = {
    height: "30px",
    width: "30px",
    fill: "#002658",
  };
  return (
    <div className={classes.weatherBarSection}>
      <div className={classes.weatherBar}>
        <div className={classes.feelslikeBox}>
          <h3 className={classes.feelslike}>Feel like</h3>
          <div className={classes.icon}>
            <TemperatureBar style={TemperatureBarStyle} />
            <p className={classes.value}>
              {tempUnit === "Celsius"
                ? `${fahrenheitToCelsius(+props.data.apparentTemp).toFixed(
                    0
                  )}°C`
                : `${props.data.apparentTemp.toFixed(0)}°F`}
            </p>
          </div>
        </div>
        <div className={classes.temperatureBox}>
          <h3 className={classes.temperature}>Temperature</h3>
          <div className={classes.icon}>
            <TemperatureBar style={TemperatureBarStyle} />
            <p className={classes.value}>
              {tempUnit === "Celsius"
                ? `${fahrenheitToCelsius(+props.data.actualTemp).toFixed(0)}°C`
                : `${props.data.actualTemp.toFixed(0)}°F`}
            </p>
          </div>
        </div>

        <div className={classes.maxMinBox}>
          <h3 className={classes.maxMin}>Max-Min</h3>
          <p className={classes.value}>
            &uarr;{" "}
            {tempUnit === "Celsius"
              ? `${fahrenheitToCelsius(+props.data.maxTemp).toFixed(0)}°C`
              : `${props.data.maxTemp.toFixed(0)}°F`}
            &darr;
            {tempUnit === "Celsius"
              ? `${fahrenheitToCelsius(+props.data.minTemp).toFixed(0)}°C`
              : `${props.data.apparentTemp.toFixed(0)}°F`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherBar;
