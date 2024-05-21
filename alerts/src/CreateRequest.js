import React, { useState } from 'react';
import axios from 'axios';

const RequestComponent = () => {
  const [username, setUsername] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3004/requests', {
        sender_name: localStorage.getItem('username'),
        receiver_name: username
      });
      if (response.data.success) {
        setAlertMessage('Request sent successfully!');
      } else {
        setAlertMessage(response.data.message); // Set alert message from response
      }
    } catch (error) {
      console.error('Error sending request:', error);
      if (error.response && error.response.data && error.response.data.message === 'User not found.') {
        setAlertMessage('User not found. Please enter a valid username.'); // Set specific error message for user not found
      } else {
        setAlertMessage('Failed to send request.'); // Default error message
      }
    }
  };

  return (
    <div>
      <h2>Send Request</h2>
      <label htmlFor="username">Enter Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleRequest}>Send Request</button>
      {alertMessage && <p>{alertMessage}</p>}
    </div>
  );git add
};

export default RequestComponent;
