import { createSlice } from "@reduxjs/toolkit";
import { fetchAllWeatherData } from "./weatherAction";
import { RootState } from "./store";

interface WeatherDataState {
  city: string;
  country: string;
  cityOffsetTime: number;
  temperatureUnit: "Celsius" | "Farenheit";
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WeatherDataState = {
  city: "",
  country: "",
  cityOffsetTime: 0,
  temperatureUnit: "Celsius",
  data: [],
  status: "idle",
  error: null,
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    selectCity: (state, action) => {
      state.city = action.payload;
    },
    selectCountry: (state, action) => {
      state.country = action.payload;
    },
    selectOffsetTime: (state, action) => {
      state.cityOffsetTime = action.payload;
    },
    changeTempUnit: (state, action) => {
      state.temperatureUnit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.reduce((acc, curr) => acc.concat(curr), []);
      })
      .addCase(fetchAllWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occured";
      });
  },
});

export const weatherDataActions = weatherDataSlice.actions;
export default weatherDataSlice.reducer;

// Selectors
export const selectedTempUnit = (state: RootState) =>
  state.weatherData.temperatureUnit;
export const selectCity = (state: RootState) => state.weatherData.city;
export const selectCountry = (state: RootState) => state.weatherData.country;
export const selectOffsetTime = (state: RootState) =>
  state.weatherData.cityOffsetTime;
export const selectWeatherData = (state: RootState) => state.weatherData.data;
export const selectWeatherStatus = (state: RootState) =>
  state.weatherData.status;
export const selectWeatherError = (state: RootState) => state.weatherData.error;
