import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container-fluid" style={{ backgroundColor: 'rgba(22, 31, 109, 0.8)', minHeight: '100vh', paddingTop: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ color: '#00ABE1' }}>Reminders History</h2>
          <div style={{ backgroundColor: '#161F6D', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            {error && <p style={{ color: 'ed', marginTop: '10px' }}>{error}</p>}
            <table className="table table-striped" style={{ color: '#161F6D' }}>
              <thead>
                <tr style={{ backgroundColor: '#00ABE1', color: '#FFFFFF' }}>
                  <th>Receiver</th>
                  <th>Message</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((reminder) => (
                  <tr key={reminder.id}>
                    <td style={{ color: '#FFFFFF' }}>{reminder.receiver_name}</td>
                    <td style={{ color: '#FFFFFF' }}>{reminder.message}</td>
                    <td style={{ color: '#FFFFFF' }}>{new Date(reminder.reminder_time).toLocaleString()}</td>
                    <td style={{ color: '#FFFFFF' }}> {reminder.status === 'pending'? 'Pending' : 'Sent'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersHistory;