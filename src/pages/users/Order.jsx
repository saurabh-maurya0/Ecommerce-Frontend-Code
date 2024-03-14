import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { getOrdersOfUser } from "../../services/OrderService";
import { toast } from "react-toastify";
import SingleOrderView from "../../components/SingleOrderView";
import { formatDate, getProductImageUrl } from "../../services/HelperService";
import defaultProductImage from "../../asset/default-product-image.png";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
  Table,
  Badge,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShowHtml from "../../components/ShowHtml";

import { Alert, AlertTitle, Button } from "@mui/material";
const Order = () => {
  const { userData, isLogin } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(undefined);
  const [showProduct, setShowProduct] = useState(false);
  //view state
  const [show, setShow] = useState(false);
  //view function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (isLogin) {
      loadOrderOfUsers();
    }
  }, [isLogin]);

  const closeProductViewModal = () => {
    setShowProduct(false);
  };
  const openViewOrderModal = (event, order) => {
    console.log("click openvieworedermodal button");
    console.log(event);
    console.log(order);
    setSelectedOrder({ ...order });
    handleShow(true);
  };

  const loadOrderOfUsers = async () => {
    try {
      const result = await getOrdersOfUser(userData.user.userId);
      setOrders(result);
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error("Error in loading Order !!");
    }
  };
  //product view modal
  const openProductViewModal = (ProductDetail) => {
    console.log(ProductDetail);
    setCurrentProduct(ProductDetail);
    setShowProduct(true);
  };

  //product view modal

  const viewProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal size={"lg"} show={showProduct} onHide={closeProductViewModal}>
            <Modal.Header closeButton>
              <Modal.Title>{currentProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="shadow border-0">
                <Card.Body>
                  {/*  product picture  */}

                  <Container className="text-center p-3">
                    <img
                      style={{ height: "350px" }}
                      src={
                        currentProduct.productImageName
                          ? getProductImageUrl(currentProduct.productId)
                          : defaultProductImage
                      }
                      alt=""
                    />
                  </Container>

                  <Table striped bordered responsive className="text-center ">
                    <thead>
                      <tr>
                        <th>Info</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product Id</td>
                        <td className="fw-bold">{currentProduct.productId}</td>
                      </tr>
                      <tr>
                        <td>Quantity</td>
                        <td className="fw-bold">{currentProduct.quantity}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td className="fw-bold">₹{currentProduct.price}</td>
                      </tr>
                      <tr>
                        <td>Discounted Price</td>
                        <td className="fw-bold">
                          ₹{currentProduct.discountedPrice}
                        </td>
                      </tr>
                      <tr className={currentProduct.live ? "" : "table-danger"}>
                        <td>Live</td>
                        <td className="fw-bold">
                          {currentProduct.live ? "True" : "False"}
                        </td>
                      </tr>
                      <tr
                        className={currentProduct.stock ? "" : "table-danger"}
                      >
                        <td>Stock</td>
                        <td className="fw-bold">
                          {currentProduct.stock ? "In Stock" : "Not in Stock"}
                        </td>
                      </tr>
                      <tr>
                        <td> Categroy</td>
                        <td className="fw-bold">
                          {currentProduct.category
                            ? currentProduct.category.title
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* description   */}
                  <div className="p-4 border border-1 shadow ">
                    <ShowHtml htmlText={currentProduct.description} />
                  </div>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                color="error"
                size="small"
                className="m-2"
                onClick={closeProductViewModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  //
  //order view modal
  const viewOrderModal = () => {
    return (
      selectedOrder && (
        <>
          <Modal size="xl" show={show} onHide={handleClose} responsive>
            <Modal.Header closeButton>
              <Modal.Title>
                <h3 className="fw-bold"> Order Details </h3>{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  {/*     {JSON.stringify(order)} */}
                  <b>OrderId : </b>
                  {selectedOrder.orderId}
                </Col>

                <Col>
                  <b>Ordered By:</b>
                  <Link
                    to={`/users/profile/${selectedOrder.user.userId}`}
                    className="txt-logo-color fw-bold ms-2"
                  >
                    {selectedOrder.user.name}
                  </Link>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Table bordered striped responsive>
                    <tbody>
                      <tr>
                        <td>Billing Name </td>
                        <td className="fw-bold">{selectedOrder.billingName}</td>
                      </tr>

                      <tr>
                        <td>Billing Phone</td>
                        <td className="fw-bold">
                          {selectedOrder.billingPhone}
                        </td>
                      </tr>
                      <tr>
                        <td>Items</td>
                        <td className="fw-bold">
                          {selectedOrder.orderItems.length}
                        </td>
                      </tr>
                      <tr
                        className={
                          selectedOrder.paymentStatus === "NOTPAID"
                            ? "table-danger"
                            : "table-success"
                        }
                      >
                        <td>Payment Staus</td>
                        <td className="fw-bold">
                          <b
                            className={
                              selectedOrder.paymentStatus === "NOTPAID"
                                ? "text-danger"
                                : "text-success"
                            }
                          >
                            {selectedOrder.paymentStatus}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>Order Status</td>
                        <td className="fw-bold ">
                          <b
                            className={
                              selectedOrder.orderStatus === "DELIVERED"
                                ? "text-danger"
                                : "text-warning"
                            }
                          >
                            {" "}
                            {selectedOrder.orderStatus}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>Ordered Date</td>
                        <td className="fw-bold">
                          {formatDate(selectedOrder.orderedDate)}
                        </td>
                      </tr>
                      <tr>
                        <td>Billing Address</td>
                        <td className="fw-bold">
                          {selectedOrder.billingAddress}
                        </td>
                      </tr>
                      <tr>
                        <td>Delivered Date</td>
                        <td className="fw-bold">
                          {selectedOrder.deliveredDate
                            ? formatDate(selectedOrder.deliveredDate)
                            : "PENDING"}
                        </td>
                      </tr>
                      <tr>
                        <td>Order Amount</td>
                        <td className="fw-bold">
                          ₹ {selectedOrder.orderAmount}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Card responsive>
                    <Card.Body>
                      <h3>Order Items</h3>
                      <ListGroup>
                        {selectedOrder.orderItems.map((item) => (
                          <ListGroup.Item
                            action
                            className="mt-3"
                            key={item.orderItemId}
                          >
                            <Row>
                              <Col md={2} className="d-flex align-items-center">
                                <img
                                  style={{
                                    width: "50px",
                                  }}
                                  src={
                                    item.product.productImageName
                                      ? getProductImageUrl(
                                          item.product.productId
                                        )
                                      : defaultProductImage
                                  }
                                  alt=""
                                />
                              </Col>
                              <Col md={8}>
                                <h5>{item.product.title}</h5>
                                <p className="text-muted m-1 ">
                                  {" "}
                                  Product Id: {item.product.productId}
                                </p>

                                <Badge pill bg="info">
                                  Quantity: {item.quantity}
                                </Badge>
                                <Badge
                                  className="ms-2"
                                  size={"lg"}
                                  pill
                                  bg="success"
                                >
                                  Amount: ₹ {item.totalPrice}
                                </Badge>
                              </Col>
                              <Col
                                className=" d-flex align-items-center p-2 "
                                md={2}
                              >
                                <Container className="mt-2 ">
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    size="medium"
                                    onClick={() =>
                                      openProductViewModal(item.product)
                                    }
                                  >
                                    {" "}
                                    <FaEye />
                                    <span className="ms-1"> View</span>
                                  </Button>
                                </Container>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="medium"
                className="m-1"
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };
  //
  const ordersView = () => {
    return (
      <Card className="shadow">
        <Card.Header>
          <h3>Your Previous Orders</h3>
        </Card.Header>
        <Card.Body>
          {orders.map((o) => {
            return (
              <SingleOrderView
                key={o.orderId}
                openViewOrderModal={openViewOrderModal}
                // openEditOrderModal={openEditOrderModal}
                order={o}
              />
            );
          })}

          {orders.length <= 0 && (
            <Alert className="m-3 shadow " severity="error">
              <AlertTitle className="fw-bold">Warning</AlertTitle>
              <p>The order is currently empty, there are no items in it.</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };
  return (
    <>
      <Container>
        <Row className="mt-3 mb-3">
          <Col md={{ span: 10, offset: 1 }}>
            {ordersView()}
            {viewOrderModal()}
            {viewProductModalView()}
          </Col>
        </Row>{" "}
      </Container>
    </>
  );
};

export default Order;
