import React from 'react';
import './dashboars.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/create-account');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Dashboard</h1>
      <button className="dashboard-button" onClick={handleLoginClick}>Login</button>
      <button className="dashboard-button" onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
};

export default Dashboard;
