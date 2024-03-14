// CommunityInvolvement.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './CommunityInvolvement.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { LAPTOP_CAT_ID } from '../../services/HelperService';

const CommunityInvolvement = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="community-container">
      <div className="community-content">
        <h2>Our Community Involvement</h2>
        <p>
          At QuikBazaar, we believe in giving back to the community. We actively participate in
          various social initiatives and environmental projects to make a positive impact.
        </p> <Button
        as={Link}
        to={'/'}
        size="large"
        variant="contained"
        color="primary"
      >
        Explore
      </Button> 
      </div>
      <div className="community-image">
        {/* You can add an image related to community involvement here */}
      </div>
    </animated.div>
  );
};

export default CommunityInvolvement;
