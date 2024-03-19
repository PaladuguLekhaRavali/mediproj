import React from 'react';
import './fifth.css'; 
import foodImage from './images3.jpg'; 
import medicineImage from './images4.jpg'; 
const Remainders = () => {
  return (
    <div>
      <header>
        <h1>Remainders</h1>
      </header>
      <div className="container">
        <div className="food-related">
          <img src={foodImage} alt="Food Image" />
          <div className="text">
            <button className="title">FOOD RELATED</button>
            <h2>Remainders</h2>
          </div>
        </div>
        <div className="medicine-related">
          <div className="text">
            <button className="title">MEDICINE RELATED</button>
            <h2>Remainders</h2>
          </div>
          <img src={medicineImage} alt="Medicine Image" />
        </div>
      </div>
    </div>
  );
};

export default Remainders;
