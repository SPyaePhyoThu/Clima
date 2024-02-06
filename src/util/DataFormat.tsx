import ClearDay from "../ui/ClearDay";
import Cloudy from "../ui/Cloudy";
import Drizzle from "../ui/Drizzle";
import Fog from "../ui/Fog";
import Sunny from "../ui/Sunny";
import Rainny from "../ui/Rainny";
import HeavyRain from "../ui/HeavyRain";
import Snow from "../ui/Snow";
import PartlyCloudy from "../ui/PartlyCloudy";
import HeavySnow from "../ui/HeavySnow";
import IcePellet from "../ui/IcePellets";
import Thunderstorm from "../ui/ThunderStorm";
import Unknown from "../ui/UnknownWeather";

import { transformToDayOfTheWeek } from "./DateFormat";

// get user location using Geolocation API
export const getUserLocation = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude},${longitude}`);
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Sorry , we can not find your location."));
    }
  });
};

export const reverseGeoCode = async (lat: string, long: string) => {
  const result = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${process.env.REACT_APP_GEOAPIFI_API_KEY}`
  );
  const data = await result.json();
  const city = data.features[0].properties.city;
  const country = data.features[0].properties.country;

  return { city, country };
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

//data for WeatherSection
export const formatDataForWeatherSection = (
  data: any[],
  offsetTime: number
) => {
  const weatherCode = data[0].timelines.hourly[1].values.weatherCode;

  const sunriseTime = formatHourToLocale(
    data[1].timelines.daily[0].values.sunriseTime,
    offsetTime
  );
  const sunsetTime = formatHourToLocale(
    data[1].timelines.daily[0].values.sunsetTime,
    offsetTime
  );

  return { weatherCode, sunriseTime, sunsetTime };
};

//data for WeatherBar
interface weatherBartype {
  temperatureApparentAvg: number;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
}
export const formatDataForWeatherBar = (data: weatherBartype) => {
  return {
    apparentTemp: data.temperatureApparentAvg,
    actualTemp: data.temperatureAvg,
    maxTemp: data.temperatureMax,
    minTemp: data.temperatureMin,
  };
};

//data for weatherhighlight section
interface weatherHighlightType {
  humidityAvg: number;
  precipitationProbabilityAvg: number;
  uvIndexAvg: number;
  visibilityAvg: number;
  windGustAvg: number;
  windDirectionAvg: number;
  sunriseTime: string;
  sunsetTime: string;
}

export const formatDataForHighllight = (data: weatherHighlightType) => {
  return {
    humidity: data.humidityAvg,
    precipitationProbability: data.precipitationProbabilityAvg,
    uvIndex: data.uvIndexAvg,
    visibility: data.visibilityAvg,
    windGust: data.windGustAvg,
    windDirection: data.windDirectionAvg,
    sunriseTime: data.sunriseTime,
    sunsetTime: data.sunsetTime,
  };
};

export const uvIndexlevelChecker = (uvIndex: number): string => {
  let uvIndexLevel = "";
  switch (true) {
    case uvIndex >= 0 && uvIndex <= 2:
      uvIndexLevel = "Low";
      break;
    case uvIndex >= 3 && uvIndex <= 5:
      uvIndexLevel = "Moderate";
      break;
    case uvIndex >= 6 && uvIndex <= 7:
      uvIndexLevel = "High";
      break;
    case uvIndex >= 8 && uvIndex <= 10:
      uvIndexLevel = "Very High";
      break;
    case uvIndex >= 11:
      uvIndexLevel = "Extreme";
      break;
    default:
      uvIndexLevel = "Unknown";
  }

  return uvIndexLevel;
};

export const formatTimeToLocale = (time: string, offsetTime: number) => {
  const hour =
    new Date(time).getUTCHours() + offsetTime > 24
      ? new Date(time).getUTCHours() + offsetTime - 24
      : new Date(time).getUTCHours() + offsetTime < 0
      ? new Date(time).getUTCHours() + offsetTime + 24
      : new Date(time).getUTCHours() + offsetTime;

  const minute = new Date(time).getUTCMinutes();

  const totalMinute = (hour % 1) * 60 + minute;

  const correctMinute = totalMinute % 60;

  const correctedHour =
    totalMinute > 60 ? Math.floor(hour) + 1 : Math.floor(hour);

  return `${correctedHour}h${correctMinute}m`;
};

//formatting data for houly forecast Section
export const checkTimeForHourlyData = (time: string) => {
  const dateObject = new Date(time);
  return dateObject.getHours();
};
export const formatHourToLocale = (time: string, offsetTime: number) => {
  const hour =
    new Date(time).getUTCHours() + offsetTime > 24
      ? new Date(time).getUTCHours() + offsetTime - 24
      : new Date(time).getUTCHours() + offsetTime < 0
      ? new Date(time).getUTCHours() + offsetTime + 24
      : new Date(time).getUTCHours() + offsetTime;

  return `${hour}`;
};

export const checkNightHourWeather = (
  sunriseTime: string,
  sunsetTime: string,
  time: string,
  offsetTime: number
) => {
  const hour = formatHourToLocale(time, offsetTime);

  const result = +hour <= +sunriseTime || +hour >= +sunsetTime;

  return result;
};

export const formatDataForHourlyForecast = (
  array1: any[],
  array2: any[],
  array3: any[],
  offsetTime: number
) => {
  const currentHour = Math.floor(
    +formatHourToLocale(array1[0].time, offsetTime)
  );

  const numberOfremainingHours = 24 - currentHour;
  const sunriseTime = formatHourToLocale(
    array2[0].values.sunriseTime,
    offsetTime
  );
  const sunsetTime = formatHourToLocale(
    array2[0].values.sunsetTime,
    offsetTime
  );
  const forecastData = array1.slice(1, numberOfremainingHours);
  const previousData = array3.slice(-currentHour - 1);
  const hourlyDataforToday = previousData.concat(forecastData);

  return { hourlyDataforToday, sunriseTime, sunsetTime };
};

export const weatherCodeToweather = (
  code: number,
  style: React.CSSProperties
) => {
  let weather = { text: "", icon: <Unknown style={style} /> };
  switch (code) {
    case 0:
      weather.icon = <Unknown style={style} />;
      weather.text = "Unknown";
      break;
    case 1000:
      weather.icon = <Sunny style={style} />;
      weather.text = "Sunny";
      break;
    case 1100:
      weather.icon = <ClearDay style={style} />;
      weather.text = "Mostly Clear";
      break;
    case 1101:
      weather.icon = <PartlyCloudy style={style} />;
      weather.text = "Partly Cloudy";
      break;
    case 1102:
      weather.icon = <Cloudy style={style} />;
      weather.text = "Mostly Cloudy";
      break;
    case 1001:
      weather.icon = <Cloudy style={style} />;
      weather.text = "Cloudy";
      break;
    case 2000:
      weather.icon = <Fog style={style} />;
      weather.text = "Fog";
      break;
    case 2100:
      weather.icon = <Fog style={style} />;
      weather.text = "Light Fog";
      break;
    case 4000:
      weather.icon = <Drizzle style={style} />;
      weather.text = "Drizzle";
      break;
    case 4001:
      weather.icon = <Rainny style={style} />;
      weather.text = "Rain";
      break;
    case 4200:
      weather.icon = <Drizzle style={style} />;
      weather.text = "Light Rain";
      break;
    case 4201:
      weather.icon = <HeavyRain style={style} />;
      weather.text = "Heavy Rain";
      break;
    case 5000:
      weather.icon = <Snow style={style} />;
      weather.text = "Snow";
      break;
    case 5001:
      weather.icon = <Snow style={style} />;
      weather.text = "Flurries";
      break;
    case 5100:
      weather.icon = <Snow style={style} />;
      weather.text = "Light Snow";
      break;
    case 5101:
      weather.icon = <HeavySnow style={style} />;
      weather.text = "Heavy Snow";
      break;
    case 6000:
      weather.icon = <Drizzle style={style} />;
      weather.text = "Freezing Drizzle";
      break;
    case 6001:
      weather.icon = <Rainny style={style} />;
      weather.text = "Freezing Rain";
      break;
    case 6200:
      weather.icon = <Rainny style={style} />;
      weather.text = "Rain";
      break;
    case 6201:
      weather.icon = <Rainny style={style} />;
      weather.text = "Rain";
      break;
    case 7000:
      weather.icon = <IcePellet style={style} />;
      weather.text = "Icepellets";
      break;
    case 7101:
      weather.icon = <IcePellet style={style} />;
      weather.text = "Icepellets";
      break;
    case 7102:
      weather.icon = <IcePellet style={style} />;
      weather.text = "Icepellets";
      break;
    case 8000:
      weather.icon = <Thunderstorm style={style} />;
      weather.text = "Thunderstorm";
      break;
    default:
      weather.icon = <Unknown style={style} />;
      weather.text = "unknown";
  }

  return weather;
};

//format data for chart

export const formatDataForChart = (
  dataArray: any[],
  valueName: string,
  unit: string,
  type: string,
  tempUnit: string,
  offsetTime: number
) => {
  const data = dataArray.map((data) => {
    let time;
    if (type === "hourly") {
      time = `${
        `${Number(formatHourToLocale(data.time, Math.floor(offsetTime)))}` ===
        "24"
          ? "00"
          : Number(formatHourToLocale(data.time, Math.floor(offsetTime))) < 0
          ? Number(formatHourToLocale(data.time, Math.floor(offsetTime))) + 24
          : Number(formatHourToLocale(data.time, Math.floor(offsetTime))) > 24
          ? Number(formatHourToLocale(data.time, Math.floor(offsetTime))) - 24
          : formatHourToLocale(data.time, Math.floor(offsetTime))
      }:00`;
      // `${
      //   formatHourToLocale(data.time, offsetTime) === "24"
      //     ? "00"
      //     : formatHourToLocale(data.time, offsetTime)
      // }:00`;
    } else {
      time = transformToDayOfTheWeek(data.time);
    }

    let value;
    if (
      (tempUnit === "Celsius" &&
        valueName === "temperatureAvg" &&
        unit === "°C") ||
      (tempUnit === "Celsius" && valueName === "temperature" && unit === "°C")
    ) {
      value = fahrenheitToCelsius(data.values[valueName]);
      unit = "°C";
    } else if (
      (tempUnit === "Farenheit" &&
        valueName === "temperatureAvg" &&
        unit === "°C") ||
      (tempUnit === "Farenheit" && valueName === "temperature" && unit === "°C")
    ) {
      value = data.values[valueName];
      unit = "°F";
    } else {
      value = data.values[valueName];
    }

    return { time, value, unit };
  });

  return data;
};

//format data for nextDataSection
interface dataArray {
  iconsArray: any[];
  nextDaysData: any[];
  WeatherDataForNextDays: any[];
}

export const formatDataForNextDays = (props: dataArray) => {
  const { nextDaysData, WeatherDataForNextDays, iconsArray } = props;

  const result = nextDaysData.map((day, index) => {
    const data = WeatherDataForNextDays[index];
    const weatherCode = data.values.weatherCodeMax;
    const temperature = data.values.temperatureAvg;

    const dataTemplateArray = [
      {
        name: "Feels like",
        icon: iconsArray[0],
        value: data.values.temperatureApparentAvg,
      },
      {
        name: "Sunrise",
        icon: iconsArray[1],
        value: data.values.sunriseTime,
      },
      {
        name: "Sunset",
        icon: iconsArray[2],
        value: data.values.sunsetTime,
      },
      {
        name: "Humidity",
        icon: iconsArray[3],
        value: `${data.values.humidityAvg} %`,
      },
      {
        name: "Visibility",
        icon: iconsArray[4],
        value: `${data.values.visibilityAvg} km`,
      },
      {
        name: "UV Index",
        icon: iconsArray[5],
        value: `${data.values.uvIndexAvg} - ${uvIndexlevelChecker(
          data.values.uvIndexAvg
        )}`,
      },
      {
        name: "Precipitation",
        icon: iconsArray[6],
        value: `${data.values.precipitationProbabilityAvg} %`,
      },
      {
        name: "Wind",
        icon: iconsArray[7],
        value: `${data.values.windGustAvg} mph`,
      },
    ];

    return {
      weekOfTheDay: day.weekOfTheDay,
      date: day.date,
      dataArray: dataTemplateArray,
      weatherCode,
      temperature,
    };
  });

  return result;
};
