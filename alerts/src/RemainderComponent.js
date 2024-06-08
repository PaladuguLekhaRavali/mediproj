
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './remainder.css';

const Navbar = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }

    // Auto-rotate features every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const features = [
    { title: 'Remainder History', text: 'It contains the history about the remainders you created like message,receiver name,status' },
    { title: 'Requests', text: 'It show the requests from the friends we can accept or reject the request' },
    { title: 'Create Remainders', text: 'We can create remianders if we are friends with scheduled time and message.' },
    { title: 'Sent Requests', text: 'We can send Friend Requests to the friends.' },
    { title: 'Expiry Remainder', text: 'We can set expiry remainders too ourself with item name.' }
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-image bg-fixed" style={{ backgroundColor: '#161F6D' }} >
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/" style={{ color: '#00ABE1', fontSize: '30px' }}>MediFood Alerts</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" ></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/remainderhistory" style={{
                  color: '#00ABE1',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease', // Smooth transition
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'} // Change color on hover
                onMouseLeave={(e) => e.target.style.color = '#00ABE1'}>Remainders History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/requests" style={{
                  color: '#00ABE1',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease', // Smooth transition
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'} // Change color on hover
                onMouseLeave={(e) => e.target.style.color = '#00ABE1'}>Requests</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createreminder" style={{
                  color: '#00ABE1',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease', // Smooth transition
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'} // Change color on hover
                onMouseLeave={(e) => e.target.style.color = '#00ABE1'}>Create Remainder</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-request" style={{
                  color: '#00ABE1',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease', // Smooth transition
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'} // Change color on hover
                onMouseLeave={(e) => e.target.style.color = '#00ABE1'}>Send Requests</Link>
              </li>
              <li className="nav-item bold-text">
                <Link className="nav-link" to="/expiryde" style={{
                  color: '#00ABE1',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease', // Smooth transition
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'} // Change color on hover
                onMouseLeave={(e) => e.target.style.color = '#00ABE1'}>Expiry Remainder</Link>
              </li>
              {isAuthenticated? (
                <li className="nav-item dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    aria-expanded={showDropdown} onClick={toggleDropdown} style={{ backgroundColor: '#00ABE1' }}>
                    {username}
                  </button>
                  <ul className={`dropdown-menu ${showDropdown? 'how' : ''}`} aria-labelledby="dropdownMenuButton">
                    <li><button className="dropdown-item" onClick={handleSignOut} style={{ color: '#00ABE1', fontSize: '20px' }}>Sign Out</button></li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <button className="btn btn-primary" onClick={() => handleNavigation("/create-account")} style={{ backgroundColor: '#00ABE1', fontSize: '20px' }}>Sign Up</button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-primary" onClick={() => handleNavigation("/login")} style={{ backgroundColor: '#00ABE1', fontSize: '20px', fontWeight: 'bold' }}>Sign In</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body" style={{ backgroundColor: '#161F6D', color: 'white', fontSize: '40px' }}>
                <h5 className="card-title" style={{ backgroundColor: '#00ABE1', color: '#161F6D', fontSize: '60px' }}>{features[currentFeatureIndex].title}</h5>
                <p className="card-text">{features[currentFeatureIndex].text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

