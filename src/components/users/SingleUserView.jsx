import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { getUserImageUrl } from "../../services/HelperService";
import defaultImage from "./../../asset/default_profile.png";
import { Link } from "react-router-dom";
const SingleUserView = ({ user }) => {
  return (
    <>
      <Card className="mt-3 border border-0 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={1} className="d-flex align-items-center">
              <img
                src={
                  user.imageName ? getUserImageUrl(user.userId) : defaultImage
                }
                className="rounded-circle"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                alt=""
                onError={(event) => {
                  console.log("error");
                  event.currentTarget.setAttribute("src", defaultImage);
                }}
              />
            </Col>
            <Col md={11} className="ps-5">
              <Link
                to={"/users/profile/" + user.userId}
                className="text-decoration-none"
              >
                
                <h4 className="txt-logo-color fw-bold ">{user.name}</h4>
              </Link>
              <p className="text-muted">{user.about}</p>
              <p className="text-muted">{user.email}</p>
              {user.roles.map((role) => {
                return (
                  <Badge
                    bg={role.roleName === "ROLE_ADMIN" ? "success" : "info"}
                    pill
                    key={role.roleId}
                    className="mx-2"
                  >
                    {role.roleName}
                  </Badge>
                );
              })}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleUserView;
