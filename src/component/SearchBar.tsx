import React, { useState } from "react";
import MagnifyingGlass from "../ui/MagnifyingGlass";
import classes from "./css/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { weatherDataActions } from "../store/weatherSlice";

import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import { fetchAllWeatherData } from "../store/weatherAction";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [offsetTime, setOffsetTime] = useState<number>(0);

  const searchhandler = async () => {
    try {
      await dispatch(fetchAllWeatherData(city));
      dispatch(weatherDataActions.selectCity(city));
      dispatch(weatherDataActions.selectCountry(country));
      dispatch(weatherDataActions.selectOffsetTime(offsetTime));
      setCity("");
    } catch (error) {
      navigate("/error");
    }
  };

  const onPlaceSelect = (value: any) => {
    if (value) {
      setCity(value.properties.city);
      setCountry(value.properties.country);
      setOffsetTime(value.properties.timezone.offset_STD_seconds / 3600);
    } else {
      setCity("");
      setCountry("");
    }
  };
  return (
    <div className={classes.searchBar}>
      <button
        disabled={city === ""}
        onClick={searchhandler}
        className={classes.glassBox}
      >
        <MagnifyingGlass />
      </button>
      <GeoapifyContext apiKey={process.env.REACT_APP_GEOAPIFI_API_KEY}>
        <GeoapifyGeocoderAutocomplete
          placeholder="City"
          value={city}
          placeSelect={onPlaceSelect}
        />
      </GeoapifyContext>
    </div>
  );
};

export default SearchBar;
