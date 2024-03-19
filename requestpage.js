import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './requestpage.css'; // Import your CSS file for 
import  { useState } from 'react';

// Navbar component
const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">This Page</Link>
      <Link to="/requestcomponent">Requests</Link>
      <Link to="/remainder">Remainder</Link>
    </div>
  );
};

// RequestsComponent
const RequestsComponent = () => {
  return (
    <div className="component">
      <h2>Requests Component</h2>
      <Link to="/create-request">Create Request</Link>
      <Link to="/requests-to-us">Requests to Us</Link>
      <Link to="/requestsstatus">Request Status</Link>
    </div>
  );
};

// CreateRequest component
const CreateRequest = () => {
    const [mobileNumber, setMobileNumber] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic to handle form submission (e.g., sending data to the server)
      console.log('Submitted mobile number:', mobileNumber);
      // Reset the mobile number input after submission
      setMobileNumber('');
    };
  
    return (
      <div className="create-request">
        <h2>Create Request</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
};

// RequestStatus component
const RequestStatus = () => {
  return (
    <div className="component">
      <h2>Request Status</h2>
      {/* Content for request status */}
    </div>
  );
};

// RequestsToUs component
const RequestsToUs = () => {
  return (
    <div className="component">
      <h2>Requests to Us Component</h2>
      {/* Content for Requests to Us */}
    </div>
  );
};

// RemainderComponent
const RemainderComponent = () => {
  return (
    <div className="component">
      <h2>Remainder Component</h2>
    </div>
  );
};

// ThisPage component
const ThisPage = () => {
  return (
    <div className="component">
      <h2>This Page</h2>
    </div>
  );
};

// App component
const Requests = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="body">
        <Routes>
          <Route path="/" element={<ThisPage />} />
          <Route path="/requestcomponent" element={<RequestsComponent />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/requests-to-us" element={<RequestsToUs />} />
          <Route path="/remainder" element={<RemainderComponent />} />
          <Route path="/requestsstatus" element={<RequestStatus />} />
        </Routes>
      </div>
    </div>
  );
};

export { Navbar, RequestsComponent, CreateRequest, RequestStatus, RequestsToUs, RemainderComponent, ThisPage, Requests };

