import Project from '../models/projectModel.js';
import Deliverable from '../models/deliverableModel.js';
import logger from '../utils/logger.js';
import { io } from '../../server.js'; 

// Create Project
export const createProjectController = async (req, res) => {
  const { projectName, description, status, startDate, endDate, ownerID } = req.body;
  if (!projectName || !description || !status || !startDate || !endDate || !ownerID) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const project = new Project({ projectName, description, status, startDate, endDate, ownerID });
    await project.save();
    io.emit('projectUpdated'); // Emit event
    res.status(201).json(project);
  } catch (error) {
    logger.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Projects
export const getProjectsController = async (req, res) => {
  try {
    const projects = await Project.find().populate('ownerID');
    res.status(200).json(projects);
  } catch (error) {
    logger.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create Deliverable
export const createDeliverableController = async (req, res) => {
  const { name, projectId, deadline } = req.body;
  if (!name || !projectId || !deadline) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const deliverable = new Deliverable({ name, projectId, deadline });
    await deliverable.save();
    io.emit('deliverableUpdated'); // Emit event
    res.status(201).json(deliverable);
  } catch (error) {
    logger.error('Error creating deliverable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Project
export const updateProjectController = async (req, res) => {
  const { id } = req.params;
  const { projectName, description, status, startDate, endDate, ownerID } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(id, { projectName, description, status, startDate, endDate, ownerID }, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    io.emit('projectUpdated'); // Emit event
    res.status(200).json(project);
  } catch (error) {
    logger.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Project
export const deleteProjectController = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    io.emit('projectUpdated'); // Emit event
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    logger.error('Error deleting project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
