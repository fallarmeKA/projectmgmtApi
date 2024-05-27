import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';  
import projectRoutes from './routes/projectRoutes.js'; 
import taskRoutes from './routes/taskRoutes.js';
import timeTableRoutes from './routes/timeTableRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

import errorMiddleware from './middlewares/errorMiddleware.js';

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
app.use('/api/v1/projects', projectRoutes); // Use project routes
app.use('/api/v1/tasks', taskRoutes); // Use task routes
app.use('/api/v1/timetables', timeTableRoutes); // Use timetable routes
app.use('/api/v1/reports', reportRoutes); // Use report routes
app.use('/api/v1/logins', loginRoutes); // Use login routes

// Error middleware
app.use(errorMiddleware); // use error middleware

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
