import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Graph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      datasets: [{
        label: 'Weekly Sales',
        data: [17, 15],
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1,
        cutout: "90%",
        circumference: 180,
        rotation: 270
      }]
    };

    const gaugeChartText = {
      id: 'gaugeChartText',
      afterDatasetsDraw(chart, args, pluginOptions){
        const{ctx, data, chartArea: {top, bottom, left, right, width, height}, scales: {r} } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.fillStyle = '#666';

        ctx.font = '120px sans-serif';
        ctx.textAlign='center';
        ctx.textBaseLine = 'bottom';
        ctx.fillText('850',xCoor, yCoor);
      }
    };

    const config = {
      type: 'doughnut',
      data,
      options: {
        aspectRatio: 1.5,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
        }
      },
      plugins: [gaugeChartText]
    };

    const chartInstance = new Chart(chartRef.current, config);

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default Graph;
