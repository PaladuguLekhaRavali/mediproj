import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestComponent = () => {
  const [requests, setRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3004/requestsfe', {
          params: { receiver_name: localStorage.getItem('username') }
        });
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (sender_name) => {
    try {
      await axios.post('http://localhost:3004/requestsfe/accept', {
        sender_name,
        receiver_name: localStorage.getItem('username')
      });
      setAlertMessage('Request accepted successfully!');
      setRequests(requests.filter(request => request.sender_name !== sender_name));
    } catch (error) {
      console.error('Error accepting request:', error);
      setAlertMessage('Failed to accept request.');
    }
  };

  const handleReject = async (sender_name) => {
    try {
      await axios.post('http://localhost:3004/requestsfe/reject', {
        sender_name,
        receiver_name: localStorage.getItem('username')
      });
      setAlertMessage('Request rejected successfully!');
      setRequests(requests.filter(request => request.sender_name !== sender_name));
    } catch (error) {
      console.error('Error rejecting request:', error);
      setAlertMessage('Failed to reject request.');
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      {requests.length === 0 && <p>No requests found.</p>}
      {requests.map((request, index) => (
        <div key={index}>
          <p>Request from: {request.sender_name}</p>
          <button onClick={() => handleAccept(request.sender_name)}>Accept</button>
          <button onClick={() => handleReject(request.sender_name)}>Reject</button>
        </div>
      ))}
      {alertMessage && <p>{alertMessage}</p>}
    </div>
  );
};

export default RequestComponent;
