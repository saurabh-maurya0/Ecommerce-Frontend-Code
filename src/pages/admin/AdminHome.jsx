import { Button } from "@mui/material";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PiUserSwitchFill } from "react-icons/pi";
import { MdViewDay } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import DashboardCardView from "../../components/DashboardCardView";
const AdminHome = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="shadow">
            <Card.Body className="text-center">
              <h3 className="text-center ">Welcome to admin dashboard</h3>
              <p className="text-muted">
                Customize dashboard for admin, to add categories to add producst
                to view categories to view products , manage orders,manage users{" "}
              </p>
              <p className="">Start managing products </p>

              <Container className="d-grid gap-3">
                {" "}
                <Button
                  className="text-decoration-none"
                  size="small"
                  as={Link}
                  to={"/admin/categories"}
                  variant="contained"
                  color="primary"
                >
                  {" "}
                  <MdOutlineCategory className="me-1" size={24} /> Start
                  Managing Categories
                </Button>
                <Button
                  className="text-decoration-none  "
                  size="small"
                  as={Link}
                  to={"/admin/products"}
                  variant="contained"
                  color="secondary"
                >
                  <MdViewDay className=" me-1" size={20} /> Start Managing
                  Products
                </Button>
                <Button
                  className="text-decoration-none  "
                  size="small"
                  as={Link}
                  to={"/admin/products"}
                  variant="contained"
                  color="inherit"
                >
                  {" "}
                  <FaOpencart className="me-2" size={20} /> Start Managing
                  Orders
                </Button>
                <Button
                  className="text-decoration-none "
                  size="small"
                  as={Link}
                  to={"/admin/users"}
                  variant="contained"
                  color="warning"
                >
                  <PiUserSwitchFill className="mb-1 me-2 " size={24} /> Start
                  Managing Users
                </Button>{" "}
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <DashboardCardView
          icon={<MdOutlineProductionQuantityLimits size={80} />}
          number={"243K"}
          text={"Number of Products"}
        />
        <DashboardCardView
          icon={<MdCategory size={80} />}
          number={"100+"}
          text={"Number of Categories"}
        />
        <DashboardCardView
          icon={<FaOpencart size={80} />}
          number={"53K"}
          text={"Number of Orders"}
        />
        <DashboardCardView
          icon={<PiUserSwitchFill size={80} />}
          number={"43K"}
          text={"Number of Users"}
        />
      </Row>
    </Container>
  );
};

export default AdminHome;
