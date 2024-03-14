// CustomerCentricApproach.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './CustomerCentricApproach.css';
import { Col, Container, Row } from 'react-bootstrap';

const CustomerCentricApproach = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="customer-centric-container">
   <Row>
   <Col md={2}><Container> <img style={{borderRadius:"17px", objectFit:"cover" , height:"200px", width:"300px"}} src="https://images.pexels.com/photos/7564196/pexels-photo-7564196.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" /></Container></Col>
   <Col md={10}><div className="customer-centric-content  justify-content-center text-aligns-center">
        <h2>Our Customer-Centric Approach</h2>
        <p>
          At <b>QuickBazaar</b>, our customers are at the heart of everything we do.
          We strive to provide an exceptional shopping experience tailored to your needs.
        </p>
        <p>
          From user-friendly interfaces to personalized recommendations, we are dedicated
          to making your online shopping journey seamless and enjoyable.
        </p>
      </div></Col>
   </Row>
      
    </animated.div>
  );
};

export default CustomerCentricApproach;
