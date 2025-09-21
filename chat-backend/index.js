const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors({
    origin: 'https://laurenncasey.github.io/RealTimeChatBot/', 
    credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://laurenncasey.github.io/RealTimeChatBot/',
    methods: ['GET', 'POST'],
    credentials: true
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', ({room, message, username}) => {
    io.to(room).emit('receiveMessage', {room, message: `${username}> ${message}`});
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });
  
  socket.on('leaveRoom', (room) => {
    socket.leave(room);
    console.log(`User left room ${room}`);
  });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
  console.log('Server running on https://realtimechatbot.onrender.com');
});
