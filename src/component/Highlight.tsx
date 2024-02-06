import HumidityIcon from "../ui/HumidityIcon";
import Precipitation from "../ui/Precipitation";
import Sunrise from "../ui/Sunrise";
import UVIndex from "../ui/UVIndex";
import VisibilityIcon from "../ui/VisibilityIcon";
import WindIcon from "../ui/WindIcon";
import classes from "./css/Highlight.module.css";
import { uvIndexlevelChecker, formatTimeToLocale } from "../util/DataFormat";
import { useSelector } from "react-redux";
import { selectOffsetTime } from "../store/weatherSlice";

interface weatherHighlightData {
  humidity: number;
  precipitationProbability: number;
  uvIndex: number;
  visibility: number;
  windGust: number;
  windDirection: number;
  sunriseTime: string;
  sunsetTime: string;
}

interface weatherHighlightProps {
  data: weatherHighlightData;
  day: string;
}

const Highlight = (props: weatherHighlightProps) => {
  const style: React.CSSProperties = {
    height: "25px",
    width: "25px",
    fill: "#002658",
  };
  const styleLarge: React.CSSProperties = {
    height: "35px",
    width: "35px",
    fill: "#002658",
  };
  const offsetTime = useSelector(selectOffsetTime);

  const highlightList = [
    {
      icon: <HumidityIcon style={style} />,
      name: "Humidity",
      value: `${props.data.humidity.toFixed(1)}%`,
    },
    {
      icon: <Precipitation style={styleLarge} />,
      name: "Precipitation",
      value: `${props.data.precipitationProbability.toFixed(1)}%`,
    },
    {
      icon: <UVIndex style={style} />,
      name: "UV Index",
      value: `${props.data.uvIndex}-${uvIndexlevelChecker(props.data.uvIndex)}`,
    },
    {
      icon: <VisibilityIcon style={style} />,
      name: "Visibility",
      value: `${props.data.visibility.toFixed(1)} km`,
    },
    {
      icon: <WindIcon style={style} />,
      name: "Wind Status",
      value: `${props.data.windGust.toFixed(
        0
      )} mph | ${props.data.windDirection.toFixed(0)}`,
    },
    {
      icon: <Sunrise />,
      name: "Sunrise | Sunset",
      value: `${formatTimeToLocale(
        props.data.sunriseTime,
        offsetTime
      )} | ${formatTimeToLocale(props.data.sunsetTime, offsetTime)}`,
    },
  ];

  return (
    <div className={classes.highlightSection}>
      <h3 className={classes.heading}>{props.day} </h3>
      <ul className={classes.highlightList}>
        {highlightList &&
          highlightList.map((highlight) => (
            <li key={highlight.name} className={classes.highlightItem}>
              {highlight.icon}
              <p>{highlight.name}</p>
              <p className={classes.value}> {highlight.value}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Highlight;
