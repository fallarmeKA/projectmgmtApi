import Report from '../models/reportModel.js';

// Create Report
export const createReportController = async (req, res) => {
  const { projectID, reportContent, createdBy } = req.body;
  try {
    const report = new Report({ projectID, reportContent, createdBy });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Reports
export const getReportsController = async (req, res) => {
  try {
    const reports = await Report.find().populate('projectID').populate('createdBy');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
