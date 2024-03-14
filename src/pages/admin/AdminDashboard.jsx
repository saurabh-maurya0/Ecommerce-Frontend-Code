import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import UserContext from "../../context/UserContext";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";
import UseJwtTokenExpiration from "../../hooks/UseJwtTokenExpiration";
import Footer from "../../components/Footer";

const AdminDashboard = () => {
  UseJwtTokenExpiration();
  const userContext = useContext(UserContext);
  const dashboardView = () => {
    return (
     <Container fluid className="px-5 py-5" >
       <Row>
           <Col md={{span:2}} >
            <SideMenu/>
           
           </Col>
           <Col md={10} className="ps-3 pt-2">
          <Outlet/>
           
           </Col>
       </Row>
     
     </Container>
    );
  };

  return (
    <div>
     
      {isAdminUser() ? dashboardView() : <Navigate to="/login" />}
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
