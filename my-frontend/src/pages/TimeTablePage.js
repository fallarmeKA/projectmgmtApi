import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/TimeTablePage.css'; // Adjust the import path as needed

const TimeTablePage = () => {
  const projects = [
    { name: 'Project 1', timeline: [1, 2, 3, 4, 5, 6, 7] },
    { name: 'Project 2', timeline: [2, 3, 4, 5, 6, 7, 8] },
    { name: 'Project 3', timeline: [3, 4, 5, 6, 7, 8, 9] },
    { name: 'Project 4', timeline: [4, 5, 6, 7, 8, 9, 10] },
    { name: 'Project 5', timeline: [5, 6, 7, 8, 9, 10, 11] },
    { name: 'Project 6', timeline: [6, 7, 8, 9, 10, 11, 12] },
  ];

  const tasks = [
    { name: 'Task 1', timeline: [1, 2, 3, 4, 5, 6, 7] },
    { name: 'Task 2', timeline: [2, 3, 4, 5, 6, 7, 8] },
    { name: 'Task 3', timeline: [3, 4, 5, 6, 7, 8, 9] },
    { name: 'Task 4', timeline: [4, 5, 6, 7, 8, 9, 10] },
    { name: 'Task 5', timeline: [5, 6, 7, 8, 9, 10, 11] },
    { name: 'Task 6', timeline: [6, 7, 8, 9, 10, 11, 12] },
  ];

  return (
    <div className="timetable-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Time Table</h2>
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
        <h1>Time Table</h1>
        <p>Welcome to the time table page</p>
        <div className="timeline">
          <h2>Projects</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <span>{project.name}</span>
                <span>{project.timeline.join(', ')}</span>
              </li>
            ))}
          </ul>
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <span>{task.name}</span>
                <span>{task.timeline.join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeTablePage;
