import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

const RiskAssessmentChart = () => {
  const data = {
    datasets: [{
      data: [60, 25, 10, 5],
      backgroundColor: [
        '#4CAF50',  // Green colour
        '#4CAF50',  // Green colour
        '#F44336',  // Red colour
        '#FFEB3B',  // Yellow colur
      ],
      borderWidth: 0
    }]
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    responsive: true,
    maintainAspectRatio: true
  };

  const plugins = [{
    id: 'centerText',
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      
      const text = '9659';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      
      ctx.fillText(text, textX, textY);
      ctx.save();
      
      ctx.font = `${fontSize * 0.6}em sans-serif`;
      const subText = 'Total';
      const subTextX = Math.round((width - ctx.measureText(subText).width) / 2);
      const subTextY = height / 2 + fontSize * 24;
      
      ctx.fillText(subText, subTextX, subTextY);
    }
  }];

  return (
    <div style={{ width: '80px', height: '80px' }}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
};

export default RiskAssessmentChart;
