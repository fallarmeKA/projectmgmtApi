import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Incomplete', 'Inprogress', 'Complete'], required: true },
  dueDate: { type: Date, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  phase: { type: String, enum: ['Initiate', 'Plan', 'Design', 'Test', 'Exit'], default: 'Plan' } // Added phase field
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
