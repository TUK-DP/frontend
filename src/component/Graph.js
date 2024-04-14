import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Graph = ({ number }) => { // number prop 추가
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      datasets: [{
        label: 'Weekly Sales',
        data: [number, 32 - number], // number prop을 사용하여 데이터 동적으로 설정
        backgroundColor: [
          '#e15449',
          'rgba(0, 0, 0, 0.2)'
        ],
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
        ctx.fillText(`${number}`, xCoor, yCoor); // number prop을 사용하여 텍스트 동적으로 설정
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
      plugins: [gaugeChartText] // gaugeChartText 플러그인 추가
    };

    const chartInstance = new Chart(chartRef.current, config);

    return () => {
      chartInstance.destroy();
    };
  }, [number]); // number prop을 의존성 배열에 추가하여 변경될 때마다 useEffect 재실행

  return <canvas ref={chartRef} style={{width:"90%"}}/>;
};

export default Graph;
