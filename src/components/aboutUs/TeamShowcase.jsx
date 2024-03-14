// TeamShowcase.js
import React from 'react';
import { useTrail, animated } from 'react-spring';
import './TeamShowcase.css';
import img from '../../asset/s5.jpg'
const teamMembers = [
  { id: 1, name: 'Saurabh Maurya', role: 'Software Devloper', description: 'Hey, I am Saurabh Maurya, a visionary Full Stack Software Developer. With expertise in Java, Spring, Hibernate, MySQL, HTML, CSS, and React.js, I lead by example, fostering effective communication and collaboration. My commitment to continuous learning drives the delivery of exceptional solutions, defining the ethos of our foundation..' },
 
];

const TeamShowcase = () => {
  const trail = useTrail(teamMembers.length, {
    opacity: 1,
    transform: 'translateX(0px)',
    from: { opacity: 0, transform: 'translateX(-50px)' },
    config: { mass: 1, tension: 300, friction: 20 },
  });

  return (
    <div className="team-showcase-container d-flex">
      {trail.map((style, index) => (
        <animated.div key={teamMembers[index].id} style={style} className="team-member">
        <img src={img} style={{width:"100px", height:"100px", objectFit:'cover'}} className='rounded-circle shadow mb-2' alt="" />
          <h3>{teamMembers[index].name}</h3>
          <p className="role">{teamMembers[index].role}</p>
          <p className='d-flex align-items-center justify-content-center'>{teamMembers[index].description}</p>
        </animated.div>
      ))}
    </div>
  );
};

export default TeamShowcase;
