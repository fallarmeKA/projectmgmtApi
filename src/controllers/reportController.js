import Project from '../models/projectModel.js';
import Task from '../models/taskModel.js';
import logger from '../utils/logger'; // Import the logger
import { io } from '../../server.js'; // Import io instance

// Get Report Data for a Specific Project
export const getProjectReportController = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      logger.warn('Project not found for report:', projectId);
      return res.status(404).json({ message: 'Project not found' });
    }

    const tasks = await Task.find({ projectID: projectId });

    // Calculate project phase completion percentage
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Calculate number of tasks by project phase
    const tasksByPhase = tasks.reduce((acc, task) => {
      const phase = task.phase || 'Unknown';
      if (!acc[phase]) {
        acc[phase] = 0;
      }
      acc[phase]++;
      return acc;
    }, {});

    // Calculate activities status
    const activitiesStatus = tasks.reduce((acc, task) => {
      const status = task.status || 'Not Started';
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {});

    const reportData = {
      project,
      completionPercentage,
      tasksByPhase,
      activitiesStatus,
    };

    io.emit('reportUpdated', reportData); // Emit event

    res.status(200).json(reportData);
  } catch (error) {
    logger.error('Error fetching project report:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
