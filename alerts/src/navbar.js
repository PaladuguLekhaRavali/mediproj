// Navbar component
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      
      <button onClick={() => navigate('/requestcomponent')}>Requests</button>
      <button onClick={() => navigate('/remainder')}>Remainder</button>
    </div>
  );
};

export default Navbar;