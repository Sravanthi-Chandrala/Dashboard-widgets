import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CloudAccountsChart = () => {
  const data = {
    labels: ['Connected', 'Not Connected'],
    datasets: [
      {
        data: [1, 1], 
        backgroundColor: [
          'rgba(54, 162, 235, 1)', // Blue for Connected
          'rgba(54, 162, 235, 0.2)', // Light blue for Not Connected
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '70%',
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label} (${context.raw})`;
          }
        }
      }
    },
  };

  return (
    <div style={{ width: '100px', height: '100px' }}>
      <h2 style={{ textAlign: 'center' }}>2<br/>Total</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CloudAccountsChart;

