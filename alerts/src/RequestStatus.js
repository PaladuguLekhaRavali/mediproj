import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RemindersHistory = () => {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const username = localStorage.getItem('username'); // Assuming username is stored in local storage
        if (!username) {
          setError('No username found in local storage');
          return;
        }

        const response = await axios.get('http://localhost:3004/reminders', {
          params: { username }
        });

        if (response.data.success) {
          setReminders(response.data.reminders);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching reminders:', error);
        setError('Failed to fetch reminders.');
      }
    };

    fetchReminders();
  }, []);

  return (
    <div>
      <h2>Reminders History</h2>
      {error && <p>{error}</p>}
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            <p><strong>Receiver:</strong> {reminder.receiver_name}</p>
            <p><strong>Message:</strong> {reminder.message}</p>
            <p><strong>Time:</strong> {new Date(reminder.reminder_time).toLocaleString()}</p>
            <p><strong>Status:</strong> {reminder.status === 'pending' ? 'Pending' : 'Sent'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemindersHistory;
