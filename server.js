import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import timetableRoutes from './src/routes/timtRoutes.js';
import reportRoutes from './src/routes/reportRoutes.js';
import loginRoutes from './src/routes/loginRoutes.js';
import deliverableRoutes from './src/routes/deliverableRoutes.js';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import logger from '../utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(morgan('tiny'));

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/timetables', timetableRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/logins', loginRoutes);
app.use('/api/v1/deliverables', deliverableRoutes);

// Error middleware
function errorMiddleware(err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    logger.error(err.message, err); // Log the error
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

app.use(errorMiddleware);

// Socket.io connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust the origin as needed
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Export io for use in controllers
export { io };

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});