import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalUploads: 0 });

  useEffect(() => {
    axios.get('/api/admin/stats').then(res => setStats(res.data));
    axios.get('/api/admin/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div className="admin-container">
      <h2>🛠 Admin Dashboard</h2>
      <div className="stats">
        <div className="stat-box">👥 Total Users: {stats.totalUsers}</div>
        <div className="stat-box">📊 Total Uploads: {stats.totalUploads}</div>
      </div>
      <h3>Manage Users</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => {
                  axios.delete(`/api/admin/user/${u._id}`).then(() => {
                    setUsers(users.filter(user => user._id !== u._id));
                  });
                }}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
