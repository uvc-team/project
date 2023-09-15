import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function No3() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        type: "line",
        label: "MOTOR 1",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
      {
        type: "line",
        label: "MOTOR 2",
        data: [],
        borderColor: "rgba(192,75,192,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  });
  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          color: "white",
        },
      },
    },
  };
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.124:8081");

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);

      const normalizeValue = (value, minValue, maxValue) => {
        return ((value - minValue) / (maxValue - minValue)) * 100;
      };
      const [minTag21, maxTag21] = [0, 500000];
      const [minTag22, maxTag22] = [0, 18000000];

      if (receivedMessage.Wrapper) {
        const tag21 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "21"
        )?.value;
        const tag22 = receivedMessage.Wrapper.find(
          (item) => item.tagId === "22"
        )?.value;

        const normalizedTag21 = normalizeValue(tag21, minTag21, maxTag21);
        const normalizedTag22 = normalizeValue(tag22, minTag22, maxTag22);

        if (tag21 >= 1 || tag22 >= 1) {
          setChartData((prevData) => {
            return {
              ...prevData,
              labels: [...prevData.labels, new Date().toLocaleTimeString()],
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [...prevData.datasets[0].data, normalizedTag21],
                },
                {
                  ...prevData.datasets[1],
                  data: [...prevData.datasets[1].data, normalizedTag22],
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
      <Line data={chartData} options={options} width="750px" />
    </div>
  );
}

export default No3;
