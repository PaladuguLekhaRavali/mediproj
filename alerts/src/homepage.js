import React from 'react';
import './homepage.css'; // Import the CSS file
import homeimg from './homeimg.jpg'; // Import the image
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>MediFood Alerts</h1>
      <img src={homeimg} alt="MediFood Image" className="home-image" />
      <Link to="/dashboard">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default HomePage;
