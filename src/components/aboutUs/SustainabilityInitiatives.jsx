// SustainabilityInitiatives.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './SustainabilityInitiatives.css';

const SustainabilityInitiatives = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="sustainability-container">
      <div className="sustainability-content">
        <h2>Our Sustainability Initiatives</h2>
        <p>
          At [Your Company Name], we are committed to making a positive impact on the environment.
          Explore our sustainability initiatives below:
        </p>
        <ul>
          <li>Environmentally friendly packaging options</li>
          <li>Carbon-neutral shipping</li>
          <li>Product recycling programs</li>
          {/* Add more sustainability initiatives as needed */}
        </ul>
      </div>
      <div className="sustainability-image">
        {/* You can add an image related to sustainability here */}
      </div>
    </animated.div>
  );
};

export default SustainabilityInitiatives;
