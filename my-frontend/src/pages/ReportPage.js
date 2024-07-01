import React, { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for chart.js v3
import '../styles/ReportPage.css'; // Updated import path

const ReportPage = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const handleProjectChange = (event) => {
    const projectName = event.target.value;
    const project = projects.find(p => p.name === projectName);
    setSelectedProject(project);
  };

  const taskData = {
    labels: ['Incomplete', 'Complete'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#d3d3d3', '#00ff00'],
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
    <div className="report-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>TITLE</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Time Table</li>
          <li>My Tasks</li>
          <li>Reports</li>
          <li>Logout</li>
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar"></div>
            <div className="user-name">user</div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <h1>Reports</h1>
        <p>Welcome to your reports</p>
        <div className="project-selector">
          <label htmlFor="project-select">Project Name</label>
          <select id="project-select" onChange={handleProjectChange}>
            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="charts">
          <div className="chart">
            <h2>Project Status Dashboard</h2>
            <table>
              <thead>
                <tr>
                  <th>Activities</th>
                  <th>Not Started</th>
                  <th>In Progress</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {/* Add rows dynamically based on selected project */}
              </tbody>
            </table>
          </div>
          <div className="chart">
            <h2>Project Phase % Completed</h2>
            <Doughnut data={taskData} />
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

export default ReportPage;
