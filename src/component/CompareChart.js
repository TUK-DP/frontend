import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

const Comparechart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(chartRef.current, {
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
      options: {
        plugins: {
          legend: {
            display: false, 
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 20,
              }
            }
          },
          y: {
            min:0,
            max:32,
            ticks: {
              font: {
                size: 15,
              },
            },
          }
        }
      }
    });

    setChartInstance(newChartInstance);
  }, [data]);

  return <canvas ref={chartRef} style={{marginBottom:"2rem",font:"20px", width:"100%"}}/>; 
};

export default Comparechart;