import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../services/ProductService";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import ShowHtml from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/HelperService";
import { Button } from "@mui/material";
import defaultProductImage from "./../../asset/default-product-image.png";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
import './ProductView.css'
const ProductView = () => {
  const { cart, addItem } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    loadProduct(productId);
  }, []);

  const loadProduct = (productId) => {
    getProduct(productId)
      .then((data) => {
        setProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddItem = (productId, quantity) => {
    addItem(quantity, productId, () => {
      toast.success(" Product added to Cart !!");
    });
  };

  const offPercentage = Math.floor(
    ((product?.price - product?.discountedPrice) * 100) / product?.price
  );
  const productView = () => {

    return (
      <Container className="py-4 ">
        <Row className="responsive-image">
          <Col>
            <Card className="border border-0 mt-4 px-5 shadow">
              <Card.Body>
                <Container className=" my-4">
                  <Row>
                    <Col className="text-center">
                      <img
                      

                        style={{ maxWidth: "100%", // Make the image responsive by setting max-width to 100%
                        height: "auto",   // Allow the height to adjust proportionally
                        objectFit: "contain",
                        marginBottom: "20px" }}
                        src={getProductImageUrl(product.productId)}
                        alt=""
                        onError={(event) =>
                          event.currentTarget.setAttribute(
                            "src",
                            defaultProductImage
                          )
                        }
                      />
                    </Col>
                    <Col>
                      <h3>{product.title}</h3>

                      <p className="text-muted">
                        Sort Description : 
                        <span>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Alias unde vel assumenda nemo ipsum fugit, hic,
                          fuga itaque tenetur accusantium autem facere, commodi
                          laboriosam perspiciatis? Optio voluptatum totam
                          voluptate dolorum.
                        </span>
                      </p>
                      <Badge
                        pill
                        style={{ backgroundColor: "#003366" }}
                        bg="#003366"
                      >
                        {product.category?.title}
                      </Badge>
                      <Badge
                        pill
                        style={{ backgroundColor: "#00c900" }}
                        className="ms-2"
                        bg={product.stock ? "#00c900" : "danger"}
                      >
                        {product.stock ? "In Stock" : "Out Of Stock"}
                      </Badge>
                      <Container className="text-end">
                        <b>
                          <span className="h5 text-muted">
                            <s> ₹{product.price}</s>
                          </span>
                        </b>
                        <b>
                          <span className="h3 ms-2   ">
                            ₹{product.discountedPrice}
                            <Badge
                              // style={{ backgroundColor: "#ff8000" }}
                              //bg="#ff8000"
                              bg="warning"
                              className="ms-2"
                            >
                              <span className="fw-bold">
                                {offPercentage}% OFF
                              </span>
                            </Badge>
                          </span>
                        </b>

                        <Container className="mt-4 d-grid gap-2 ">
                          <Button
                            disabled={!product.stock}
                            variant="contained"
                            color="warning"
                            size="large"
                            className="text-decoration-none text-center"
                            onClick={(event) =>
                              handleAddItem(product.productId, 1)
                            }
                          >
                            Add To Cart
                          </Button>
                          <Button
                            as={Link}
                            to="/stores"
                            variant="contained"
                            color="primary"
                            size="large"
                            className="text-decoration-none text-center"
                          >
                            Go To Store
                          </Button>
                        </Container>
                      </Container>
                    </Col>
                  </Row>
                </Container>
                <div className="mt-5">
                  <ShowHtml htmlText={product.description} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Container className="mt-4 d-grid gap-2 ">
            <Button
              disabled={!product.stock}
              variant="contained"
              color="warning"
              size="large"
              className="text-decoration-none text-center"
              onClick={(event) => handleAddItem(product.productId, 1)}
            >
              Add To Cart
            </Button>
            <Button
              as={Link}
              to="/stores"
              variant="contained"
              color="primary"
              size="large"
              className="text-decoration-none text-center"
            >
              Go To Store
            </Button>
          </Container>
        </Row>
      </Container>
    );
  };

  return product && productView();
};

export default ProductView;
