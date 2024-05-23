// RemainderComponent.js
import './RemainderComponent.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RemainderComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  // Retrieve username from local storage
  const username = localStorage.getItem('username');

  return (
    <div className="component">
      <h2>Welcome, {username}</h2> {/* Display the username */}

      <div className="options">
        <div className="option" onClick={() => handleNavigation("/remainderhistory")}>
          <span>Remainders History</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/requests")}>
          <span>Requests</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/createreminder")}>
          <span>Create Remainder</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/create-request")}>
          <span>Sent Requests</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/expiryde")}>
          <span>Expiry remainder</span>
        </div>
      </div>
    </div>
  );
};

export default RemainderComponent;
