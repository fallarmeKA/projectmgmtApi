import React from 'react';
import { Link } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import '../styles/DashPage.css'; 

const DashPage = () => {
  const taskData = {
    labels: ['Incomplete', 'Complete'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#d3d3d3', '#00ff00'],
      },
    ],
  };

  const projectData = {
    labels: ['Incomplete', 'Complete'],
    datasets: [
      {
        data: [22, 48],
        backgroundColor: ['#ffa500', '#00ff00'],
      },
    ],
  };

  const barData = {
    labels: ['Initiate', 'Plan', 'Design', 'Test', 'Exit'],
    datasets: [
      {
        label: '# of Tasks by Project Phase',
        data: [1, 2, 4, 3, 2],
        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#8b4513'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>TITLE</h2>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/timetable">Time Table</Link></li>
          <li><Link to="/mytask">My Task</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar"></div>
            <div className="user-name">user</div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
        <div className="charts">
          <div className="chart">
            <h2>Progress of Tasks</h2>
            <Doughnut data={taskData} />
          </div>
          <div className="chart">
            <h2>Time Table</h2>
            {/* Add your time table chart here */}
          </div>
          <div className="chart">
            <h2>Progress of Projects</h2>
            <Doughnut data={projectData} />
          </div>
          <div className="chart">
            <h2># of Tasks by Project Phase</h2>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashPage;
