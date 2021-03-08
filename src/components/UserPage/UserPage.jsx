import { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5001');

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const messaging = useSelector((store) => store.messaging);
  const [message, setMessage] = useState({ id: '', text: '' });

  useEffect(() => dispatch({ type: 'FETCH_MESSAGES' }), []);

  const handleSendMessage = () => {
    socket.emit('SEND_MESSAGE', {
      sender_id: user.id,
      recipient_id: message.id,
      author: user.email,
      message: message.text,
    });
    setMessage({ id: '', text: '' });
  };

  socket.on('RECEIVE_MESSAGE', () => {
    dispatch({ type: 'FETCH_MESSAGES' });
  });

  return (
    <div className="container">
      <h2>Welcome, {user.email}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <div>
        <input
          onChange={(event) =>
            setMessage({ ...message, id: event.target.value })
          }
          value={message.id}
        />
        <input
          onChange={(event) =>
            setMessage({ ...message, text: event.target.value })
          }
          value={message.text}
        />
        <button onClick={handleSendMessage}>SEND MESSAGE</button>
      </div>
      <div>
        {messaging?.map((item) => (
          <p key={item.id}>
            {item.author}: {item.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
