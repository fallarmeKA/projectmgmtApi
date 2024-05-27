import Task from '../models/taskModel.js';

// Create Task
export const createTaskController = async (req, res) => {
  const { taskName, description, status, dueDate, assignedTo, projectID } = req.body;
  try {
    const task = new Task({ taskName, description, status, dueDate, assignedTo, projectID });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Tasks
export const getTasksController = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo').populate('projectID');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Other task controllers...
