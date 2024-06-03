import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  ownerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
