import Project from '../models/projectModel.js';

// Create Project
export const createProjectController = async (req, res) => {
  const { projectName, description, status, startDate, endDate, ownerID } = req.body;
  try {
    const project = new Project({ projectName, description, status, startDate, endDate, ownerID });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Projects
export const getProjectsController = async (req, res) => {
  try {
    const projects = await Project.find().populate('ownerID');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Other project controllers...
