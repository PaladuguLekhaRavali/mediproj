import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Create Reminder</h2>
      {alertMessage && <p>{alertMessage}</p>}
      <label htmlFor="friends">Select Friend:</label>
      <select
        id="friends"
        value={selectedFriend}
        onChange={(e) => setSelectedFriend(e.target.value)}
      >
        <option value="">Select a friend</option>
        {friends.map((friend) => (
          <option key={friend.name} value={friend.name}>
            {friend.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="message">Message:</label>
      <input
        type="text"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <label htmlFor="dateTime">Date and Time:</label>
      <input
        type="datetime-local"
        id="dateTime"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <br />
      <button onClick={handleCreateReminder}>Create Reminder</button>
    </div>
  );
};

export default CreateReminderComponent;
