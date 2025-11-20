import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './ChartVisualizer.css';

export default function ChartVisualizer({ parsedData }) {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (parsedData.length > 0) {
      setColumns(Object.keys(parsedData[0]));
    }
  }, [parsedData]);

  const chartData = {
    labels: parsedData.map(row => row[xAxis]),
    datasets: [
      {
        label: `${yAxis} vs ${xAxis}`,
        data: parsedData.map(row => row[yAxis]),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const downloadChart = () => {
    const canvas = document.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    a.download = 'chart.png';
    a.click();
  };

  return (
    <div className="chart-container">
      <h2>Select Columns to Visualize</h2>
      <div className="dropdowns">
        <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
          <option value="">Select X-axis</option>
          {columns.map(col => <option key={col}>{col}</option>)}
        </select>
        <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
          <option value="">Select Y-axis</option>
          {columns.map(col => <option key={col}>{col}</option>)}
        </select>
      </div>

      {xAxis && yAxis && (
        <>
          <Line data={chartData} />
          <button className="download-btn" onClick={downloadChart}>⬇️ Download Chart</button>
        </>
      )}
    </div>
  );
}
