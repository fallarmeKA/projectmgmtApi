import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashPage from './pages/DashPage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import ReportPage from './pages/ReportPage';
import TimeTablePage from './pages/TimeTablePage';
import TaskPage from './pages/TaskPage';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectPage projects={projects} />} />
        <Route path="/report" element={<ReportPage projects={projects} />} />
        <Route path="/timetable" element={<TimeTablePage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
