// SentRequestComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SentRequestComponent = () => {
  const [formData, setFormData] = useState({
    receiver_name: '',
    receiver_mobile: ''
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch current user's information using JWT token
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/current-user', { headers: { Authorization: token } });
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
        console.error('Current user is null or undefined');
        // Handle the error or return early if necessary
        return;
      }
      // Send request with current user's name and details
      await axios.post('/api/sent-requests', {
        sender_name: currentUser.name,
        receiver_name: formData.receiver_name,
        receiver_mobile: formData.receiver_mobile,
        message: formData.message
      });
      alert('Request sent successfully!');
      // Optionally clear the form fields
      setFormData({
        receiver_name: '',
        receiver_mobile: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Error sending request. Please try again later.');
    }
  };
  
   
   

  return (
    <div>
      <h2>Sent Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Receiver Name:</label>
          <input type="text" name="receiver_name" value={formData.receiver_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Receiver Mobile:</label>
          <input type="text" name="receiver_mobile" value={formData.receiver_mobile} onChange={handleChange} required />
        </div>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};

export default SentRequestComponent;
