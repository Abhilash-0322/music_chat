// api/index.js - Serverless entry point for Vercel
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import authRoutes from '../backend/src/routes/auth.route.js';
import userRoutes from '../backend/src/routes/user.route.js';
import albumRoutes from '../backend/src/routes/album.route.js';
import songRoutes from '../backend/src/routes/song.route.js';
import statsRoutes from '../backend/src/routes/stats.route.js';
import adminRoutes from '../backend/src/routes/admin.route.js';
import { initializeSocket } from '../backend/src/lib/socket.js';
import { connectDB } from '../backend/src/lib/db.js';

dotenv.config();

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://music-chat-gilt.vercel.app',
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Initialize socket.io
initializeSocket(httpServer);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Export the Express API for Vercel
export default httpServer;
