import TimeTable from '../models/timtModel.js';

// Create TimeTable
export const createTimeTableController = async (req, res) => {
  const { projectId, progressChart } = req.body;
  try {
    const timeTable = new TimeTable({ projectId, progressChart });
    await timeTable.save();
    res.status(201).json(timeTable);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get TimeTables
export const getTimeTablesController = async (req, res) => {
  try {
    const timeTables = await TimeTable.find().populate('projectId');
    res.status(200).json(timeTables);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
