
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const VerifyOTP = () => {
//   const navigate = useNavigate(); 
//   const [otp, setOTP] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     setError('');
//     setSuccessMessage('');
  
//     if (!otp.trim()) {
//       setError('Please enter the OTP');
//       return;
//     }
  
//     const userDataString = localStorage.getItem('userData');
//     if (!userDataString) {
//       setError('User data not found. Please sign up again.');
//       return;
//     }
  
//     const userData = JSON.parse(userDataString);
  
//     try {
//       const otpVerificationResponse = await axios.post('http://localhost:3004/verify-otp', {
//         email: userData.email,
//         otp: otp
//       });
  
//       if (otpVerificationResponse.data.success) {
//         const saveUserResponse = await axios.post('http://localhost:3004/save-user', userData);
  
//         if (saveUserResponse.data.success) {
//           setSuccessMessage('User details saved successfully!');
//           localStorage.removeItem('userData'); // Clear local storage after successful save
//           navigate('/login'); // Redirect to login page
//         } 
//       } 
//     } catch (error) {
//       console.error('Error:', error);
//       if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
//         setError('Email already exists. Please use a different email.'); // Update error message
//       }
//       else if (error.response && error.response.data && error.response.data.error === 'Name already exists') {
//         setError('username already exists. Please use a different name.'); // Update error message
//       }
//       else if (error.response && error.response.data && error.response.data.error === 'Invalid OTP. Please enter the correct OTP') {
//         setError('Invalid OTP. Please enter the correct OTP'); // Update error message
//       }
//        else {
//         setError('An error occurred. Please try again later.'); // Generic error message
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Verify OTP</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <div className="error">{error}</div>}
//         {successMessage && <div className="success">{successMessage}</div>}
//         <div>
//           <label>OTP:</label>
//           <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />
//         </div>
//         <button type="submit">Verify OTP</button>
//       </form>
//     </div>
//   );
// };

// export default VerifyOTP;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './verify.css';

const VerifyOTP = () => {
  const navigate = useNavigate(); 
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    setSuccessMessage('');
  
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
  
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      setError('User data not found. Please sign up again.');
      return;
    }
  
    const userData = JSON.parse(userDataString);
  
    try {
      const otpVerificationResponse = await axios.post('http://localhost:3004/verify-otp', {
        email: userData.email,
        otp: otp
      });
  
      if (otpVerificationResponse.data.success) {
        const saveUserResponse = await axios.post('http://localhost:3004/save-user', userData);
  
        if (saveUserResponse.data.success) {
          setSuccessMessage('User details saved successfully!');
          localStorage.removeItem('userData'); // Clear local storage after successful save
          navigate('/login'); // Redirect to login page
        } 
      } 
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
        setError('Email already exists. Please use a different email.'); // Update error message
      }
      else if (error.response && error.response.data && error.response.data.error === 'Name already exists') {
        setError('username already exists. Please use a different name.'); // Update error message
      }
      else if (error.response && error.response.data && error.response.data.error === 'Invalid OTP. Please enter the correct OTP') {
        setError('Invalid OTP. Please enter the correct OTP'); // Update error message
      }
       else {
        setError('An error occurred. Please try again later.'); // Generic error message
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Verify OTP</h2>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTP;

