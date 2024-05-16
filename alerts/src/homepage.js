// import React from 'react';
// import './homepage.css'; // Import the CSS file
// import homeimg from './homeimg.jpg'; // Import the image
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div className="home-container">
//       <h1>MediFood Alerts</h1>
//       <img src={homeimg} alt="MediFood Image" className="home-image" />
//       <Link to="/dashboard">
//         <button>Next</button>
//       </Link>
//     </div>
//   );
// };

// export default HomePage;




// HomePage component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css'; // Import the CSS file
import homeimg from './homeimg.jpg'; // Import the image

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home-container">
      <h1>MediFood Alerts</h1>
      <img src={homeimg} alt="MediFood Image" className="home-image" />
      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default HomePage;
