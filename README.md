### RealTimeChatBot

A real-time multi-room chat application built with React, Socket.IO, and Express.
Users can join different chat rooms and send messages instantly, with chat history maintained per room.

### Features

- Multiple chat rooms (e.g., general, tech, sports)
- Real-time messaging powered by WebSockets (Socket.IO)
- Chat history for each room
- Room selection UI similar to Slack
- Frontend hosted on GitHub Pages
- Backend API deployed on Render

### Tech Stack

**Frontend**: React, TypeScript, Vite, Socket.IO-client

**Backend**: Node.js, Express, Socket.IO

## Deployment:

**Frontend**: GitHub Pages (Live Demo)

**Backend**: Render (https://realtimechatbot.onrender.com)

### Getting Started
## Prerequisites

Node.js (v16+ recommended)
```bash
npm or yarn
```
## Installation

Clone the repository:
```bash
git clone https://github.com/laurenncasey/RealTimeChatBot.git
cd RealTimeChatBot
```
## Running Locally
**Backend**
```bash
cd chat-backend
npm install
npm run dev
```

The backend will start on http://localhost:5713

**Frontend**

In a separate terminal:
```bash
cd chat-frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173

## Deployment
**Frontend (GitHub Pages)**

Build and deploy the frontend:
```bash
npm run deploy --prefix chat-frontend
```

This publishes the static files to the gh-pages branch.

**Backend (Render)**

The backend is deployed on Render. To deploy, push your code to your Render-linked repo and configure start command as:
```bash
npm start
```
## Usage

Open the frontend in a browser:
https://laurenncasey.github.io/RealTimeChatBox/

Select a chat room on the left sidebar

Type messages and hit enter or click send

Messages appear in real time for all users in the room

## Notes

Make sure the frontend connects to the correct backend URL (Render URL) in production.

Environment variables or conditional logic are used to switch backend URLs between local dev and production.
