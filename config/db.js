import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoURL = process.env.DEV_MODE === 'development' ? process.env.MONGO_LOCAL_URL : process.env.MONGO_URL;

  if (!mongoURL) {
    console.error('MongoDB URL not defined in environment variables');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

export default connectDB;
