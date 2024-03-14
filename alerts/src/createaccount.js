import React, { useState } from 'react';
import './create.css';
import axios from 'axios';

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !mobile_number) {
      setError("All fields are required");
      return;
    }

    // Mobile number validation
    if (mobile_number.length !== 10 || isNaN(mobile_number)) {
      setError("Mobile number should be 10 digits");
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password should contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email is not in correct format");
      return;
    }

    setError("");

    try {
      const response = await axios.post('http://localhost:3004/create-account', {
        name,
        email,
        password,
        mobile_number
      });
      console.log(response.data);
    } catch(error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div id="container">
      <h2 id="head">Sign Up</h2>
      <form id="form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
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
