
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
const RequestComponent = () => {
  const [username, setUsername] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [requestHistory, setRequestHistory] = useState([]);

  const handleRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3004/requests', {
        sender_name: localStorage.getItem('username'),
        receiver_name: username
      });
      if (response.data.success) {
        setAlertMessage('Request sent successfully!');
        fetchRequestHistory(); // Update request history after sending a new request
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

  const fetchRequestHistory = async () => {
    const senderName = localStorage.getItem('username');
    if (!senderName) return;

    try {
      const response = await axios.get(`http://localhost:3004/request-history/${senderName}`);
      setRequestHistory(response.data.requests);
    } catch (error) {
      console.error('Error fetching request history:', error);
    }
  };

  const handleDelete = async (receiver_name) => {
    const senderName = localStorage.getItem('username');

    try {
      const response = await axios.delete('http://localhost:3004/deleterequests', {
        data: { sender_name: senderName, receiver_name }
      });

      if (response.data.success) {
        setAlertMessage('Request deleted successfully!');
        fetchRequestHistory(); // Update request history after deleting a request
      } else {
        setAlertMessage('Failed to delete request.');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      setAlertMessage('Failed to delete request.');
    }
  };

  useEffect(() => {
    fetchRequestHistory();
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: 'rgba(22, 31, 109, 0.8)', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ color: '#00ABE1' }}>Send Request</h2>
          <div className="form-group">
            <label htmlFor="username" style={{ color: '#FFFFFF' }}>Enter Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
            />
          </div>
          <button className="btn btn-primary" onClick={handleRequest} style={{ backgroundColor: '#00ABE1' }}>Send Request</button>
          {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h3 style={{ color: '#FFFFFF' }}>Request History</h3>
          <ul className="list-group">
            {requestHistory.map((request, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}>
                To: {request.receiver_name} - Status: {request.status} 
                <button className="btn btn-danger" onClick={() => handleDelete(request.receiver_name)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestComponent;
