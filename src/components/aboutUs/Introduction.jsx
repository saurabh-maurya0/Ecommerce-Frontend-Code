// Introduction.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './introduction.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Introduction = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="intro-container">
      <div className="intro-content">
        <h2>Welcome to Our Company</h2>
        <p>
        Dedicated to excellence, our passionate team collaborates tirelessly to deliver top-notch products and services. Fueled by a commitment to quality, we strive for customer satisfaction and continual innovation in every endeavor.
        </p>
        <Button
        as={Link}
        to={'/'}
        size="large"
        variant="contained"
        color="warning"
      >
        Shop Now
      </Button> 
      </div>
      <div className="intro-image">
        {/* You can add an image here */}
      </div>
    </animated.div>
  );
};

export default Introduction;
