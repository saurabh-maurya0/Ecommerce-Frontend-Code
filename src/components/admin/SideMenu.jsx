import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import { MdViewDay } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiUserSwitchFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import {
  Badge,
  Button,
  ListGroup,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

const SideMenu = () => {
  const { logout } = useContext(UserContext);

  

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Explore User</Popover.Header>
      <Popover.Body>
        Click here to explore valuable information in <strong>Users</strong>{" "}
        section !
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <ListGroup className="shadow sticky-top " variant="flush">
        <ListGroup.Item as={NavLink} to="/admin/home" action>
          <FaHome size={20} />

          <span className="ms-2"> Home</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/add-category" action>
          <BiCategory size={20} />
          <span className="ms-2">Add Category</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/categories" action>
          <MdOutlineCategory size={20} />
          <span className="ms-2">View Categories</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/add-product" action>
          <MdAddToPhotos size={20} />
          <span className="ms-2">Add Product</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/products" action>
          <MdViewDay size={20} />
          <span className="ms-2">View Products</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/orders" action>
          <FaOpencart size={20} />
          <span className="ms-2">Orders</span>
        </ListGroup.Item>

        <div>
          {["right"].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={popover}
            >
              <ListGroup.Item as={NavLink} to="/admin/users" action>
                <PiUserSwitchFill className="mb-1" size={20} />
                <span className="me-4"> Users</span>
                <Badge pill bg="danger" className="ms-2">
                  New
                </Badge>
              </ListGroup.Item>
            </OverlayTrigger>
          ))}
        </div>

        <ListGroup.Item as={NavLink} to="/" action>
          <MdOutlineSpaceDashboard size={20} />
          <span className="ms-2 "> Dashboard</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          as={NavLink}
          to="/login"
          onClick={(event) => {
            logout();
          }}
        >
          <MdLogout size={20} />

          <span> Logout</span>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default SideMenu;
