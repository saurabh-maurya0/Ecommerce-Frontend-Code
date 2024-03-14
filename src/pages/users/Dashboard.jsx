import { useContext } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Common from "../../components/Common";
import { isLoggedIn } from "../../auth/HelperAuth";
import UseJwtTokenExpiration from "../../hooks/UseJwtTokenExpiration";
import Footer from "../../components/Footer";
const Dashboard = () => {
  UseJwtTokenExpiration()
  const redirect = useNavigate();
  const userContext = useContext(UserContext);

  //private dashboard view
  const dashboardView = () => {
    return (
      <div>
      

        {/*
          <h1> This is Dashboard</h1>
        
        nested navigation
         */}
        <Outlet />
      </div>
    );
  };

  //not logged in view
  const notLoggedInView = () => {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col
            md={{
              span: 8,
            }}
          >
            <Card className="border-0 shadow mt-3 ">
              <Card.Body>
                <h1 className="text-center text-danger">
                  You are not logged in
                </h1>
                <p className="text-center">Please login to view the page</p>
                <Container className="text-center">
                  <Button
                    variant="success"
                    as={NavLink}
                    to="/login"
                    className="mx-auto mt-3"
                  >
                    Login Now!
                  </Button>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div>
      {/* {userContext.isLogin ? dashboardView() : redirect("/login")} */}
      {isLoggedIn() ? dashboardView() : <Navigate to="/login" />}
      <Footer/>
    </div>
  );
};
export default Dashboard;
