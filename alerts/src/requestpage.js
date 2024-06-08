
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateReminderComponent = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [message, setMessage] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:3004/friends', {
          params: { username: localStorage.getItem('username') }
        });
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setAlertMessage('Failed to fetch friends.');
      }
    };

    fetchFriends();
  }, []);

  const handleCreateReminder = async () => {
    try {
      const response = await axios.post('http://localhost:3004/reminders', {
        sender_name: localStorage.getItem('username'),
        receiver_name: selectedFriend,
        message,
        date_time: dateTime
      });
      if (response.data.success) {
        setAlertMessage('Reminder created successfully!');
      } else {
        setAlertMessage('Failed to create reminder.');
      }
    } catch (error) {
      console.error('Error creating reminder:', error);
      setAlertMessage('Failed to create reminder.');
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: 'rgba(22, 31, 109, 0.8)', minHeight: '100vh', paddingTop: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ color: '#00ABE1' }}>Create Reminder</h2>
          <div style={{ backgroundColor: '#161F6D', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            {alertMessage && <p style={{ color: 'red', marginTop: '10px' }}>{alertMessage}</p>}
            <div className="form-group">
              <label htmlFor="friends" style={{ color: '#FFFFFF' }}>Select Friend:</label>
              <select
                id="friends"
                value={selectedFriend}
                onChange={(e) => setSelectedFriend(e.target.value)}
                style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
              >
                <option value="">Select a friend</option>
                {friends.map((friend) => (
                  <option key={friend.name} value={friend.name}>
                    {friend.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message" style={{ color: '#FFFFFF' }}>Message:</label>
              <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateTime" style={{ color: '#FFFFFF' }}>Date and Time:</label>
              <input
                type="datetime-local"
                id="dateTime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
              />
            </div>
            <button onClick={handleCreateReminder} className="btn btn-primary" style={{ backgroundColor: '#00ABE1' }}>Create Reminder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReminderComponent;