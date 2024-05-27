import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
});

const Login = mongoose.model('Login', loginSchema);
export default Login;
