// QualityCommitment.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './QualityCommitment.css';

const QualityCommitment = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="quality-commitment-container">
      <div className="quality-commitment-content">
        <h2>Our Commitment to Quality</h2>
        <p>
          At <b>QuickBazaar</b>, we are dedicated to providing our customers with the highest quality products.
          Our commitment to quality extends from the selection of raw materials to the final delivery of
          your order.
        </p>
        <p>
          We rigorously test and inspect our products to ensure they meet and exceed industry standards.
          Your satisfaction with our products is our top priority.
        </p>
      </div>
      <div className="quality-commitment-image">
        {/* You can add an image here */}
      </div>
    </animated.div>
  );
};

export default QualityCommitment;
