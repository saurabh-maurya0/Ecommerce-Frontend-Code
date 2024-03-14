import { Button } from "@mui/material";
import { Badge, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, json, useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../services/HelperService";
import defaultProductImage from "./../asset/default-product-image.png";
import ShowHtml from "../components/ShowHtml";
import SingleProductCard from "../components/users/SingleProductCard";
import "./../components/HomePageComponent.css";
//import category id

import { LAPTOP_CAT_ID } from "../services/HelperService";
import { MEN_CAT_ID } from "../services/HelperService";
import { WOMEN_CAT_ID } from "../services/HelperService";
import { WATCH_CAT_ID } from "../services/HelperService";
import { BEAUTY_CAT_ID } from "../services/HelperService";
import { LIGHT_CAT_ID } from "../services/HelperService";
import { WINTER_CAT_ID } from "../services/HelperService";
import { STUDY_CAT_ID } from "../services/HelperService";
import { KITCHEN_CAT_ID } from "../services/HelperService";
import { GIFT_CAT_ID } from "../services/HelperService";

//light card
import l1 from "../asset/lightCard/l1.jpg";
import l2 from "../asset/lightCard/l2.jpg";
import l3 from "../asset/lightCard/l3.jpg";
import l4 from "../asset/lightCard/l4.jpg";
import l5 from "../asset/lightCard/l5.jpg";
import l6 from "../asset/lightCard/l6.jpg";
import l7 from "../asset/lightCard/l7.jpg";
import l8 from "../asset/lightCard/l8.jpg";

// wenter Card
import we1 from "../asset/wenterCard/we1.jpg";
import we2 from "../asset/wenterCard/we2.jpg";
import we3 from "../asset/wenterCard/we3.jpg";
import we4 from "../asset/wenterCard/we4.jpg";
import we5 from "../asset/wenterCard/we5.jpg";
import we6 from "../asset/wenterCard/we6.jpg";
import we7 from "../asset/wenterCard/we7.jpg";
import we8 from "../asset/wenterCard/we8.jpg";

//studyLamp card
import t1 from "../asset/studylamp/t1.jpg";
import t2 from "../asset/studylamp/t2.jpg";
import t3 from "../asset/studylamp/t3.jpg";
import t4 from "../asset/studylamp/t4.jpg";
import t5 from "../asset/studylamp/t5.jpg";
import t6 from "../asset/studylamp/t6.jpg";
import t7 from "../asset/studylamp/t7.jpg";
import t8 from "../asset/studylamp/t8.jpg";

//Kitchen Card

import k1 from "../asset/kitchenItems/k1.jpg";
import k2 from "../asset/kitchenItems/k2.jpg";
import k3 from "../asset/kitchenItems/k3.jpg";
import k4 from "../asset/kitchenItems/k4.jpg";
import k5 from "../asset/kitchenItems/k5.jpg";
import k6 from "../asset/kitchenItems/k6.jpg";
import k7 from "../asset/kitchenItems/k7.jpg";
import k8 from "../asset/kitchenItems/k8.jpg";

//slider gift
import g1 from "../asset/gift/g1.jpg";
import g2 from "../asset/gift/g2.jpg";
import g3 from "../asset/gift/g3.jpg";
import g4 from "../asset/gift/g4.jpg";
import g5 from "../asset/gift/g5.jpg";
import g6 from "../asset/gift/g6.jpg";
import g7 from "../asset/gift/g7.jpg";
import g8 from "../asset/gift/g8.jpg";

//slider watch

import w1 from "../asset/watch/sliderWatch/w1.png";
import w2 from "../asset/watch/sliderWatch/w2.gif";
import w3 from "../asset/watch/sliderWatch/w3.gif";
import w4 from "../asset/watch/sliderWatch/w4.jpg";
import w5 from "../asset/watch/sliderWatch/w5.gif";
import w6 from "../asset/watch/sliderWatch/w6.jpg";
import w7 from "../asset/watch/sliderWatch/w7.jpg";
import w8 from "../asset/watch/sliderWatch/w8.jpg";

//card slider

import ReactCardSlider from "react-card-slider-component";

//import watch
import boat from "../asset/watch/boat.gif";
import watch from "../asset/watch/Watch.jpg";
import viratWatch from "../asset/watch/viratWatch.jpg";
//import image from assest sale
import sale from "../asset/sale/sale.gif";
import image1 from "../asset/sale/image1.gif";
import img from "../asset/sale/mens.gif";
import image2 from "../asset/sale/image2.png";
import image3 from "../asset/sale/image3.png";
import addver from "../asset/sale/add.png";
//import image from carouselImage

import a2 from "../asset/carouselImage/a2.gif";
import a3 from "../asset/carouselImage/a3.gif";
import a8 from "../asset/carouselImage/a8.gif";
import a4 from "../asset/carouselImage/a4.jpg";
import a6 from "../asset/carouselImage/a6.jpg";
import a7 from "../asset/carouselImage/a7.jpg";
import { useEffect, useRef, useState } from "react";
import "../pages/HomePageComponent.css";
import { toast } from "react-toastify";

export const TrendingProducts = (products) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsHovered((prevHover) => !prevHover);
    }, 2000); // Toggle every 2 seconds (adjust as needed)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const headingStyles = {
    textAlign: "center",

    // paddingBottom: '1.5rem', // Adjust the value as needed
    color: isHovered ? "#ffcc00" : "#000", // Change the color on hover

    display: "inline-block", // Add this line to limit the background to the text
    animation: "blinking 1s infinite, colorChange 1s infinite", // Apply animations
  };
  return (
    <Container>
      <Row>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h3 className=" text-center mb-4 pb-4">
              <Badge style={{ backgroundColor: "#ff8000" }} bg="#ff8000">
                {" "}
                <span style={headingStyles}>Treading Product List</span>
              </Badge>
            </h3>
          </Col>
        </Row>
        {products.map((product) => (
          <Col md={4}>
            <SingleProductCard products={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
//function for image Right

export const infoWithImageInRightSection = (text, title) => {
  return (
    <Container  fluid>
      <Row className="common">
        <Col className="text-center  ">
          <h3>{title}</h3>
          <Container>
            <p>{text}</p>
          </Container>
          <Button
            className="m-2"
            variant="contained"
            color="error"
            as={Link}
            to={`/store/${MEN_CAT_ID}/Men's%20Fashion`}
          >
            Store
          </Button>
        </Col>
        <Col className="text-center mt-3">
          <Container fluid className="border border-0 shadow p-0 ">
            <a href={`/store/${MEN_CAT_ID}/Men's%20Fashion`}>
              {" "}
              <img
                style={{ height: "250px", width: "100%", objectFit: "cover" }}
                src={img}
                className="rounded shadow-lg border border-0"
                alt=""
              />
            </a>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

//function for image left
export const infoWithImageInLeftBotomSection = (text, title) => {
  return (
    <Container>
      <Row className="common">
        <Col className="text-center mt-3">
          <Container fluid className="border border-0 shadow p-0 ">
            <a href={`/store/${WOMEN_CAT_ID}/Women's%20Fashion`}>
              {" "}
              <img
                style={{ height: "250px", width: "100%" }}
                src={image1}
                className="rounded shadow-lg border border-0"
                alt=""
              />
            </a>
          </Container>
        </Col>
        <Col className="text-center mt-5">
          <h3>{title}</h3>
          <p>{text}</p>
          <Button
            className="m-2"
            variant="contained"
            color="warning"
            as={Link}
            to={`/store/${WOMEN_CAT_ID}/Women's%20Fashion`}
          >
            Visit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export const infoWithImageInRightBotomSection = (text, title) => {
  return (
    <Container>
      <Row className="common">
        <Col className="text-center mt-5">
          <h3>{title}</h3>
          <Container>
            <p>{text}</p>
          </Container>
          <Button
            className="m-2"
            variant="contained"
            color="error"
            as={Link}
            to={`/store/${BEAUTY_CAT_ID}/Beauty`}
          >
            Start
          </Button>
        </Col>
        <Col className="text-center mt-3">
          <Container fluid className="border border-0 shadow p-0 ">
            <a href={`/store/${BEAUTY_CAT_ID}/Beauty`}>
              <img
                style={{ height: "250px", width: "100%" }}
                src={image2}
                className="rounded shadow-lg border border-0"
                alt=""
              />
            </a>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

//function for image left
export const infoWithImageInLeftTopSection = (text, title) => {
  return (
    <Container>
      <Row className="common">
        <Col className="text-center mt-3">
          <Container fluid className="border border-0 shadow p-0 ">
            <a href={`/store/${WATCH_CAT_ID}/Wrist%20Watch`}>
              {" "}
              <img
                style={{ height: "250px", width: "100%" }}
                src={image3}
                className="rounded shadow-lg border border-0"
                alt=""
              />
            </a>
          </Container>
        </Col>
        <Col className="text-center mt-5">
          <h3>{title}</h3>
          <Container>
            <p>{text}</p>
          </Container>
          <Button
            className="m-2"
            variant="contained"
            color="warning"
            as={Link}
            to={`/store/${WATCH_CAT_ID}/Wrist%20Watch`}
          >
            Shop Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

//contact us form

export const ContactForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const submitForm = (event) => {
    event.preventDefault();

    //validate client side
    if (data.name == undefined || data.name.trim() == "") {
      toast.error("Name is required !!");
      return;
    }
    //validate client side
    if (data.email == undefined || data.email.trim() == "") {
      toast.error("Email is required !!");
      return;
    }
    console.log(data);
    toast.success("Thank you for Contacting Us!");
    navigate("/");
    //all right
    //call api
  };

  //handle change

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };
  return (
    <Container>
      <Card className="border border-0 shadow">
        <Card.Body>
          <Container className="text-center ">
            <img
              src="logo.png"
              alt="logo"
              height={100}
              width={100}
              style={{ objectFit: "cover" }}
            />
          </Container>
          <h3 className="text-center mb-4 display-6 fw-bold txt-logo-color ">
            Contact Us
          </h3>
          <Form onSubmit={submitForm}>
            <Container>
              {" "}
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Enter Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "name")}
                  value={data.name}
                />
              </Form.Group>{" "}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "email")}
                  value={data.email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Write Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "message")}
                  value={data.message}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Container className="text-center m-3">
                <Button
                  size="large"
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Submit
                </Button>
              </Container>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

//light card

export const LightCard = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: l5,
      title: "Bonsai Tree Light",
      description: "Wedding,Bedroom,Gifts (36 LED) Plastic",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },

    {
      image: l2,
      title: "Wall Lamp, Wall Mount Light",
      description: "Home Decor Items- Brown(Corded Electric)",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },

    {
      image: l8,
      title: "Maple Leaf Tree Light ",
      description: "Festival Wedding Parties Romantic Decoration",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },

    {
      image: l4,
      title: "Mahganya Wall Decor Light",
      description: "Black (Corded Electric) Up Down Both Side",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },

    {
      image: l1,
      title: "Metal Lantern String Lights",
      description: "Home Decoration Light (4 Meter 25 LED)",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },

    {
      image: l6,
      title: "Ball String Fairy Lights",
      description: "PESCA 25 LED Warm White,4 Meter",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },

    {
      image: l7,
      title: "coku 250 LED's Light",
      description: "Christmas Decor & New Year (50 Meter)",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },
    {
      image: l3,
      title: "Rose Flowers String Lights",
      description: " Wedding, Christmas, Diwali Festival  Decorations",
      clickEvent: () => navigate(`/store/${LIGHT_CAT_ID}/Decoration%20Lights`),
    },
  ];
  const cardView = () => {
    return (
      <Container fluid className="border border-0 shadow p-0 mb-5">
        <img style={{ height: "300px", width: "100%" }} src={a2} alt="" />
      </Container>
    );
  };

  return (
    <Container fluid>
      {cardView()}{" "}
      <div className="text-aligns-center d-flex align-items-center justify-content-center ">
        <ReactCardSlider slides={slides} />
      </div>{" "}
    </Container>
  );
};

//advertisement by actor

export const Advertise = () => {
  const typingRef = useRef(null);

  useEffect(() => {
    const loopAnimation = () => {
      const typingElement = typingRef.current;

      if (typingElement) {
        typingElement.style.width = "0";

        // Add typing animation class
        typingElement.classList.add("typing-animation");

        // After a delay, add removing animation class
        setTimeout(() => {
          typingElement.classList.add("removing-animation");

          // After the removing animation completes, remove both classes and restart the loop
          setTimeout(() => {
            typingElement.classList.remove(
              "typing-animation",
              "removing-animation"
            );
            typingElement.style.width = "0";
            loopAnimation();
          }, 1000); // Adjust the delay to match the duration of your removing animation
        }, 3000); // Adjust the delay to match the duration of your typing animation
      }
    };

    loopAnimation();
  }, []);

  
  const cardView = () => (
    <Card
   
      className="shadow border border-0 "
      
    >
      <Card.Body  id="home" style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "1.7",
      }}>
        <Row>
          <Col
            className="align-items-center justify-content-center"
            md={{ span: 2, offset: 2 }}
          >
            <Container
              className="text"
              style={{
                marginTop: "100px",
                marginLeft: "30px",
                textAlign: "center",
                color: "#009688",
                fontWeight: "bolder",
                fontFamily: "Your Chosen Font, sans-serif",
              }}
            >
              <h2 className="text-center fw-bold  py-4">
                <span
                  style={{
                    backgroundColor: "#ef6c00",
                    fontSize: "18px",
                    boxShadow: "2px 4px 6px 3px grey",
                    borderRadius: "13px",
                    border: "2px solid white",
                  }}
                  className=" text-light p-3 "
                >
                  Explore &{" "}
                </span>{" "}
              </h2>

              <h2 className="fw-bold" style={{ fontSize: "30px" }}>
                Shop <span className="text-warning fw-bold">Now</span>
              </h2>
              <Button
                className="m-2 "
                variant="contained"
                color="inherit"
                as={Link}
                to="/stores"
              >
                Explore
              </Button>
            </Container>
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <Container className="text-center">
              <img
                style={{ marginLeft: "30px", width: "78%", objectFit: "cover" }}
                src={addver}
                alt=""
              />
            </Container>
            <Container
              className="text-center align-items-center justify-content-center"
              style={{
                color: "#009688",
                fontWeight: "bold",
                fontFamily: "Your Chosen Font, sans-serif",
              }}
            >
              <h5 ref={typingRef} className="text-center fw-bold ">
                Discover, shop, and claim your rewards . . . . .
              </h5>
            </Container>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );


  return <Container>{cardView()}</Container>;
};

//Wenter card

export const WenterCard = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: we1,
      title: "Double Bed Comforter/Blanket/Rajai",
      description: "(90 x 100 Inches/228cm x 254cm) White",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
    {
      image: we8,
      title: "Homelike Queen Size Teal / Ivory",
      description: " Blanket 3 Piece - 1 Comforter 2 Pillow ",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
    {
      image: we3,
      title: "Rajasthan crafts Soft Quilt/Razai",
      description: "Winter (60x90-inch; Maroon) (RC-CS-005-C)",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
    {
      image: we4,
      title: "SunStyle Home Queen Size Quilt",
      description: " Soft Microfiber Coverlet Bedding Set ",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
    {
      image: we5,
      title: "Subtlespreads King Size Bedsheets",
      description: "Oval Geometric Pattern (Double 90X100, Grey)",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
    {
      image: we6,
      title: "BLISSHOME Comforters for King",
      description: "Summer & Winter (Taupe, 106x106) Grace Collection",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
    {
      image: we7,
      title: "EDMUND - AC Blanket",
      description: "Teal & Dark Grey, Polyester & 200 Microfiber",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
    {
      image: we2,
      title: "Woolen Printed Blanket",
      description: "(Multicolor, Double Bed, 220 cm x 240 cm)",
      clickEvent: () => navigate(`/store/${WINTER_CAT_ID}/Winter%20Delights`),
    },
  ];
  const cardView = () => {
    return (
      <Container fluid className="border border-0 shadow p-0 mb-5">
        <img
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
          src={a8}
          alt=""
        />
      </Container>
    );
  };
  return (
    <Container fluid>
      {cardView()}{" "}
      <div className="text-aligns-center d-flex align-items-center justify-content-center ">
        <ReactCardSlider slides={slides} />
      </div>
    </Container>
  );
};

//study lamp card

export const StudyLampCard = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: t1,
      title: "LED Desk Lamp Touch",
      description: " Eye Protection Lamp, Pack of 1",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
    {
      image: t5,
      title: "Foldable Study Desk",
      description: "Computer Desk for Office Table",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
    {
      image: t3,
      title: "Table Alarm Clock",
      description: "Edition Vintage 12x10x6 cm (Twin-Blue)",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
    {
      image: t4,
      title: "Dime Store Engineered Wood",
      description: "Multi Function Kitchen Pantry Organization",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
    {
      image: t2,
      title: "LED Desk Lamp with Digital Clock",
      description: "Rechargeable Lamp, Adjustable Ceiling Lamp",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
    {
      image: t6,
      title: "Art Set & Drawing Kit ",
      description: "Colored Pencils Other Stationary Item",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
    {
      image: t7,
      title: "Atomic Habits Paperback ",
      description: "transform life's trajectory powerfully",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
    {
      image: t8,
      title: "World’s Greatest Books Combo",
      description: "Perfect Motivational Gift Set",
      clickEvent: () => navigate(`/store/${STUDY_CAT_ID}/Study`),
    },
  ];
  const cardView = () => {
    return (
      <Container fluid className="border border-0 shadow p-0 mb-5">
        <img style={{ height: "300px", width: "100%" }} src={a3} alt="" />
      </Container>
    );
  };
  return (
    <Container fluid className="text-center">
      {cardView()}{" "}
      <div className="text-aligns-center d-flex align-items-center justify-content-center ">
        <ReactCardSlider slides={slides} />
      </div>
    </Container>
  );
};

//function for image left
export const infoWithImageInMiddleSection = (text, title) => {
  return (
    <Container>
      <Row  className="sale">
        <Col className="text-center">
          <Container fluid className="border border-0 shadow p-0 ">
            <a href="/stores">
             
              <img
                style={{ height: "100%", width: "100%" }}
                src={sale}
                className="rounded shadow-lg border border-0"
                alt=""
              />
            </a>
          </Container>
        </Col>
        <Col className="text-center mt-5  py-5" style={{display:"flex",flexDirection:"column"}}>
          <Row>
            <Container>
              {" "}
              <h3>{title}</h3>
              <Container>
                <p>{text}</p>
              </Container>
              <Button
                className="m-2"
                size="large"
                variant="contained"
                color="warning"
                as={Link}
                to={`/store/${WATCH_CAT_ID}/Wrist%20Watch`}
              >
                Shop Now
              </Button>
            </Container>
          </Row>
          <Row>
            <Col>
            <Container fluid className="border border-0 mt-4   ">
              <a href={`/store/${WATCH_CAT_ID}/Wrist%20Watch`}>
                {" "}
                <img
                  style={{ height: "300px",maxWidth:"100%"}}
                  src={boat}
                  className="rounded shadow-lg border border-0"
                  alt=""
                />
              </a>
            </Container>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

//Kitchen related card

export const KitchenCard = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: k1,
      title: "Nonstick Fry Pan, Kitchen Tool Set",
      description: "Complete Nonstick Kitchen Set in Red",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
    {
      image: k2,
      title: "IBLEO25LGNEW 25L Electric Oven",
      description: "Effortless Cooking with Advanced OTG Features",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
    {
      image: k3,
      title: "Hawkins 3L Pressure Cooker",
      description: "Efficient 3L Contura Black Pressure Cooker",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
    {
      image: k4,
      title: "Opalware Dazzle Blue Swirl Dinner Set",
      description: "Complete Opalware Dinner Set for Six",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
    {
      image: k5,
      title: "DarkShri Airtight Container",
      description: "Pack of (6 Pcs of 250ml,1200ml with 24 Spoons)",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
    {
      image: k6,
      title: "Fridge Storage Boxes",
      description: "Items for Storage Organizer, Snap-Seal (6-pc) ",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
    {
      image: k7,
      title: "Super Microfiber Pads",
      description: "59.8 Extended Stainless Steel Handle Stick",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
    {
      image: k8,
      title: "Multi-purpose Microfiber Flat Mop",
      description: "1 extra refill for Dry & Wet Cleaning",
      clickEvent: () => navigate(`/store/${KITCHEN_CAT_ID}/Kitchen%20&%20Home`),
    },
  ];
  const cardView = () => {
    return (
      <Container fluid className="border border-0 shadow p-0 mb-5">
        <img style={{ height: "300px", width: "100%" }} src={a6} alt="" />
      </Container>
    );
  };
  return (
    <Container fluid>
      {cardView()}{" "}
      <div className="text-aligns-center d-flex align-items-center justify-content-center ">
        <ReactCardSlider slides={slides} />
      </div>
    </Container>
  );
};
//Gift related card

export const GiftCard = () => {
  const navigate = useNavigate();
  const uniqueKey = "giftCard";

  const slides1 = [
    {
      image: g1,
      title: "Gold-Silver Radha Krishna Statue",
      description: "Luxurious Gold-Silver Radha Krishna Idol Set",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
    {
      image: g2,
      title: "Elegant Silver Krishna Statue",
      description: "Lifelike eyes for an authentic & soulful presence.",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
    {
      image: g3,
      title: "Jam & Honey Teddy Bear",
      description: "quality with strong, secure stitching",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
    {
      image: g4,
      title: "Happy Birthday Magic Mug",
      description: "Premium Ceramic Mug: Quality, Design, Durability",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
    {
      image: g5,
      title: "Double Wall Vacuum Flask Set",
      description: "Premium Stainless Steel Double Wall Flask",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
    {
      image: g6,
      title: "White Buddha Statue Décor",
      description: "Elegant White Buddha Idol, Perfect Decor.",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
    {
      image: g7,
      title: "Birthday Gift Combo Pack - Love",
      description: "Complete Birthday Joy in One Package.",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
    {
      image: g8,
      title: "Explosive Gift Box Delight",
      description: "Unforgettable Gift: Chocolates, Teddy, Roses ",
      clickEvent: () => navigate(`/store/${GIFT_CAT_ID}/Gift%20Haven`),
    },
  ];
  const cardView = () => {
    return (
      <Container fluid className="border border-0 shadow p-0 mb-5">
        <img style={{ height: "300px", width: "100%" }} src={a7} alt="" />
      </Container>
    );
  };

  return (
    <Container fluid>
      {cardView()}{" "}
      <div className="text-aligns-center d-flex align-items-center justify-content-center ">
        <ReactCardSlider slides={slides1} key={uniqueKey} />
      </div>
    </Container>
  );
};
//Watch related card

export const WatchCard = () => {
  const navigate = useNavigate();

  const slides = [
    {
      image: w1,
      title: "boAt Enigma X500 Smart Watch",
      description: " Enjoy vivid visuals on the 1.43  AMOLED Display",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
    {
      image: w2,
      title: "Enigma Z20 Z40 with 1.32 HD Display",
      description: "Luxurious Metal Body Design with Stainless steel",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
    {
      image: w3,
      title: "Enigma X700 with 1.52 AMOLED Display",
      description: "Smartwatch with health tracking, and connectivity",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
    {
      image: w4,
      title: "AMOLED, BT Calling, Sleek Design",
      description: "AMOLED, Long Battery, Mood Faces, Bluetooth",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
    {
      image: w5,
      title: "boAt Ultima Select: Advanced Smartwatch",
      description: "AMOLED, Crown, Fitness, Resilient, Health",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
    {
      image: w6,
      title: "GTR 3 Pro: Ultimate Smartwatch",
      description: "Vivid AMOLED, 700+ Activities, Bluetooth Calling",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
    {
      image: w7,
      title: "Noise Pulse 2 Max 1.85 Display,",
      description: "Smart DND, 100 Sports Modes,Men and Women",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
    {
      image: w8,
      title: "Apple Watch Ultra GPS + Cellular 49 mm",
      description: "Fitness Tracker, Precision GPS,Excellent BatteryLife",
      clickEvent: () => navigate(`/store/${WATCH_CAT_ID}/Wrist%20Watch`),
    },
  ];
  const cardView = () => {
    return (
      <Row>
        <Col md={4}>
          {" "}
          <Container fluid className="border border-0 shadow p-0 mb-5 ">
            <img
              style={{ height: "300px", width: "100%", borderRadius: "12px" }}
              src={viratWatch}
              alt=""
            />
          </Container>
        </Col>
        <Col md={8}>
          {" "}
          <Container fluid className="border border-0 shadow p-0 mb-5">
            <img
              style={{ height: "300px", width: "100%", borderRadius: "12px" }}
              src={watch}
              alt=""
            />
          </Container>
        </Col>
      </Row>
    );
  };
  return (
    <Container fluid>
      {cardView()}{" "}
      <div className="text-aligns-center d-flex align-items-center justify-content-center ">
        <ReactCardSlider slides={slides} />
      </div>
    </Container>
  );
};
