import React from 'react';
import '../styles/TimeTablePage.css'; // Updated import path

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
        <h1>Time Table</h1>
        <p>Welcome to your time table</p>
        <div className="timetable">
          <div className="timetable-section">
            <h2>Project</h2>
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>1st Week</th>
                  <th>2nd Week</th>
                  <th>3rd Week</th>
                  <th>4th Week</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.name}</td>
                    {project.timeline.map((day, i) => (
                      <td key={i} className={`day-${day}`}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="timetable-section">
            <h2>Tasks</h2>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>1st Week</th>
                  <th>2nd Week</th>
                  <th>3rd Week</th>
                  <th>4th Week</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    {task.timeline.map((day, i) => (
                      <td key={i} className={`day-${day}`}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTablePage;
