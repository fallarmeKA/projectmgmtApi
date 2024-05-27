import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  reportContent: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
