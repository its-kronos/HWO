import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);
// Chart options
const options = {
  plugins: {
    title: {
      display: false,
      text: 'Exoplanets Characterization',
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Start the y-axis at zero
    },
  },
};

export const ExoBarChart = ({ analytics }) => {
  const data = {
    labels: ['Characterizable', 'Non-Characterizable', 'Unknown'], // Labels for the categories
    datasets: [
      {
        label: 'Exoplanets',
        data: [
          analytics.characterizable.length,
          analytics.nonCharacterizable.length,
          analytics.unknown.length,
        ], // Example values for each category
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Color for Characterizable
          'rgba(255, 99, 132, 0.6)', // Color for Non-Characterizable
          'rgba(255, 206, 86, 0.6)', // Color for Unknown
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container" style={{ width: '100%', height: '400px' }}>
      <h2 style={{ textAlign: 'center' }}>Exoplanets Characterization</h2>
      <Bar 
        data={data} 
        options={options} 
        width={null} // Set width to null for percentage-based sizing
        height={null} // Set height to null for percentage-based sizing
      />
    </div>
  );
};
