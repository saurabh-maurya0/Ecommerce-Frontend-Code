import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import logo from "../asset/logo.png";
import CartContext from "../context/CartContext";

const CustomNav = () => {
  const userContext = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const onLogout = () => {
    // userContext.setIsLogin(false);
    // userContext.setUserData(null);
    userContext.logout();
  };
  const gradientColors = {
    from: "#f0f0f0",
    to: "#e0e0e0",
  };
  return (
    <Navbar
      // className="bg-navbar-color"
      collapseOnSelect
      expand="lg"
      data-bs-theme="dark"
      bg="black"
      variant="dark"
     
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <div className=" align-item-center ">
            <img src={logo} alt="logo" width="60" height="60" className=" rounded-circle" ></img>
            <span className="txt-logo-color-new ms-3 ">QuikBazaar</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/services">
              Features
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/stores">
              Store
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carts">
              cart{" "}
              {userContext.isLogin && cart && "(" + cart.items.length + ")"}
            </Nav.Link>

            {userContext.isLogin ? (
              <>
                {userContext.isAdminUser && (
                  <>
                    <Nav.Link as={NavLink} to="/admin/home">
                      AdminDashboard
                    </Nav.Link>
                  </>
                )}

                <Nav.Link
                  as={NavLink}
                  to={`/users/profile/${userContext.userData.user.userId}`}
                >
                  {userContext.userData?.user?.email}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users/orders">
                  Order
                </Nav.Link>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNav;
