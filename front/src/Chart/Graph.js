import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { BarController, LinearScale, CategoryScale } from "chart.js";
import axios from "axios";

// 컴포넌트 및 스케일 등록
Chart.register(BarController, LinearScale, CategoryScale);

const GraphComponent = () => {
  const chartRef = useRef(null);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.124:8081/mqtt/plcdata`
        );
        console.log(response.data);
        setDataset(response.data[0].payload.Wrapper.find());
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataset.length > 0 && chartRef.current) {
      const no1ActionValue = dataset.find(
        (item) => item.name === "No1_Action"
      )?.value;
      const no2ActionValue = dataset.find(
        (item) => item.name === "No2_Action"
      )?.value;
      const no3ReadyValue = dataset.find(
        (item) => item.name === "No3Ready"
      )?.value;

      new Chart(chartRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Actions"],
          datasets: [
            {
              label: "No.1 Action",
              data: [no1ActionValue ? 1 : 0],
              backgroundColor: no1ActionValue ? "green" : "red",
              stack: "Stack",
            },
            {
              label: "No.2 Action",
              data: [no2ActionValue ? 1 : 0],
              backgroundColor: no2ActionValue ? "blue" : "yellow",
              stack: "Stack",
            },
            {
              label: "No3Ready",
              data: [no3ReadyValue ? 1 : 0],
              backgroundColor: no3ReadyValue ? "purple" : "orange",
              stack: "Stack",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              maxTicksLimit: 10,
              stepSize: 0.5,
              max: 3,
            },
          },
        },
      });
    }
  }, [dataset]);

  return <canvas ref={chartRef} />;
};

export default GraphComponent;
