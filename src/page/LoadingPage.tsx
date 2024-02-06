import { useNavigate } from "react-router-dom";
import classes from "./css/LoadingPage.module.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllWeatherData } from "../store/weatherAction";
import { AppDispatch } from "../store/store";
import { getUserLocation, reverseGeoCode } from "../util/DataFormat";
import { weatherDataActions } from "../store/weatherSlice";
import Sunny from "../ui/Sunny";

import HeavySnow from "../ui/HeavySnow";
import NightTime from "../ui/NightTime";
import HeavyRain from "../ui/HeavyRain";

const LoadingPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get User Location
        const location = await getUserLocation();
        await dispatch(fetchAllWeatherData(location));

        //transfrom location to city and country name
        const [lat, long] = location.split(",");
        const { city, country } = await reverseGeoCode(lat, long);

        //store all necessary data
        dispatch(weatherDataActions.selectCity(city));
        dispatch(weatherDataActions.selectCountry(country));
        const offsetTime = -(new Date().getTimezoneOffset() / 60);

        dispatch(weatherDataActions.selectOffsetTime(offsetTime));

        // redirect to webpage
        setTimeout(() => {
          navigate("/today");
        }, 4000);
      } catch (error) {
        navigate("/error");
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  const SunStyle: React.CSSProperties = {
    height: "48px",
    width: "48px",
    fill: "#ffffff",
  };
  const Style: React.CSSProperties = {
    height: "50px",
    width: "50px",
    fill: "#ffffff",
  };
  const NightStyle: React.CSSProperties = {
    height: "50px",
    width: "50px",
    fill: "#002658",
  };

  return (
    <div className={classes.loading}>
      <div className={classes.iconBox}>
        <Sunny style={SunStyle} />
        <HeavyRain style={Style} />
        <HeavySnow style={Style} />
        <NightTime style={NightStyle} />
      </div>
      <h1 className={classes.heading}>Clima</h1>
    </div>
  );
};
export default LoadingPage;
