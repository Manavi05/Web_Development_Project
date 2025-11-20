import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ParseExcel.css';

const ParseExcel = () => {
  const location = useLocation();
  const data = location.state?.data;

  // ✅ Store parsed data in localStorage for ChartVisualizer
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 1) {
      const headers = data[0];
      const rows = data.slice(1);
      const parsedObjects = rows.map(row =>
        headers.reduce((obj, header, i) => {
          obj[header] = row[i];
          return obj;
        }, {})
      );
      localStorage.setItem('parsedData', JSON.stringify(parsedObjects));
      console.log("✅ ParsedData saved to localStorage:", parsedObjects);
    }
  }, [data]);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data found. Please upload again.</div>;
  }

  return (
    <div className="parse-container">
      <h2>Parsed Excel Data</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {data[0].map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParseExcel;
