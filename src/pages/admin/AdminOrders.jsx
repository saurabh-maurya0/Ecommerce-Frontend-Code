import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrder } from "../../services/OrderService";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
  Table,
  Badge,
  Form,
} from "react-bootstrap";
import defaultProductImage from "./../../asset/default-product-image.png";
import SingleOrderView from "../../components/SingleOrderView";
import {
  ADMIN_ORDER_PAGE_SIZE,
  formatDate,
  getProductImageUrl,
} from "../../services/HelperService";
import { Button } from "@mui/material";
import ShowHtml from "../../components/ShowHtml";
import { FaEye } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [ordersData, setOrdersData] = useState(undefined);
  const [currentProduct, setCurrentProduct] = useState(undefined);
  const [selectedOrder, setSelectedOrder] = useState(undefined);

  //update state
  const [updateShow, setUpdateShow] = useState(false);
  //view state
  const [show, setShow] = useState(false);
  //view function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //update function
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => setUpdateShow(true);

  // const [fakeOrders, setFakeOrders] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  useEffect(() => {
    //single time on load
    getOrderLocally();
  }, []);

  //when current page value has been change then it is called

  useEffect(() => {
    if (currentPage > 0) {
      getOrderLocally();
    }
  }, [currentPage]);

  const openViewOrderModal = (event, order) => {
    console.log("click openvieworedermodal button");
    console.log(event);
    console.log(order);
    setSelectedOrder({ ...order });
    handleShow(true);
  };

  const openEditOrderModal = (event, order) => {
    console.log("hi open edit modal");
    setSelectedOrder({ ...order });
    handleUpdateShow(true);
  };

  const [showProduct, setShowProduct] = useState(false);
  const closeProductViewModal = () => {
    setShowProduct(false);
  };

  const openProductViewModal = (ProductDetail) => {
    console.log(ProductDetail);
    setCurrentProduct(ProductDetail);
    setShowProduct(true);
  };

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

  //handle order update

  const handleOrderUpdate = async (event) => {
    event.preventDefault();
    console.log(selectedOrder);
    if (selectedOrder.billingName.trim() === "") {
      toast.error("BillingName required !!");
      return;
    }
    if (selectedOrder.billingAddress.trim() === "") {
      toast.error("BillingAddress required !!");
      return;
    }
    if (selectedOrder.billingPhone.trim() === "") {
      toast.error("BillingPhone required !!");
      return;
    }

    try {
      const data = await updateOrder(selectedOrder, selectedOrder.orderId);
      const newList = ordersData.content.map((item) => {
        if (item.orderId === selectedOrder.orderId) {
          return data;
        } else {
          return item;
        }
      });

      console.log("saurabhMauryaBefore");
      console.log(newList);
      setOrdersData({
        ...ordersData,
        content: newList,
      });
      console.log("saurabhMauryaAfter");
      console.log(selectedOrder);

      toast.success("Order Details updated !!");
    } catch (error) {
      console.log(error);
      toast.error("Order Not Updated !!");
    }
  };
  //update order modal

  const updateOrderModal = () => {
    return (
      selectedOrder && (
        <>
          <Modal size="lg" show={updateShow} onHide={handleUpdateClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="border border-0 shadow">
                <Card.Body>
                  <Form onSubmit={handleOrderUpdate}>
                    {/*   Billing Name */}
                    <Form.Group>
                      <Form.Label>Billing Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedOrder.billingName}
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            billingName: event.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {/*   Billing Phone */}
                    <Form.Group className="mt-3">
                      <Form.Label>Billing Phone</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedOrder.billingPhone}
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            billingPhone: event.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {/*   Billing Address */}
                    <Form.Group className="mt-3">
                      <Form.Label>Billing Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={selectedOrder.billingAddress}
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            billingAddress: event.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    {/* payment Status    */}{" "}
                    <Form.Group className="mt-3">
                      <Form.Label>Payment Status</Form.Label>

                      <Form.Select
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            paymentStatus: event.target.value,
                          });
                        }}
                      >
                        <option
                          selected={selectedOrder.paymentStatus == "NOTPAID"}
                          value="NOTPAID"
                        >
                          NOT PAID
                        </option>
                        <option
                          selected={selectedOrder.paymentStatus == "PAID"}
                          value="PAID"
                        >
                          PAID
                        </option>
                      </Form.Select>
                    </Form.Group>
                    {/* order Status    */}
                    <Form.Group className="mt-3">
                      <Form.Label>Order Status</Form.Label>
                      <Form.Select
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            orderStatus: event.target.value,
                          });
                        }}
                      >
                        <option
                          selected={selectedOrder.orderStatus == "PENDING"}
                          value="PENDING"
                        >
                          PENDING
                        </option>
                        <option
                          selected={selectedOrder.orderStatus == "DISPATCHED"}
                          value="DISPATCHED"
                        >
                          DISPATCHED
                        </option>
                        <option
                          selected={selectedOrder.orderStatus == "ONWAY"}
                          value="ONWAY"
                        >
                          ONWAY
                        </option>
                        <option
                          selected={selectedOrder.orderStatus == "DELIVERED"}
                          value="DELIVERED"
                        >
                          DELIVERED
                        </option>
                      </Form.Select>
                    </Form.Group>
                    {/*  DELIVERED DATE  */}
                    <Form.Group className="mt-3">
                      <Form.Label>Select Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="YYYY-MM-DD"
                        onChange={(event) => {
                          setSelectedOrder({
                            ...selectedOrder,
                            deliveredDate: event.target.value,
                          });
                        }}
                      />
                      <p className="text-muted ">Format : YYYY-MM-DD</p>
                    </Form.Group>
                    <Container className="text-center">
                      <Button
                        type="submit"
                        variant="contained"
                        className="m-3"
                        color="success"
                        onClick={handleUpdateClose}
                      >
                        Save Changes
                      </Button>
                    </Container>
                  </Form>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                color="error"
                onClick={handleUpdateClose}
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
  //view Order Modal
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
  //get orders
  const getOrderLocally = async () => {
    try {
      const data = await getAllOrders(
        currentPage,
        ADMIN_ORDER_PAGE_SIZE,
        "orderedDate",
        "desc"
      );
      console.log(data);
      if (currentPage === 0) {
        setOrdersData(data);
      } else {
        setOrdersData({
          content: [...ordersData.content, ...data.content],
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
      }
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  };

  //looad data of the next page.

  const loadNextPage = () => {
    console.log("loading next page");
    setCurrentPage(currentPage + 1);
  };

  const ordersView = () => {
    return (
      <Card className="shadow">
        <Card.Header>
          <h3>All Orders is here</h3>
        </Card.Header>
        <Card.Body>
          <InfiniteScroll
            dataLength={ordersData.content.length}
            next={loadNextPage}
            hasMore={!ordersData.lastPage}
            loader={<h3 className="text-center my-4">Loading...</h3>}
            endMessage={
              <p className="my-3 text-center">All orders have been loaded.</p>
            }
          >
            {ordersData.content.map((o) => {
              return (
                <SingleOrderView
                  key={o.orderId}
                  openViewOrderModal={openViewOrderModal}
                  openEditOrderModal={openEditOrderModal}
                  order={o}
                />
              );
            })}
          </InfiniteScroll>
        </Card.Body>
      </Card>
    );
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            {ordersData && ordersView()}
            {viewOrderModal()}
            {viewProductModalView()}
            {updateOrderModal()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminOrders;
