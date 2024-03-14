import React, { useContext, useState } from "react";
import Common from "../components/Common";
import CartContext from "../context/CartContext";
import { Alert, AlertTitle, Button } from "@mui/material";
import { Badge, Card, Col, Container, Form, Row } from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

import { createOrder } from "../services/OrderService";
import { ORDER_STATUS, PAYMENT_STATUS } from "../services/HelperService";
import UseJwtTokenExpiration from "../hooks/UseJwtTokenExpiration";
import Footer from "../components/Footer";
const Carts = () => {
  const flag=UseJwtTokenExpiration()
  const [orderPlacedClicked, setOrderPlacedClicked] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    billingAddress: "",
    billingName: "",
    billingPhone: "",
    cartId: "",
    orderStatus: "",
    paymentStatus: "",
    userId: "",
  });
  const { cart, setCart, addItem, removeItem, clearCart } =
    useContext(CartContext);
  const { userData, isLogin } = useContext(UserContext);
  const getTotalCartAmount = () => {
    let amount = 0;
    cart.items.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  };

  const handleOrderCreation = async () => {
    if (orderDetails.billingName.trim() === "") {
      toast.info("Billing name required !!");
      return;
    }
    if (orderDetails.billingPhone.trim() === "") {
      toast.info("Billing Phone required !!");
      return;
    }
    if (orderDetails.billingAddress.trim() === "") {
      toast.info("Billing Address required !!");
      return;
    }

    //set required other details
    orderDetails.cartId = cart.cartId;
    orderDetails.orderStatus = ORDER_STATUS;
    orderDetails.paymentStatus = PAYMENT_STATUS;
    orderDetails.userId = userData.user.userId;
    console.log(orderDetails);
    try {
      const result = await createOrder(orderDetails);
      console.log(result);
      toast.success("Order created ! Proceeding for payment !!");
      setCart({
        ...cart,
        items: [],
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in creating order ! Try again !!");
    }
  };
  const orderFormView = () => {
    return (
      <Form>
        {/* Billing Name   */}
        {/*  {JSON.stringify(orderDetails)}  */}
        <Form.Group className="mt-3">
          <Form.Label>Billing Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter here"
            value={orderDetails.billingName}
            onChange={(event) => {
              setOrderDetails({
                ...orderDetails,
                billingName: event.target.value,
              });
            }}
          />
        </Form.Group>
        {/*  Billing Phone  */}
        <Form.Group className="mt-3">
          <Form.Label>Billing Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter here"
            value={orderDetails.billingPhone}
            onChange={(event) => {
              setOrderDetails({
                ...orderDetails,
                billingPhone: event.target.value,
              });
            }}
          />
        </Form.Group>
        {/*  Billing Address  */}
        <Form.Group className="mt-3">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            rows={6}
            as={"textarea"}
            placeholder="Enter here"
            value={orderDetails.billingAddress}
            onChange={(event) => {
              setOrderDetails({
                ...orderDetails,
                billingAddress: event.target.value,
              });
            }}
          />
        </Form.Group>
        <Container className="text-center mt-3 mb-1">
          <Button
            onClick={(event) => handleOrderCreation()}
            variant="contained"
            size="small"
            color="success"
          >
            Create Order & Proceed to Pay
          </Button>
        </Container>
      </Form>
    );
  };

  const cartView = () => {
    return (
      <>
        <Card className="mt-3 mb-3 shadow">
          <Card.Body>
            <Row className="px-5">
              <Col>
                <h3>Cart</h3>
              </Col>
              <Col className="text-end">
                <h3>{cart.items.length} Items</h3>
              </Col>
            </Row>

            <Row className="px-5 mt-3">
              <Col>
                {cart.items.map((item) => (
                  <SingleCartItemView key={item.cartItemId} item={item} />
                ))}
              </Col>
            </Row>
            <Container className="px-5">
              <h3 className="text-end px-5">
                Total Amount:{" "}
                <Badge pill bg="success">
                  {" "}
                  ₹ {getTotalCartAmount()}
                </Badge>
              </h3>
            </Container>
            <Container className="text-center">
              {!orderPlacedClicked && (
                <Button
                  onClick={(event) => setOrderPlacedClicked(true)}
                  variant="contained"
                >
                  Place Order
                </Button>
              )}
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  };

  //
  return (
    <div>
    <Container fluid={orderPlacedClicked} className="px-5">
      <Row>
        <Col md={orderPlacedClicked ? 8 : 12} className="animation">
          {cart &&
            (cart.items.length > 0 ? (
              cartView()
            ) : (
              <Container className="mt-3">
                <Card className="shadow">
                  <Card.Header>
                    <h3>Welcome to Your Cart</h3>
                  </Card.Header>
                  <Card.Body>
                    <Alert className="m-3 shadow " severity="warning">
                      <AlertTitle className="fw-bold">Warning</AlertTitle>
                      <p>
                        The cart is currently empty, there are no items in it.
                      </p>
                    </Alert>
                    <div className="text-center m-3">
                      <Button
                        as={Link}
                        to="/stores"
                        size="large"
                        variant="contained"
                        color="success"
                      >
                        Start Shoping
                      </Button>
                    </div>
                  </Card.Body>
                </Card>{" "}
              </Container>
            ))}
          {!cart && (
            <Container>
              <Alert className="m-3 shadow " severity="info">
                <AlertTitle className="fw-bold">Login Required !!</AlertTitle>
                <p>In order to access to your Cart do login first .</p>
              </Alert>{" "}
              <div className="text-center m-3">
                <Button
                  as={Link}
                  to="/login"
                  size="large"
                  variant="contained"
                  color="warning"
                >
                  Go To Login Page
                </Button>
              </div>
            </Container>
          )}
        </Col>
        {orderPlacedClicked && cart && (
          <Col md={4}>
            <Card className="mt-3 mb-3 shadow  ">
              <Card.Body>
                <h4>Fill the form to complete order</h4>
                {orderFormView()}
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      
    </Container>
    <Footer/>
    </div>
  );
};

export default Carts;
