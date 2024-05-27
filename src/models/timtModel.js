import mongoose from 'mongoose';

const timeTableSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  progressChart: { type: String },
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);
export default TimeTable;
