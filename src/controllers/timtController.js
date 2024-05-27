import TimeTable from '../models/timeTableModel.js';

// Create TimeTable
export const createTimeTableController = async (req, res) => {
  const { projectID, progressChart } = req.body;
  try {
    const timeTable = new TimeTable({ projectID, progressChart });
    await timeTable.save();
    res.status(201).json(timeTable);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get TimeTables
export const getTimeTablesController = async (req, res) => {
  try {
    const timeTables = await TimeTable.find().populate('projectID');
    res.status(200).json(timeTables);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
