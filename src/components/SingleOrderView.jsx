import { Button } from "@mui/material";
import React from "react";
import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../services/HelperService";
import { Link } from "react-router-dom";

const SingleOrderView = ({ order, openViewOrderModal, openEditOrderModal }) => {
  const badgeStyles = {
    fontSize: "1.0rem", // Adjust the font size as needed
    padding: "0.4rem", // Adjust the padding as needed
  };
  return (
    <Card className="border border-0 shadow mb-5 ">
      <Card.Body>
        <Row>
          <Col>
            {/*     {JSON.stringify(order)} */}
            <b>OrderId : </b>
            {order.orderId}
          </Col>
          <Col>
            <b>Ordered By:</b>
            <Link
              to={`/users/profile/${order.user.userId}`}
              className="txt-logo-color fw-bold ms-2"
            >
              {order.user.name}
            </Link>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Table bordered striped>
              <tbody>
                <tr>
                  <td>Billing Name</td>
                  <td className="fw-bold">{order.billingName}</td>
                </tr>
                <tr>
                  <td>Billing Phone</td>
                  <td className="fw-bold">{order.billingPhone}</td>
                </tr>
                <tr>
                  <td>Items</td>
                  <td className="fw-bold">{order.orderItems.length}</td>
                </tr>
                <tr
                  className={
                    order.paymentStatus === "NOTPAID"
                      ? "table-danger"
                      : "table-success"
                  }
                >
                  <td>Payment Staus</td>
                  <td className="fw-bold">
                    {" "}
                    <Badge
                      style={badgeStyles}
                      pill
                      bg={order.paymentStatus === "PAID" ? "success" : "danger"}
                      className="ms-2"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td className="fw-bold">
                    {" "}
                    <Badge
                      style={badgeStyles}
                      pill
                      bg={
                        order.orderStatus === "DELIVERED" ? "danger" : "warning"
                      }
                      className="ms-2"
                    >
                      {order.orderStatus}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>Ordered Date</td>
                  <td className="fw-bold">{formatDate(order.orderedDate)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Container className="text-center">
      

          <Button
            onClick={(event) => {
              openViewOrderModal(event, order);
            }}
            size="medium"
            variant="contained"
            color="info"
          >
            Order Details
          </Button>

          {!openEditOrderModal && order.paymentStatus=='NOTPAID' && <Button
          size="medium"
          variant="contained"
          color="success"
          className="ms-3"
          
        >
          Pay Now
        </Button>}
         {openEditOrderModal && <Button
            size="medium"
            variant="contained"
            color="warning"
            className="ms-3"
            onClick={(event) => openEditOrderModal(event, order)}
          >
            Update
          </Button>}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleOrderView;
