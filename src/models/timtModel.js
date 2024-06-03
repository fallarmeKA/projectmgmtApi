import mongoose from 'mongoose';

const timeTableSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },  // Title for the timetable
  description: { type: String },  // Optional description
  startDate: { type: Date, required: true },  // Start date of the timetable
  endDate: { type: Date, required: true },  // End date of the timetable
  progressChart: { type: String },  // Could be URL to an image or a JSON object
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);
export default TimeTable;
