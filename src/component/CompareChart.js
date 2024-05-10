import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Comparechart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['이전 진단 결과', '최근 진단 결과'],
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#00C7E2',
              '#FF7DA8',
            ],
            borderColor: [
              '#00C7E2',
              '#FF7DA8',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }, [data]);

  return <canvas ref={chartRef}/>; 
};

export default Comparechart;