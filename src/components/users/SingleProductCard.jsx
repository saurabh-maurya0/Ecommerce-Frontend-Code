import React from "react";
import { Badge, Card, Container } from "react-bootstrap";
import { getProductImageUrl } from "../../services/HelperService";
import { Button } from "@mui/material";
import defaultProductImage from "./../../asset/default-product-image.png";
import { Link } from "react-router-dom";
const SingleProductCard = ({ products }) => {
  const offPercentage = Math.floor(
    ((products.price - products.discountedPrice) * 100) / products.price
  );

  return (
    <Card className=" mb-3 me-3 shadow " style={{ borderRadius: "13px" }}>
      <Card.Body>
        <Container className="text-center">
          <img
            src={getProductImageUrl(products.productId)}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
            alt=""
            onError={(event) => {
              event.currentTarget.setAttribute("src", defaultProductImage);
            }}
          />
        </Container>
        <h6>{products.title}</h6>

        <p className="text-muted">
          Discover endless possibilities with our innovative and exciting
          product lineup.
        </p>
        <Badge pill style={{ backgroundColor: "#003366" }} bg="#003366">
          {products.category?.title}
        </Badge>
        <Badge
          pill
          style={{ backgroundColor: "#00c900" }}
          className="ms-3"
          bg={products.stock ? "#00c900" : "danger"}
        >
          {products.stock ? "In Stock" : "Out Of Stock"}
        </Badge>
        <Container className="text-end">
          <b>
            <span className="h6 text-muted">
              <s> ₹{products.price}</s>
            </span>
          </b>
          <b>
            <span className="h5 ms-2   ">
              ₹{products.discountedPrice}
              <Badge
                // style={{ backgroundColor: "#ff8000" }}
                //bg="#ff8000"
                bg="warning"
                className="ms-2"
              >
                <span className="fw-bold">{offPercentage}% OFF</span>
              </Badge>
            </span>
          </b>
        </Container>
        <Container className="mt-3 d-grid gap-2 ">
          <Button
            variant="contained"
            color="success"
            size="small"
            className="text-decoration-none text-center"
            as={Link}
            to={`/store/products/${products.productId}`}
          >
            View Product
          </Button>
          {/* <Button variant="contained" color="warning" size="small">
            Add To Cart
        </Button>*/}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;
