import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchAllWeatherData = createAsyncThunk(
  "weatherData/fetchWeatherData",
  async (location: string) => {
    try {
      const urls: string[] = [
        `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1h&units=imperial&apikey=${process.env.REACT_APP_TOMORROW_API_KEY}`,
        `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1d&units=imperial&apikey=${process.env.REACT_APP_TOMORROW_API_KEY}`,
        `https://api.tomorrow.io/v4/weather/history/recent?location=${location}&timesteps=1h&units=imperial&apikey=${process.env.REACT_APP_TOMORROW_API_KEY}`,
        `https://api.tomorrow.io/v4/weather/history/recent?location=${location}&timesteps=1d&units=imperial&apikey=${process.env.REACT_APP_TOMORROW_API_KEY}`,
      ];

      const responses = await Promise.all(urls.map((url) => fetch(url)));

      if (responses.some((response) => !response.ok)) {
        throw new Error("Could not fetch weather data");
      }

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      return data;
    } catch (error: any) {
      throw new Error(`Error fetching weather data: ${error.message}`);
    }
  }
);
