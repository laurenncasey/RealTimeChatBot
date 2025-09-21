const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your React frontend port
    methods: ['GET', 'POST'],
    credentials: true
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (msg) => {
    console.log('Received message:', msg);
    io.emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5713, () => {
  console.log('Server running on http://localhost:5713');
});
