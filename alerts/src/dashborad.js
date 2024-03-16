import React from 'react';
import './dashboars.css'; // Import the CSS file
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Dashboard</h1>
      <Link to="/login"><button className="dashboard-button">Login</button> 
      
      </Link>
      <Link to="/createaccount">
       
     
      <button className="dashboard-button">Sign Up</button>
      </Link>
    </div>
  );
};

export default Dashboard;
