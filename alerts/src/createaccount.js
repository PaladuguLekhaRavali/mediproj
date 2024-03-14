import React, { useState } from 'react';
import './create.css';
import axios from 'axios';

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setError("");
    setSuccessMessage("");

    // Basic validation...
    
    try {
      const response = await axios.post('http://localhost:3004/create-account', {
        name,
        email,
        password,
        mobile_number
      });

      // Check response for success or error message
      if (response.data.message) {
        setSuccessMessage(response.data.message);
      }
    } catch(error) {
      console.error("Error:", error);
      // Check for specific error messages
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div id="container">
      <h2 id="head">Sign Up</h2>
      <form id="form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            type="tel"
            id="mobile_number"
            name="mobile_number"
            value={mobile_number}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your 10-digit mobile number"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateAccount;
