import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import router from './src/routes/userRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js'; // Corrected import path
import taskRoutes from './src/routes/taskRoutes.js'; // Corrected import path
import timeTableRoutes from './src/routes/timtRoutes.js';
import reportRoutes from './src/routes/reportRoutes.js';
import loginRoutes from './src/routes/loginRoutes.js';

import morgan from 'morgan'; // Import morgan for logging

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // Example of disabling CSP, adjust based on your needs
}));
app.use(express.json());
app.use(morgan('tiny')); // Use morgan for logging HTTP requests

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/v1/users', router); 
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/timetables', timeTableRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/logins', loginRoutes);

// Error middleware
function errorMiddleware(err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

app.use(errorMiddleware); // use error middleware

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});