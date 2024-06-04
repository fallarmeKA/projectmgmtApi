import TimeTable from '../models/timtModel.js';
import logger from '../utils/logger.js';

// Create TimeTable
export const createTimeTableController = async (req, res) => {
  const { projectId, progressChart } = req.body;

  if (!projectId || !progressChart) {
    return res.status(400).json({ message: 'Project ID and progress chart are required.' });
  }

  try {
    const timeTable = new TimeTable({ projectId, progressChart });
    await timeTable.save();
    logger.debug('TimeTable created successfully:', timeTable);
    res.status(201).json(timeTable);
  } catch (error) {
    logger.error('Error creating TimeTable:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get TimeTables
export const getTimeTablesController = async (req, res) => {
  try {
    const timeTables = await TimeTable.find().populate('projectId');
    res.status(200).json(timeTables);
  } catch (error) {
    logger.error('Failed to retrieve time tables:', error);
    res.status(500).json({ message: 'Failed to retrieve time tables', error: error.message });
  }
};

// Get TimeTable by Project ID
export const getTimeTableByProjectIdController = async (req, res) => {
  const { projectId } = req.params;

  try {
    const timeTable = await TimeTable.findOne({ projectId }).populate('projectId');
    if (!timeTable) {
      logger.warn('TimeTable not found for project ID:', projectId);
      return res.status(404).json({ message: 'TimeTable not found' });
    }
    res.status(200).json(timeTable);
  } catch (error) {
    logger.error('Failed to retrieve time table:', error);
    res.status(500).json({ message: 'Failed to retrieve time table', error: error.message });
  }
};
