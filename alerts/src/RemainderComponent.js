// RemainderComponent.js
import './RemainderComponent.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RemainderComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="component">
     
      <div className="options">
        <div className="option" onClick={() => handleNavigation("/remainderhistory")}>
          <span>Remainders History</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/requests")}>
          <span>Requests</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/createremainder")}>
          <span>Create Remainder</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/create-request")}>
          <span>Sent Requests</span>
        </div>
      </div>
    </div>
  );
};

export default RemainderComponent;
