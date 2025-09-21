import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('https://realtimechatbot.onrender.com',{ transports: ['websocket'], withCredentials: true}); 

function App() {
  const [rooms] = useState(['general', 'tech', 'sports']);
  const [username, setUsername] = useState('Anon');
  const [chatHistories, setChatHistories] = useState<{[room:string]:string[]}>({});
  const [message, setMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState('general');

  useEffect(() => {
    socket.emit('joinRoom', currentRoom);
    return () => {
      socket.emit('leaveRoom', currentRoom);
    };

  }, [currentRoom]);

 useEffect(() => {
  socket.on('receiveMessage', ({ room, message }) => {
    setChatHistories(prev => ({
      ...prev,
      [room]: [...(prev[room] || []), message]
    }));
  });

  return () => {
    socket.off('receiveMessage');
  };
}, []);


  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', {room: currentRoom, message, username});
      setMessage('');
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
    <div className="roomsArea">
    <p className="title">Rooms</p>
    {rooms.map((room) => (
      <button onClick={() => setCurrentRoom(room)} className='room' key={room}>#{room}</button>
      ))}
      <p>Username</p>
      <input className="usernameInput" placeholder='Your username here' onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div className="messagePortal">
      <p className="title">Chat Bot</p>
      <p className="inRoom">Room: #{currentRoom}</p>
      <div className="chatboxBorder">
      {(chatHistories[currentRoom] || []).map((msg, idx) => (
        <p key={idx} className="message">{msg}</p>
      ))}
      </div>
      <div style={{display:"flex", flexDirection:"row", marginTop:"15px"}}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
        placeholder="Type your message"
        className='messageInput'
      />
      <button onClick={sendMessage} className="submitButton">
        Send
      </button>
      </div>
      
    </div>
    </div>
  );
}

export default App;
