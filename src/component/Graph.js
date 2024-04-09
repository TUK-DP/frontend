import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const Graph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [17, 15],
          backgroundColor: [
            'rgba(46, 204, 113, 1)',
            'rgba(231, 76, 60, 1)'
          ],
          borderColor: [
            'rgba(255, 255, 255 ,1)',
            'rgba(255, 255, 255 ,1)'
          ],
          borderWidth: 5,
          circumference: 180,
          rotation: 270,
          cutout: "80%"
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
          doughnutlabel: {
            labels: [
              {
                text: '32%',
                font: {
                  size: '20'
                },
                color: '#000',
                position: 'center'
              }
            ]
          }
        }
      }
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <canvas ref={chartRef} style={{ width: '100%' }}/>; 
};

export default Graph;
