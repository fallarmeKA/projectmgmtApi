import Task from '../models/taskModel.js';
import logger from './src/utils/logger.js';
import { io } from '../../server.js'; // Import io instance

// Create Task
export const createTaskController = async (req, res) => {
  const { taskName, description, status, dueDate, assignedTo, projectID } = req.body;

  if (!taskName || !description || !status || !dueDate || !assignedTo || !projectID) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // additional validation
  if (!isValidDate(dueDate)) { // Assume isValidDate is a utility function you've defined
    return res.status(400).json({ message: 'Invalid date format' });
  }

  try {
    const task = new Task({ taskName, description, status, dueDate, assignedTo, projectID });
    await task.save();
    logger.debug('Task created successfully:', task);
    io.emit('taskUpdated'); // Emit event
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    logger.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get Tasks
export const getTasksController = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo').populate('projectID');
    res.status(200).json(tasks);
  } catch (error) {
    logger.error('Failed to retrieve tasks:', error);
    res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
  }
};

// Update Task Status
export const updateTaskStatusController = async (req, res) => {
  const { taskId, status } = req.body;

  if (!taskId || !status) {
    return res.status(400).json({ message: 'Task ID and status are required' });
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    io.emit('taskUpdated'); // Emit event
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task status', error: error.message });
  }
};

// Utility function to validate date
const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};