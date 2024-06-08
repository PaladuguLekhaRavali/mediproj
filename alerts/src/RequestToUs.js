import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container-fluid" style={{ backgroundColor: 'rgba(22, 31, 109, 0.8)', minHeight: '100vh', paddingTop: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ color: '#00ABE1' }}>Friend Requests</h2>
          <div style={{ backgroundColor: '#161F6D', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            {requests.length === 0 && <p style={{ color: '#FFFFFF' }}>No requests found.</p>}
            {requests.map((request, index) => (
              <div key={index} style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
                <p style={{ color: '#FFFFFF', marginBottom: '5px' }}>Request from: {request.sender_name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => handleAccept(request.sender_name)} className="btn btn-success" style={{ marginRight: '10px' }}>Accept</button>
                  <button onClick={() => handleReject(request.sender_name)} className="btn btn-danger">Reject</button>
                </div>
              </div>
            ))}
            {alertMessage && <p style={{ color: 'red', marginTop: '10px' }}>{alertMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestComponent;