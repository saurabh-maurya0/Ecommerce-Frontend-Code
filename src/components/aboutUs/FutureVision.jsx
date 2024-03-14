// FutureVision.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './FutureVision.css';

const FutureVision = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="future-vision-container">
      <div className="future-vision-content">
        <h2>Our Future Vision</h2>
        <p>
          At XYZ Ecommerce, we aspire to redefine the online shopping experience by
          continuously innovating and delivering exceptional products and services to
          our customers.
        </p>
        <p>
          Our vision is to become a leading force in the ecommerce industry, providing
          cutting-edge technology, sustainable practices, and unparalleled customer
          satisfaction.
        </p>
      </div>
    </animated.div>
  );
};

export default FutureVision;
