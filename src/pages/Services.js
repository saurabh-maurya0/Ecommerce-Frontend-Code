import React from "react";
import "./Services.css"; // Assuming you have a Product.css file for custom styles
import { Link } from "react-router-dom";
//import img
import s1 from '../asset/servicesImg/s1.jpg'
import s2 from '../asset/servicesImg/s2.jpg'
import s3 from '../asset/servicesImg/s3.gif'
import s4 from '../asset/servicesImg/s4.jpg'
import s5 from '../asset/servicesImg/s5.jpg'
import s6 from '../asset/servicesImg/s6.jpg'
import Footer from "../components/Footer";


const Services = () => {
  return (
    <>
      <div className="position-relative overflow-hidden p-3 p-md m-md shadow text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal ">Future Tech Phones</h1>
          <p className="lead font-weight-normal">
            Innovative, sleek, powerful phones for cutting-edge experiences
          </p>
          <Link className="btn btn-outline-warning" to="/stores">
            Coming soon
          </Link>
        </div>
        <div className="product-device box-shadow d-none d-md-block"></div>
        <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
      </div>

      <div className="d-md-flex flex-md-equal w-100">
        <div className="bg-white pt-3 px-3 text-center text-dark overflow-hidden">
          <div className=" py-3">
            <h2 className="display-5">NeuroSync Horizon</h2>
            <p className="lead"> Revolutionizing Communication in the Digital Epoch.</p>
          </div>
          <div
            className="box-shadow mx-auto  "
            style={{
              width: "100%",
              height: "400px",
              borderRadius:"23px",
             
            }}
          
          > <img src={s1}  style={{objectFit:"contain",  borderRadius:"23px",  width: "100%",
          height: "100%",}} alt="" /></div>
        </div>
        <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">QuantumBeat Pro</h2>
            <p className="lead"> Redmi's Vision for the Future in True Wireless Audio.</p>
          </div>
          <div
            className="bg-light box-shadow mx-auto "
            style={{
              width: "100%",
              height: "400px",
              borderRadius:"23px",
            }}
          >
          <img src={s2}  style={{objectFit:"contain",  borderRadius:"23px",  width: "100%",
          height: "100%",}} alt="" />
          </div>
        </div>
      </div>

      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">CogniCore Nexus</h2>
            <p className="lead">The AI-Powered Revolution in Mobile Innovation.</p>
          </div>
          <div
            className=" box-shadow mx-auto"
            style={{
              width: "100%",
              height: "400px",
              borderRadius:"23px",
            }}
          > <img src={s3}  style={{objectFit:"contain",  borderRadius:"23px",  width: "100%",
          height: "100%"}} alt="" /></div>
        </div>
        <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-darkoverflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">InfinityEdge Quantum</h2>
            <p className="lead">A Seamless Leap into Tomorrow's Mobile World.</p>
          </div>
          <div
            className=" box-shadow mx-auto"
            style={{
              width: "100%",
              height: "400px",
              borderRadius:"50px",
            }}
          > <img src={s4}  style={{objectFit:"contain",  borderRadius:"23px",  width: "100%",
          height: "100%"}} alt="" /></div>
        </div>
      </div>

      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">PlasmaPulse Horizon</h2>
            <p className="lead">The Next Frontier in Futuristic Mobile Technology.</p>
          </div>
          <div
            className="bg-white box-shadow mx-auto"
            style={{
              width: "100%",
              height: "400px",
              borderRadius:"23px",
            }}
          > <img src={s5}  style={{objectFit:"contain",  borderRadius:"23px",  width: "100%",
          height: "100%"}} alt="" /></div>
        </div>
        <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">NeuroLink Harmony</h2>
            <p className="lead">Apple's Vision for the Next Era in Smartwatch Technology.</p>
          </div>
          <div
            className="bg-white box-shadow mx-auto"
            style={{
              width: "100%",
              height: "400px",
              borderRadius:"23px",
            }}
          > <img src={s6}  style={{objectFit:"contain",  borderRadius:"23px",  width: "100%",
          height: "100%"}} alt="" /></div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Services;
