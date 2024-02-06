import classes from "./css/Overview.module.css";
import { Line } from "react-chartjs-2";
interface data {
  time: string;
  value: number;
  unit: string;
}
interface ChartProps {
  dataArray: data[];
}

const Chart: React.FC<ChartProps> = (props) => {
  const deviceWidth = window.innerWidth;
  return (
    <Line
      className={classes.chart}
      data={{
        labels: props.dataArray.map((data) => data.time),
        datasets: [
          {
            label: "%",
            data: props.dataArray.map((data) => data.value),
            backgroundColor: "#ffffff",
            borderColor: "#002658",
            borderWidth: 2,
            cubicInterpolationMode: "monotone",
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: "transparent",
            },
            ticks: {
              color: "#002658",
              font: {
                size: deviceWidth > 500 ? 13 : 11,
                weight: 600,
                family: "Quicksand",
              },
              padding: deviceWidth > 500 ? 30 : 10,
            },
          },
          y: {
            grid: {
              color: "white",
            },
            ticks: {
              color: "#002658",
              maxTicksLimit: 6,
              stepSize: 1,
              font: {
                size: deviceWidth > 500 ? 13 : 11,
                weight: 600,
                family: "Quicksand",
              },
              padding: deviceWidth > 500 ? 30 : 10,
              callback: function (value) {
                return value + props.dataArray[0].unit;
              },
            },
          },
        },
      }}
    ></Line>
  );
};
export default Chart;
