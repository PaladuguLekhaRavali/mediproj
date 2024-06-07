
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.min.js';
// // const ExpiryAlerts = () => {
// //   const [expiryDate, setExpiryDate] = useState('');
// //   const [itemName, setItemName] = useState('');
// //   const [alerts, setAlerts] = useState([]);
// //   const [alertMessage, setAlertMessage] = useState('');

// //   const handleAddAlert = async () => {
// //     const username = localStorage.getItem('username');
// //     if (!username) {
// //       setAlertMessage('Username not found in local storage');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post('http://localhost:3004/expiry-alerts', {
// //         username,
// //         expiry_date: expiryDate,
// //         item_name: itemName
// //       });
// //       if (response.data.success) {
// //         setAlertMessage('Expiry alert added successfully');
// //         fetchAlerts();
// //       } else {
// //         setAlertMessage(response.data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error adding expiry alert:', error);
// //       setAlertMessage('Failed to add expiry alert');
// //     }
// //   };

// //   const fetchAlerts = async () => {
// //     const username = localStorage.getItem('username');
// //     if (!username) return;

// //     try {
// //       const response = await axios.get(`http://localhost:3004/expiry-alerts/${username}`);
// //       setAlerts(response.data.alerts);
// //     } catch (error) {
// //       console.error('Error fetching alerts:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAlerts();
// //   }, []);

// //   return (
// //     <div className="container">
// //       <h2 style={{ color: '#00ABE1' }}>Expiry Alerts</h2>
// //       <div className="form-group">
// //         <label htmlFor="itemName" style={{ color: '#FFFFFF' }}>Enter Item Name:</label>
// //         <input
// //           type="text"
// //           id="itemName"
// //           className="form-control"
// //           value={itemName}
// //           onChange={(e) => setItemName(e.target.value)}
// //           style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
// //         />
// //       </div>
// //       <div className="form-group">
// //         <label htmlFor="expiryDate" style={{ color: '#FFFFFF' }}>Enter Expiry Date:</label>
// //         <input
// //           type="date"
// //           id="expiryDate"
// //           className="form-control"
// //           value={expiryDate}
// //           onChange={(e) => setExpiryDate(e.target.value)}
// //           style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
// //         />
// //       </div>
// //       <button onClick={handleAddAlert} className="btn btn-primary" style={{ backgroundColor: '#00ABE1' }}>Add Alert</button>
// //       {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}

// //       <h3 style={{ color: '#FFFFFF' }}>Alerts</h3>
// //       <table className="table table-striped" style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}>
// //         <thead>
// //           <tr>
// //             <th>Item Name</th>
// //             <th>Days Left</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {alerts.map((alert, index) => (
// //             <tr key={index}>
// //               <td>{alert.item_name}</td>
// //               <td>{alert.days_left}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ExpiryAlerts;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ExpiryAlerts = () => {
//   const [expiryDate, setExpiryDate] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [alerts, setAlerts] = useState([]);
//   const [alertMessage, setAlertMessage] = useState('');

//   const handleAddAlert = async () => {
//     const username = localStorage.getItem('username');
//     if (!username) {
//       setAlertMessage('Username not found in local storage');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3004/expiry-alerts', {
//         username,
//         expiry_date: expiryDate,
//         item_name: itemName
//       });
//       if (response.data.success) {
//         setAlertMessage('Expiry alert added successfully');
//         fetchAlerts();
//       } else {
//         setAlertMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding expiry alert:', error);
//       setAlertMessage('Failed to add expiry alert');
//     }
//   };

//   const fetchAlerts = async () => {
//     const username = localStorage.getItem('username');
//     if (!username) return;

//     try {
//       const response = await axios.get(`http://localhost:3004/expiry-alerts/${username}`);
//       setAlerts(response.data.alerts);
//     } catch (error) {
//       console.error('Error fetching alerts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

//   return (
//     <div className="container">
//       <h2 style={{ color: '#00ABE1' }}>Expiry Alerts</h2>
//       <div style={{ backgroundColor: '#161F6D', padding: '20px', borderRadius: '10px' }}>
//         <div className="form-group">
//           <label htmlFor="itemName" style={{ color: '#FFFFFF' }}>Enter Item Name:</label>
//           <input
//             type="text"
//             id="itemName"
//             className="form-control"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="expiryDate" style={{ color: '#FFFFFF' }}>Enter Expiry Date:</label>
//           <input
//             type="date"
//             id="expiryDate"
//             className="form-control"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
//           />
//         </div>
//         <button onClick={handleAddAlert} className="btn btn-primary" style={{ backgroundColor: '#00ABE1' }}>Add Alert</button>
//         {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
//       </div>

//       <div style={{ marginTop: '20px', backgroundColor: '#E8EAFF', padding: '20px', borderRadius: '10px' }}>
//         <h3 style={{ color: '#161F6D' }}>Alerts</h3>
//         <table className="table table-striped" style={{ color: '#161F6D' }}>
//           <thead>
//             <tr>
//               <th>Item Name</th>
//               <th>Days Left</th>
//             </tr>
//           </thead>
//           <tbody>
//             {alerts.map((alert, index) => (
//               <tr key={index}>
//                 <td>{alert.item_name}</td>
//                 <td>{alert.days_left}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ExpiryAlerts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container-fluid" style={{ backgroundColor: 'rgba(22, 31, 109, 0.8)', minHeight: '100vh' }}>
      <div className="container">
        <h2 style={{ color: '#00ABE1' }}>Expiry Alerts</h2>
        <div style={{ backgroundColor: '#161F6D', padding: '20px', borderRadius: '10px' }}>
          <div className="form-group">
            <label htmlFor="itemName" style={{ color: '#FFFFFF' }}>Enter Item Name:</label>
            <input
              type="text"
              id="itemName"
              className="form-control"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate" style={{ color: '#FFFFFF' }}>Enter Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              style={{ backgroundColor: '#E8EAFF', color: '#161F6D' }}
            />
          </div>
          <button onClick={handleAddAlert} className="btn btn-primary" style={{ backgroundColor: '#00ABE1' }}>Add Alert</button>
          {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
        </div>
      </div>

      <div className="container" style={{ backgroundColor: '#E8EAFF', padding: '20px', borderRadius: '10px', marginTop: '10px' }}>
        <h3 style={{ color: '#161F6D' }}>Alerts</h3>
        <table className="table table-striped" style={{ color: '#161F6D' }}>
          <thead>
            <tr style={{ backgroundColor: '#00ABE1', color: '#FFFFFF' }}>
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
    </div>
  );
};

export default ExpiryAlerts;
