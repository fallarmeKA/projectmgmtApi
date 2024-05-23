import express from 'express';
import connectDB from './config/db.js'; // Import the connectDB function
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to MongoDB using the imported function
connectDB();

// Define a basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
