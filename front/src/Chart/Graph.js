import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../../src/css/dash.css";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement
);

function GraphComponent() {
  const [chartData, setChartData] = useState({
    labels: ["지연시간", "1호기", "2호기", "3호기"],
    datasets: [
      {
        label: "Data",
        data: [],
        backgroundColor: ["grey", "blue", "green", "purple"],
      },
    ],
  });

  const [tag15Value, setTag15Value] = useState(0);

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        max: tag15Value,
        ticks: {
          callback: function (index) {
            return parseInt(Math.round(index), 10);
          },
          color: "white",
        },
        grid: {
          display: false,
        },
        startAtZero: true,
      },

      y: {
        barPercentage: 0.3,
        categoryPercentage: 0.3,
        ticks: {
          color: "white",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.88:8081");

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage && receivedMessage.Wrapper) {
        const tag1Value = receivedMessage.Wrapper.find(
          (item) => item.tagId === "1"
        );
        if (tag1Value) {
          // Get the values for each tagId
          const tag14 = receivedMessage.Wrapper.find(
            (item) => item.tagId === "14"
          )?.value;

          const tag15 = receivedMessage.Wrapper.find(
            (item) => item.tagId === "15"
          )?.value;
          setTag15Value(tag15);
          const tag16 = receivedMessage.Wrapper.find(
            (item) => item.tagId === "16"
          )?.value;
          const tag17 = receivedMessage.Wrapper.find(
            (item) => item.tagId === "17"
          )?.value;

          setChartData((prevData) => {
            return {
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [tag14, tag15, tag16, tag17],
                },
              ],
            };
          });
        }
      }
    });

    return () => {
      ws.close();
    };
  }, []);
  return (
    <div>
      <Bar
        data={chartData}
        options={options}
        height="120px"
        style={{ marginLeft: "15px", marginTop: "7px" }}
      />
    </div>
  );
}

export default GraphComponent;
