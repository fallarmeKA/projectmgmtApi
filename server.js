import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import UserRoutes from './routes/userRoutes.js'; 
import ProjectRoutes from './routes/projectRoutes.js';
import TaskRoutes from './routes/taskRoutes.js';
import TimeTableRoutes from './routes/timeTableRoutes.js';
import ReportRoutes from './routes/reportRoutes.js';
import LoginRoutes from './routes/loginRoutes.js';

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
app.use('/api/v1/auth', UserRoutes); // Use user routes
app.use('/api/v1/projects', ProjectRoutes); // Use project routes
app.use('/api/v1/tasks', TaskRoutes); // Use task routes
app.use('/api/v1/timetables', TimeTableRoutes); // Use timetable routes
app.use('/api/v1/reports', ReportRoutes); // Use report routes
app.use('/api/v1/logins', LoginRoutes); // Use login routes

// Error middleware
app.use(errorMiddleware); // use error middleware

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
