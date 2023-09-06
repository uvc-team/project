import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
const GraphComponent = () => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.124:8081/mqtt/plcdata`);
        console.log(response.data);
        setDataset(response.data[0].payload.Wrapper);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Bar 
        data={{
          labels: ['No.1 Action', 'No.2 Action', 'No.3 Ready'],
          datasets: [{
            label: '# of On/Off',
            data: [
              dataset.find(item => item.name === 'No1_Action')?.value ? 1 : -1,
              dataset.find(item => item.name === 'No2_Action')?.value ? 1 : -1,
              dataset.find(item => item.name === 'No3Ready')?.value ? 1 : -1
            ],
            backgroundColor: [
              dataset.find(item => item.name === 'No1_Action')?.value ? 'green' : 'red',
              dataset.find(item => item.name === 'No2_Action')?.value ? 'green' : 'red',
              dataset.find(item => item.name === 'No3Ready')?.value ? 'green' : 'red'
            ],
          }]
        }}
        options={{
          scales: {
            y: {   
              ticks: {
                beginAtZero:false,
                maxTicksLimit:10,
                stepSize:.5,
                min:-1,
                max:1
              }
            }
          }
        }}
      />
    </div>
 );
};

export default GraphComponent;