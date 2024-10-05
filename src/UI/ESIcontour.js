import React from 'react';
import Plot from 'react-plotly.js';

const ESIPlot = () => {
  // Constants
  const F_earth = 1.0; // Normalize solar flux at Earth
  const R_earth = 1.0; // Earth radius in Earth radii

  // Generate logarithmic ranges for r and f from 10^-3 to 10^3
  const r = Array.from({ length: 1500 }, (_, i) => Math.pow(10, (i / 1500) * 6 - 3)); // Range from 10^-3 to 10^3
  const f = Array.from({ length: 1500 }, (_, i) => Math.pow(10, (i / 1500) * 6 - 3)); // Range from 10^-3 to 10^3

  // Create meshgrid for ESI
  const ESI = [];
  
  for (let i = 0; i < r.length; i++) {
    const row = [];
    for (let j = 0; j < f.length; j++) {
      const R_val = r[i];
      const F_val = f[j];
      const esi_val = 1 - Math.sqrt(0.5 * (
        Math.pow((F_val - F_earth) / (F_val + F_earth), 2) +
        Math.pow((R_val - R_earth) / (R_val + R_earth), 2)
      ));
      row.push(esi_val);
    }
    ESI.push(row);
  }

  return (
    <div>
      <Plot
        data={[
          {
            z: ESI,
            x: r,
            y: f,
            type: 'contour',
            colorscale: 'Viridis', // Red to blue color scale
            colorbar: {
              title: {
                text: 'Earth Similarity Index (ESI)',
                font: {
                  color: 'white', // Change color bar title font to white
                },
              },
              tickfont: {
                color: 'white', // Change color bar tick labels to white
              },
            },
          },
        ]}
        layout={{
          title: {
            text: 'Earth Similarity Index (ESI)',
            font: {
              color: 'white', // Change title text color to white
            },
          },
          xaxis: {
            title: {
              text: 'Stellar Flux ($F/F_{E}$)',
              font: {
                color: 'white', // Change x-axis title color to white
              },
            },
            type: 'log',
            range: [-3, 3], // Set the range for x-axis from 10^-3 to 10^3
            tickfont: {
              color: 'white', // Change x-axis tick label color to white
            },
          },
          yaxis: {
            title: {
              text: 'Planet Radius ($R/R_{E}$)',
              font: {
                color: 'white', // Change y-axis title color to white
              },
            },
            type: 'log',
            range: [-3, 3], // Set the range for y-axis from 10^-3 to 10^3
            tickfont: {
              color: 'white', // Change y-axis tick label color to white
            },
          },
          paper_bgcolor: 'rgba(0,0,0,0)', // Set paper background to transparent
          plot_bgcolor: 'rgba(0,0,0,0)', // Set plot background to transparent
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ESIPlot;
