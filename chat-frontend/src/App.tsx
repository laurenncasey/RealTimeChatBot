import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5713',{ transports: ['websocket'], withCredentials: true}); // Replace with your backend URL after deployment

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on('receiveMessage', (msg: string) => {
      setChat(prev => [...prev, msg]);
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Chat App</h2>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '200px', overflowY: 'auto' }}>
        {chat.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ width: '70%', marginTop: '1rem' }}
      />
      <button onClick={sendMessage} style={{ marginLeft: '1rem' }}>
        Send
      </button>
    </div>
  );
}

export default App;
