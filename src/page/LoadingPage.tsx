import { useNavigate } from "react-router-dom";
import classes from "./css/LoadingPage.module.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllWeatherData } from "../store/weatherAction";
import { AppDispatch } from "../store/store";
import { getUserLocation, reverseGeoCode } from "../util/DataFormat";
import { weatherDataActions } from "../store/weatherSlice";
import Sunny from "../ui/Sunny";

import HeavySnow from "../ui/HeavySnow";
import NightTime from "../ui/NightTime";

import Thunderstorm from "../ui/ThunderStorm";
import LoadingIcon from "../ui/Loading";

const LoadingPage = () => {
  const [loadingStep, setLoadingStep] = useState(0);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => setLoadingStep(1), 1000);
        setTimeout(() => setLoadingStep(2), 2000);
        setTimeout(() => setLoadingStep(3), 3000);
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

        // Set loading steps

        setTimeout(() => setLoadingStep(4), 4000);

        // redirect to webpage
        setTimeout(() => {
          navigate("/today");
        }, 5000);
      } catch (error) {
        navigate("/error");
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  const SunStyle: React.CSSProperties = {
    height: "46px",
    width: "46px",
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
        {loadingStep >= 1 && <Sunny style={SunStyle} />}
        {loadingStep >= 2 && <Thunderstorm style={Style} />}
        {loadingStep >= 3 && <HeavySnow style={Style} />}
        {loadingStep >= 4 && <NightTime style={NightStyle} />}
      </div>
      <div className={classes.loadingIcon}>
        <LoadingIcon />
      </div>
      <h1 className={classes.heading}>Clima</h1>
    </div>
  );
};
export default LoadingPage;
