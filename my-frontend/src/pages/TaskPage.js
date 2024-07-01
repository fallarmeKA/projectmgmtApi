import React, { useState } from 'react';
import '../styles/TaskPage.css'; // Updated import path

const TaskPage = () => {
  const [ongoingTasks, setOngoingTasks] = useState([
    { id: 1, title: 'Title', description: 'Description', deadline: 'Deadline', status: 'Ongoing' },
  ]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '', status: 'Ongoing' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    setOngoingTasks([...ongoingTasks, { ...newTask, id: ongoingTasks.length + 1 }]);
    setIsModalOpen(false);
    setNewTask({ title: '', description: '', deadline: '', status: 'Ongoing' });
  };

  return (
    <div className="task-page">
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
        <h1>My Tasks</h1>
        <p>Welcome to your my tasks</p>
        <button className="add-task" onClick={() => setIsModalOpen(true)}>+ Add Task</button>
        <div className="tasks-container">
          <div className="tasks-section">
            <h2>TASKS</h2>
            {ongoingTasks.map((task) => (
              <div key={task.id} className="task ongoing">
                <div className="task-status ongoing-status"></div>
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>{task.deadline}</p>
                  <p>Status: <span className="status-ongoing">{task.status}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div className="tasks-section">
            <h2>COMPLETED</h2>
            {completedTasks.map((task) => (
              <div key={task.id} className="task completed">
                <div className="task-status completed-status"></div>
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>{task.deadline}</p>
                  <p>Status: <span className="status-completed">{task.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add new task</h2>
            <label>Title</label>
            <input type="text" name="title" value={newTask.title} onChange={handleInputChange} />
            <label>Description</label>
            <textarea name="description" value={newTask.description} onChange={handleInputChange}></textarea>
            <label>Deadline</label>
            <input type="text" name="deadline" value={newTask.deadline} onChange={handleInputChange} />
            <button onClick={handleAddTask}>ADD</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
