import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`/api/excel/history/${userId}`)
      .then(res => setHistory(res.data))
      .catch(err => console.error('Failed to fetch history:', err));
  }, []);

  return (
    <div className="history-container">
      <h2>📂 Upload History</h2>
      {history.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.filename}</td>
                <td>{new Date(entry.uploadedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => {
                    localStorage.setItem('fileId', entry._id);
                    window.location.href = '/parse';
                  }}>
                    📊 Analyze
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
