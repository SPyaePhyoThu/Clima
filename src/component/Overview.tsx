import React, { useState } from "react";
import classes from "./css/Overview.module.css";
import { Chart } from "chart.js/auto";

import { CategoryScale, defaults } from "chart.js";
import LineChart from "./LineChart";

Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface data {
  time: string;
  value: number;
  unit: string;
}

interface OverviewProps {
  dataObj: {
    windDataFromApi: data[];
    TempDataFromApi: data[];
    preciDataFromApi: data[];
  };
}

const Overview: React.FC<OverviewProps> = (props) => {
  const [selectedData, setSelectedData] = useState<data[]>(
    props.dataObj.windDataFromApi
  );
  const [selectedButton, setSelectedButton] = useState<string>("Wind");

  return (
    <div className={classes.overviewSection}>
      <h3 className={classes.heading}>Overview</h3>
      <div className={classes.chartSection}>
        <div className={classes.bar}>
          <button
            onClick={() => {
              setSelectedButton("Temperature");
              setSelectedData(props.dataObj.TempDataFromApi);
            }}
            className={
              selectedButton === "Temperature"
                ? classes.selectedButton
                : classes.button
            }
          >
            Temperature
          </button>
          <button
            onClick={() => {
              setSelectedButton("Wind");
              setSelectedData(props.dataObj.windDataFromApi);
            }}
            className={
              selectedButton === "Wind"
                ? classes.selectedButton
                : classes.button
            }
          >
            Wind
          </button>
          <button
            onClick={() => {
              setSelectedButton("Precipitation");
              setSelectedData(props.dataObj.preciDataFromApi);
            }}
            className={
              selectedButton === "Precipitation"
                ? classes.selectedButton
                : classes.button
            }
          >
            Precipitation
          </button>
        </div>
        <div className={classes.chartBox}>
          <LineChart dataArray={selectedData} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
