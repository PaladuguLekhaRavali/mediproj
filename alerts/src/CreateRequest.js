


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RequestComponent = () => {
//   const [username, setUsername] = useState('');
//   const [alertMessage, setAlertMessage] = useState('');
//   const [requestHistory, setRequestHistory] = useState([]);

//   const handleRequest = async () => {
//     try {
//       const response = await axios.post('http://localhost:3004/requests', {
//         sender_name: localStorage.getItem('username'),
//         receiver_name: username
//       });
//       if (response.data.success) {
//         setAlertMessage('Request sent successfully!');
//         fetchRequestHistory(); // Update request history after sending a new request
//       } else {
//         setAlertMessage(response.data.message); // Set alert message from response
//       }
//     } catch (error) {
//       console.error('Error sending request:', error);
//       if (error.response && error.response.data && error.response.data.message === 'User not found.') {
//         setAlertMessage('User not found. Please enter a valid username.'); // Set specific error message for user not found
//       } else {
//         setAlertMessage('Failed to send request.'); // Default error message
//       }
//     }
//   };

//   const fetchRequestHistory = async () => {
//     const senderName = localStorage.getItem('username');
//     if (!senderName) return;

//     try {
//       const response = await axios.get(`http://localhost:3004/request-history/${senderName}`);
//       setRequestHistory(response.data.requests);
//     } catch (error) {
//       console.error('Error fetching request history:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRequestHistory();
//   }, []);

//   return (
//     <div>
//       <h2>Send Request</h2>
//       <label htmlFor="username">Enter Username:</label>
//       <input
//         type="text"
//         id="username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <button onClick={handleRequest}>Send Request</button>
//       {alertMessage && <p>{alertMessage}</p>}

//       <h3>Request History</h3>
//       <ul>
//         {requestHistory.map((request, index) => (
//           <li key={index}>
//             To: {request.receiver_name} - Status: {request.status}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RequestComponent;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

      <h3>Request History</h3>
      <ul>
        {requestHistory.map((request, index) => (
          <li key={index}>
            To: {request.receiver_name} - Status: {request.status} 
            <button onClick={() => handleDelete(request.receiver_name)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestComponent;
