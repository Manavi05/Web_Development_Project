import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UploadExcel from './components/UploadExcel';
import ParseExcel from './components/ParseExcel';
import ChartVisualizer from './components/ChartVisualizer';
import History from './components/History';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <h2>👋 Welcome to Excel Analytics</h2>
      <p>Select an action from above to begin.</p>
    </div>
  );
}

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/register";
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  

  return (
    <div>
      <h1>📊 Excel Analytics Platform</h1>

      {!hideNav && isLoggedIn && (
        <nav className="navbar">
          <Link to="/upload">📤 Upload Excel</Link>
          <Link to="/history">📁 View History</Link>
          <Link to="/chart">📈 Visualize</Link>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              window.location.href = '/';
            }}
          >
            🚪 Logout
          </button>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadExcel />} />
        <Route path="/parse" element={<ParseExcel />} />
        <Route path="/chart" element={
          <ChartVisualizer parsedData={JSON.parse(localStorage.getItem('parsedData')) || []} />
        } />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
