import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js'; 

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/v1/auth', userRoutes); // Use user routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
