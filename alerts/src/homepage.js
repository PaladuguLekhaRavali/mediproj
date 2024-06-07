// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// import homeimg from './homeimg.jpg'; // Import the image
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HomePage = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-sm-12 col-md-6 offset-md-3 text-center">
         
//           <h1 className="mt-5 mb-4">MediFood Alerts</h1>
//           <img src={homeimg} alt="MediFood Image" className="img-fluid mb-4" />
//           <button className="btn btn-primary" onClick={handleClick}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import homeimg from './homeimg.jpg'; // Import the image
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [animationText, setAnimationText] = useState('');
//   const [animationFinished, setAnimationFinished] = useState(false);
//   useEffect(() => {
//     const text = "Get Scheduled Notifications......";
//     let currentIndex = 0;
//     const interval = setInterval(() => {
//       if (currentIndex < text.length) {
//         setAnimationText(text.substring(0, currentIndex + 1));
//         currentIndex++;
//       } else {
//         clearInterval(interval);
//         setAnimationFinished(true);
//       }
//     }, 100);
  
//     return () => clearInterval(interval);
//   }, []);


//   const handleGetStarted = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="container-fluid" style={{ backgroundColor: '#00ABE1', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div className="text-center">
//         <h1 style={{ color: '#ffffff' }}>MediFood Alerts</h1>
//         <img src={homeimg} alt="MediFood" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />
//         <p style={{ color: '#161F6D', fontSize: '2rem', fontWeight: 'bold' }}>{animationText}</p>
//         {animationFinished && (
//           <button onClick={handleGetStarted} className="btn" style={{ backgroundColor: '#161F6D', color: '#ffffff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>Get Started</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;\
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import homeimg from './homeimg.jpg'; // Import the image
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  const navigate = useNavigate();
  const [animationText, setAnimationText] = useState('');
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const text = "Get Scheduled Notifications......";
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setAnimationText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setAnimationFinished(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/remainder');
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#00ABE1', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <h1 style={{ fontSize: '2.5rem',  fontFamily:'cursive' }}>
          {Array.from("MediFood Alerts").map((letter, index) => (
            <span key={index} style={{ color: index % 2 === 0 ? '#ffffff' : '#161F6D' }}>
              {letter}
            </span>
          ))}
        </h1>
        <img src={homeimg} alt="MediFood" className="img-fluid mb-4" style={{ width: '400px', height: '300px' }} />
        <p style={{ color: '#161F6D', fontSize: '1.5rem', fontWeight: 'bold' }}>{animationText}</p>
        {animationFinished && (
          <button onClick={handleGetStarted} className="btn" style={{ backgroundColor: '#161F6D', color: '#ffffff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>Get Started</button>
        )}
      </div>
    </div>
  );
};

export default HomePage;