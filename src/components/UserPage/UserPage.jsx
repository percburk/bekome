import { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [message, setMessage] = useState('');
  const [messageLog, setMessageLog] = useState([]);

  const handleSendMessage = () => {
    socket.emit('SEND_MESSAGE', {
      author: user.email,
      message,
    });
    setMessage('');
  };

  socket.on('RECEIVE_MESSAGE', (data) => {
    console.log(data);
    setMessageLog([...messageLog, data]);
  });

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <div>
        <input onChange={(event) => setMessage(event.target.value)} />
        <button onClick={handleSendMessage}>SEND MESSAGE</button>
      </div>
      <div>
        {messageLog.map((item, i) => {
          return (
            <p key={i}>
              {item.author}: {item.message}
            </p>
          );
        })}
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
