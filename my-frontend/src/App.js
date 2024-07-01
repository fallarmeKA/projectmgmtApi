import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashPage from './pages/DashPage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import ReportPage from './pages/ReportPage';
import TimeTablePage from './pages/TimeTablePage';
import MyTaskPage from './pages/MyTaskPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/timetable" element={<TimeTablePage />} />
      <Route path="/tasks" element={<MyTaskPage />} />
      <Route path="/dashboard" element={<DashPage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="/mytask" element={<MyTaskPage />} />
    </Routes>
  );
}

export default App;
