import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Incomplete', 'Inprogress', 'Complete'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
