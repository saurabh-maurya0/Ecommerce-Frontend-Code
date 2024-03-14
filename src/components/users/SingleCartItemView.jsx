import React, { useContext } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { getProductImageUrl } from "../../services/HelperService";
import defaultProductImage from "./../../asset/default-product-image.png";
import { Button } from "@mui/material";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
const SingleCartItemView = ({ item }) => {
  const { cart, setCart, addItem, removeItem, clearCart } =
    useContext(CartContext);
  const offPercentage = Math.floor(
    ((item.product?.price - item.product?.discountedPrice) * 100) /
      item.product?.price
  );

  return (
    <Card className="shadow mb-3 text-logo-color">
      <Card.Body>
        <Row>
          <Col
            md={1}
            className="d-flex align-items-center justify-content-center "
          >
            <img
              style={{ widht: "70px", height: "70px", objectFit: "contain"}}
              src={getProductImageUrl(item.product.productId)}
              alt=""
              onError={(event) =>
                event.currentTarget.setAttribute("src", defaultProductImage)
              }
            />
          </Col>
          <Col md={9}>
            <h5>{item.product.title}</h5>
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestias, accusamus?
            </p>
            <Row>
              <Col>
                <p>
                  <b>{item.quantity}</b>
                  <span className="text-muted "> Quantity</span>
                </p>
              </Col>
              <Col>
                <p>
                  <span className="text-muted  ">Price :</span>
                  <b className="text-success">
                    ₹{item.product.discountedPrice}
                  </b>
                  <Badge
                    // style={{ backgroundColor: "#ff8000" }}
                    //bg="#ff8000"
                    bg="warning"
                    className="ms-2"
                  >
                    <span className="fw-bold">{offPercentage}% OFF</span>
                  </Badge>
                </p>
              </Col>
              <Col>
                <p>
                  <span className="text-muted  ">Total Price :</span>
                  <b className="text-success">₹{item.totalPrice}</b>
                </p>
              </Col>
            </Row>
          </Col>
          <Col
            md={2}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="w-100">
              <div className="d-grid text-center">
                <Button
                  className=""
                  onClick={(event) => {
                    removeItem(item.cartItemId);
                  }}
                  size="small"
                  variant="contained"
                  color="error"
                >
                  Remove
                </Button>
              </div>
              <div className="mt-1 text-center">
                <Row>
                  <Col>
                    <Button
                      className="mt-1 me-1"
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={(event) => {
                        const decreaseQuantity = item.quantity - 1;
                        if (decreaseQuantity > 0) {
                          addItem(
                            decreaseQuantity,
                            item.product.productId,
                            () => {
                              toast.warning("Quantity updated !!");
                            }
                          );
                        } else {
                          toast.info("Quantity can not be less than 1 !!");
                        }
                      }}
                    >
                      -
                    </Button>
                  </Col>
                  <Col>
                    {" "}
                    <Button
                      className="mt-1"
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={(event) => {
                        const increaseQuantity = item.quantity + 1;
                        addItem(increaseQuantity, item.product.productId,
                            ()=>{
                                toast.info("Quantity updated !!");
                            });
                      }}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleCartItemView;
