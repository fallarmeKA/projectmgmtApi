import Deliverable from '../models/deliverableModel.js';
import logger from '../utils/logger'; // Import the logger

// Create Deliverable
export const createDeliverableController = async (req, res) => {
  const { name, projectId, deadline } = req.body;
  if (!name || !projectId || !deadline) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const deliverable = new Deliverable({ name, projectId, deadline });
    await deliverable.save();
    res.status(201).json(deliverable);
  } catch (error) {
    logger.error('Error creating deliverable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Deliverables
export const getDeliverablesController = async (req, res) => {
  try {
    const deliverables = await Deliverable.find().populate('projectId');
    res.status(200).json(deliverables);
  } catch (error) {
    logger.error('Error fetching deliverables:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Deliverable
export const updateDeliverableController = async (req, res) => {
  const { id } = req.params;
  const { name, projectId, deadline, status } = req.body;

  try {
    const deliverable = await Deliverable.findByIdAndUpdate(id, { name, projectId, deadline, status }, { new: true });
    if (!deliverable) {
      return res.status(404).json({ message: 'Deliverable not found' });
    }
    res.status(200).json(deliverable);
  } catch (error) {
    logger.error('Error updating deliverable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Deliverable
export const deleteDeliverableController = async (req, res) => {
  const { id } = req.params;

  try {
    const deliverable = await Deliverable.findByIdAndDelete(id);
    if (!deliverable) {
      return res.status(404).json({ message: 'Deliverable not found' });
    }
    res.status(200).json({ message: 'Deliverable deleted successfully' });
  } catch (error) {
    logger.error('Error deleting deliverable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
