import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpiryAlerts = () => {
  const [expiryDate, setExpiryDate] = useState('');
  const [itemName, setItemName] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddAlert = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      setAlertMessage('Username not found in local storage');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3004/expiry-alerts', {
        username,
        expiry_date: expiryDate,
        item_name: itemName
      });
      if (response.data.success) {
        setAlertMessage('Expiry alert added successfully');
        fetchAlerts();
      } else {
        setAlertMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error adding expiry alert:', error);
      setAlertMessage('Failed to add expiry alert');
    }
  };

  const fetchAlerts = async () => {
    const username = localStorage.getItem('username');
    if (!username) return;

    try {
      const response = await axios.get(`http://localhost:3004/expiry-alerts/${username}`);
      setAlerts(response.data.alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div>
      <h2>Expiry Alerts</h2>
      <label htmlFor="itemName">Enter Item Name:</label>
      <input
        type="text"
        id="itemName"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <label htmlFor="expiryDate">Enter Expiry Date:</label>
      <input
        type="date"
        id="expiryDate"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <button onClick={handleAddAlert}>Add Alert</button>
      {alertMessage && <p>{alertMessage}</p>}

      <h3>Alerts</h3>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Days Left</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.item_name}</td>
              <td>{alert.days_left}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiryAlerts;
