// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './create.css'

// const CreateAccount = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     setError('');
//     setSuccessMessage('');
  
//     // Validate form fields
//     if (!name.trim() || !email.trim() || !password.trim() || !mobileNumber.trim()) {
//       setError('All fields are required');
//       return;
//     }
  
//     // Additional password and email format validation checks...
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }
//     if (!/[A-Z]/.test(password)) {
//       setError('Password must contain at least one uppercase letter');
//       return;
//     }
//     if (!/[a-z]/.test(password)) {
//       setError('Password must contain at least one lowercase letter');
//       return;
//     }
//     if (!/\d/.test(password)) {
//       setError('Password must contain at least one digit');
//       return;
//     }
//     if (!/[^A-Za-z0-9]/.test(password)) {
//       setError('Password must contain at least one special character');
//       return;
//     }
//     if (mobileNumber.length !== 10) {
//       setError('Mobile number must be 10 digits long');
//       return;
//     }
//     if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
//       setError('Invalid email format');
//       return;
//     }
  
//     const userData = { email, name, password, mobileNumber };
  
//     // Store user data in localStorage (optional)
//     localStorage.setItem('userData', JSON.stringify(userData));
  
//     try {
//       const response = await axios.post('http://localhost:3004/send-otp', { email });
//       console.log("udfuysd")
//       console.log('Response from server:', response.data);
  
//       if (response.data.success) {
//         setSuccessMessage('OTP sent successfully!');
//         navigate('/verify-otp'); // Navigate to OTP verification page
//       } else {
//         setError('Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div id="container">
//       <h2 id="head">Sign Up</h2>
//       <form id="form" onSubmit={handleSubmit}>
//         {error && <div className="error">{error}</div>}
//         {successMessage && <div className="success">{successMessage}</div>}
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="mobile_number">Mobile Number:</label>
//           <input
//             type="tel"
//             id="mobile_number"
//             name="mobile_number"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//             placeholder="Enter your 10-digit mobile number"
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAccount;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './create.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate form fields
    if (!name.trim() || !email.trim() || !password.trim() || !mobileNumber.trim()) {
      setError('All fields are required');
      return;
    }

    // Additional password and email format validation checks
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return;
    }
    if (!/\d/.test(password)) {
      setError('Password must contain at least one digit');
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError('Password must contain at least one special character');
      return;
    }
    if (mobileNumber.length !== 10) {
      setError('Mobile number must be 10 digits long');
      return;
    }
    if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    const userData = { email, name, password, mobileNumber };

    // Store user data in localStorage (optional)
    localStorage.setItem('userData', JSON.stringify(userData));

    try {
      const response = await axios.post('http://localhost:3004/send-otp', { email });
      console.log('Response from server:', response.data);

      if (response.data.success) {
        setSuccessMessage('OTP sent successfully!');
        navigate('/verify-otp'); // Navigate to OTP verification page
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div id="container">
      <form id="form" onSubmit={handleSubmit}>
        <h2 id="head">Sign Up</h2>
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
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            type="tel"
            id="mobile_number"
            name="mobile_number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your 10-digit mobile number"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateAccount;

