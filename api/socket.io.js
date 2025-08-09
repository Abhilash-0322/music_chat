// api/socket.io.js - Serverless socket.io handler for Vercel
import { Server } from 'socket.io';
import { createServer } from 'http';
import { Message } from '../backend/src/models/message.model.js';
import express from 'express';
import { connectDB } from '../backend/src/lib/db.js';

// Global in-memory store for sockets and user activities
// Note: This won't work perfectly in serverless - state will be lost between invocations
// For production, consider using Redis or another external service for state management
let userSockets = new Map(); 
let userActivities = new Map();

// Create an Express app and HTTP server
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'https://music-chat-gilt.vercel.app',
    credentials: true
  },
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
  // For Vercel, we need to adjust some settings
  serveClient: false,
  pingTimeout: 60000,
  pingInterval: 25000
});

// Connect to MongoDB
connectDB();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('user_connected', (userId) => {
    console.log(`User connected: ${userId} with socket: ${socket.id}`);
    userSockets.set(userId, socket.id);
    userActivities.set(userId, 'Idle');

    // broadcast to all connected sockets that this user just logged in
    io.emit('user_connected', userId);

    socket.emit('users_online', Array.from(userSockets.keys()));
    io.emit('activities', Array.from(userActivities.entries()));
  });

  socket.on('update_activity', ({ userId, activity }) => {
    console.log('activity updated', userId, activity);
    userActivities.set(userId, activity);
    io.emit('activity_updated', { userId, activity });
  });

  socket.on('send_message', async (data) => {
    try {
      const { senderId, receiverId, content } = data;
      
      console.log(`Message from ${senderId} to ${receiverId}: ${content}`);
      console.log(`Sender socket ID: ${socket.id}`);

      const message = await Message.create({
        senderId,
        receiverId,
        content,
      });

      // send to receiver in realtime, if they're online
      const receiverSocketId = userSockets.get(receiverId);
      console.log(`Receiver ${receiverId} socket ID: ${receiverSocketId || 'not online'}`);
      
      if (receiverSocketId) {
        // Send to specific receiver socket only
        io.to(receiverSocketId).emit('receive_message', message);
        console.log(`Message sent to receiver socket: ${receiverSocketId}`);
      }

      // Send confirmation back to sender only
      socket.emit('message_sent', message);
      console.log(`Message confirmation sent to sender socket: ${socket.id}`);
    } catch (error) {
      console.error('Message error:', error);
      socket.emit('message_error', error.message);
    }
  });

  socket.on('disconnect', () => {
    let disconnectedUserId;
    for (const [userId, socketId] of userSockets.entries()) {
      // find disconnected user
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        userSockets.delete(userId);
        userActivities.delete(userId);
        break;
      }
    }
    if (disconnectedUserId) {
      console.log(`User disconnected: ${disconnectedUserId}`);
      io.emit('user_disconnected', disconnectedUserId);
    }
  });
});

// Handle the serverless function request
const socketIoHandler = (req, res) => {
  if (res.socket.server.io) {
    // If socket.io is already running, we're good to go
    console.log('Socket.io already running');
    res.end();
    return;
  }

  // Set up socket.io on the server
  res.socket.server.io = io;
  console.log('Socket.io initialized');
  res.end();
};

export default socketIoHandler;
