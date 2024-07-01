import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/ProjectPage.css'; // Updated import path

const ProjectPage = ({ projects }) => {
  const [projectList, setProjectList] = useState(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', manager: '', deadline: new Date() });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewProject({ ...newProject, deadline: date });
  };

  const handleAddProject = () => {
    setProjectList([...projectList, { ...newProject, id: projectList.length + 1 }]);
    setIsModalOpen(false);
    setNewProject({ name: '', manager: '', deadline: new Date() });
  };

  return (
    <div className="project-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Projects</h2>
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
        <h1>Projects</h1>
        <p>Welcome to your projects</p>
        <div className="buttons">
          <button className="add-project" onClick={() => setIsModalOpen(true)}>+ Add Project</button>
          <button className="add-deliverables">+ Add Deliverables</button>
        </div>
        <div className="project-table">
          {projectList.map((projectGroup, index) => (
            <div key={index} className="project-group">
              <h2>PROJECT</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Project Manager</th>
                    <th>Deadline</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectGroup.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.manager}</td>
                      <td>{project.deadline.toLocaleDateString()}</td>
                      <td className={project.status.toLowerCase()}>{project.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add new project</h2>
            <label>Name</label>
            <input type="text" name="name" value={newProject.name} onChange={handleInputChange} />
            <label>Project Manager</label>
            <input type="text" name="manager" value={newProject.manager} onChange={handleInputChange} />
            <label>Deadline</label>
            <DatePicker selected={newProject.deadline} onChange={handleDateChange} />
            <button onClick={handleAddProject}>Add Project</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
