import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import '../../src/css/dash.css';

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
    labels: ["지연시간", "1호기", "2호기", "3호기", "빨간색", "하얀색"],
    datasets: [
      {
        label: "Data",
        data: [0],
        backgroundColor: ["grey", "blue", "green", "purple", "red", "white"],
      },
    ],
  });
  const [colorSensorTrueValue, setColorSensorTrueValue] = useState(0);
  const [colorSensorFalseValue, setColorSensorFalseValue] = useState(0);

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        display: true,
        ticks: {
          callback: function (value, index, values) {
            return index + 1;
          },
        },
        grid: {
          display: false,
        },
      },

      y: {
        display: true,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage.Wrapper) {
        // Get the values for each tagId
        const tag14Value =
          receivedMessage.Wrapper.find((item) => item.tagId === "14")?.value ||
          -1;
        const tag15Value =
          receivedMessage.Wrapper.find((item) => item.tagId === "15")?.value ||
          -1;
        const tag16Value =
          receivedMessage.Wrapper.find((item) => item.tagId === "16")?.value ||
          -1;
        const tag17Value =
          receivedMessage.Wrapper.find((item) => item.tagId === "17")?.value ||
          -1;

        if (
          receivedMessage.Wrapper.some(
            (item) => item.tagId === "39" && item.value
          )
        )
          setColorSensorTrueValue((prev) => prev + 1);

        if (
          receivedMessage.Wrapper.some(
            (item) => item.tagId === "39" && !item.value
          )
        )
          setColorSensorFalseValue((prev) => prev + 1);

        setChartData((prevData) => {
          return {
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: [
                  tag14Value,
                  tag15Value,
                  tag16Value,
                  tag17Value,
                  colorSensorTrueValue,
                  colorSensorFalseValue,
                ],
              },
            ],
          };
        });
      }
    });

    return () => {
      ws.close();
    };
  }, []);
  return (
    <div>
      <Bar data={chartData} options={options} style={{ width: '100%'}}/>
    </div>
  );
}

export default GraphComponent;
