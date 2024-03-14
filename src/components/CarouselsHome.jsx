import React from "react";
import { Card, Carousel, Container } from "react-bootstrap";
import img2 from "../asset/carouselImage/img2.jpg";
import img3 from "../asset/carouselImage/img3.jpg";
import img4 from "../asset/carouselImage/img4.gif";
import img5 from "../asset/carouselImage/img5.jpg";
import img6 from "../asset/carouselImage/img6.jpeg";
import img7 from "../asset/carouselImage/img7.jpeg";
import img8 from "../asset/carouselImage/img8.jpeg";
import img9 from "../asset/carouselImage/img9.jpeg";
import { Button } from "@mui/material";

const CarouselsHome = () => {
  return (
    <Card responsive className="border border-0 shadow">
      <Card.Body>
        <Carousel>
          <Carousel.Item>
            <img src={img3} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={img2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={img4} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={img5} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={img6} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={img7} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={img8} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={img9} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </Card.Body>
    </Card>
  );
};

export default CarouselsHome;
