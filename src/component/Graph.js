import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Graph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Done', 'In Progress', 'Todo'],
        datasets: [
          {
            label: '개수',
            data: data,
            backgroundColor: [
              '#FF6A6A',
              '#008FDF',
              '#FFB931',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font:{
                size: 24
              },
              padding: 25,
            },
            align: 'center',
          },
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        maintainAspectRatio: false 
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} style={{ width: '100%' }} />; 
};

export default Graph;