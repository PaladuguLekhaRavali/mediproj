import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

import './login.css';

const LoginForm = () => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [error, setError] = useState(null); // State to hold error message

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await axios.post('http://localhost:3004/login', { username, password });

      if (response.status === 200) {
        // Store the username in local storage
        localStorage.setItem('username', username);
        
        // Navigate to Remainders page upon successful login
        navigate('/remainder'); // Use navigate to navigate to '/remainders'
      } else {
        // Handle unsuccessful login (e.g., invalid credentials)
        if (response.status === 401) {
          setError('Invalid username or password'); // Set error message for invalid credentials
        } else {
          // Other server errors
          setError(`Login failed with status ${response.status}. Please try again.`);
        }
      }
    } catch (error) {
      // Handle network errors or exceptions
      if (error.response && error.response.data && error.response.data.error) {
        // Server responded with a specific error message
        const serverError = error.response.data.error;
        if (serverError === 'Invalid username or password') {
          setError('Invalid username or password.');
        } else {
          setError(`Error from server: ${serverError}`);
        }
      } else {
        // Generic error message for other types of errors
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">UserName</label>
          <input type="text" id="email" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        {error && <p className="error-message">{error}</p>} {/* Render error message if exists */}
      </form>
    </div>
  );
};

export default LoginForm;
