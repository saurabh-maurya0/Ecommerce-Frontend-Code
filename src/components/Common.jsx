import React from "react";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import Footer from "./Footer";

const Common = ({
  title = "Page Title",
  description = "Welcome to dynamic store",
  buttonEnabled = false,
  buttonText = "Shop Now",
  buttonType = "primary",
  buttonLink = "/",
  children,
}) => {
  return (
    <div>
      <Container
        fluid 
        data-bs-theme="dark"
        // style={{backgroundColor: "#f9f7f2" }}
        className="p-5 bg-dark text-white text-center d-flex justify-content-center align-items-center "
      >
        <div>
          <h4 className="text-center">{title}</h4>
          <p className="text-center fw-light">{description && description}</p>
          {buttonEnabled && (
            <Button as={NavLink} to={buttonLink} variant={buttonType}>
              {buttonText}
            </Button>
          )}
        </div>
      </Container>
      {children}
      <Footer />
    </div>
  );
};

export default Common;
