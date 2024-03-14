import React, { useContext, useEffect, useState } from "react";
import UserProfileView from "../../components/users/UserProfileView";
import {
  Alert,

  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import UserContext from "../../context/UserContext";

import { toast } from "react-toastify";
import {
  getUser,
  updateUser,
  updateUserProfilePicture,
} from "../../services/UserService";
import { getUserFromLocalStorage } from "../../auth/HelperAuth";
import { useParams } from "react-router-dom";
import defaultImg from "./../../asset/default_profile.png";
import { Button } from "@mui/material";

const Profile = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [updateLoading, setUpdateLoading] = useState(false);
  //state for handle image
  const [image, setImage] = useState({
    placeholder: defaultImg,
  });

  //modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModal = () => {
    console.log("showing modal");
    setShow(true);
  };

  const profileStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  useEffect(
    () => {
      /* console.log("userId :"+userId) */
      getUserDataFromServer();
      // if (userContext.userData && userContext.userData.user.userId) {

      // }
    },
    [
      /* userContext.userData */
    ]
  );

  const getUserDataFromServer = () => {
    //api call
    // const userId = userContext.userData.user.userId;
    getUser(userId)
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("error is occure");
      });
  };

  const updateFieldHandler = (event, property) => {
    setUser({ ...user, [property]: event.target.value });
  };

  //update userData from calling api..
  const updateUserData = () => {
    console.log("updating user data");
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("user name required !!");
      return;
    }
    //... rest of the field
    setUpdateLoading(true);
    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        toast.success("User details updated !!");

        //update image..
        if (image.file == null) {
          setUpdateLoading(false);
          handleClose();
          return;
        }
        updateUserProfilePicture(image.file, user.userId)
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image not uploaded !!");
          })
          .finally(() => {
            setUpdateLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not updated !! Error");
        setUpdateLoading(false);
      });
  };

  //function for image change

  const handleProfileImageChange = (event) => {
    // const localFile=event.target.files[0]

    console.log(event.target.files[0]);

    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: event.target.files[0],
        });
        console.log(r.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      image.file = null;
    }
  };

  //clear image

  const clearImage = (event) => {
    setImage({
      placeholder: defaultImg,
      file: null,
    });
  };

  //update view

  const updateViewModal = () => {
    return (
      <div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-dark fw-bold ">
              Update the informations
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card
              className="shadow border-0"
              style={{
                borderRadius: "23px",
              }}
            >
              <Card.Body>
                <Table responsive borderless striped hover>
                  <tbody>
                    <tr>
                      <td>Profile Image</td>
                      <td className=" text-center">
                        {/*  image tag for preview*/}
                        <img
                          className="border-0 p-1 shadow m-3"
                          style={profileStyle}
                          src={image.placeholder}
                          alt=""
                        />
                        <InputGroup>
                          <Form.Control
                            type="file"
                            onChange={handleProfileImageChange}
                          />
                          <Button
                            onClick={clearImage}
                            variant="outlined" 
                            color="secondary"
                          >
                            Clear
                          </Button>
                        </InputGroup>
                        <p className="mt-1 text-danger">
                          *Select profile picture size less than 2MB
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td>Name</td>
                      <td>
                        <Form.Control
                          className=""
                          type="text"
                          value={user.name}
                          onChange={(event) =>
                            updateFieldHandler(event, "name")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>New Password</td>
                      <td>
                        <Form.Control
                          placeholder="Enter new password here.."
                          type="password"
                          onChange={(event) =>
                            updateFieldHandler(event, "password")
                          }
                        />
                        <p className=" text-danger ">
                          *leave the field blank for the same password
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{user.gender}</td>
                    </tr>
                    <tr>
                      <td>About</td>
                      <td>
                        <Form.Control
                          className=""
                          as={"textarea"}
                          value={user.about}
                          onChange={(event) =>
                            updateFieldHandler(event, "about")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Roles</td>
                      <td>
                        {user.roles.map((role) => (
                          <div key={role.roleId}>{role.roleName}</div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="error" onClick={handleClose} className="m-1">
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={updateUserData}
              disabled={updateLoading}
            >
              <Spinner
                animation="border"
                size="sm"
                hidden={!updateLoading}
                className="me-3"
              />
              <span hidden={updateLoading}>Save Changes</span>
              <span hidden={!updateLoading}>Updating..</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col
            md={{
              span: 8,
              offset: 2,
            }}
          >
            {user ? (
              <>
                <UserProfileView
                  user={
                    //   {
                    //   name:"Saurabh Maurya",
                    //   email:"saurabh@gmail.com",
                    //   gender:"Male",
                    //   about:"Hey,I am a professional react devloper",
                    //   roles:[{roleId:1,roleName:"Admin"},{roleId:2,roleName:'Normal' }]
                    // }
                    user
                  }
                  handleShowModal={handleShowModal}
                />
                {updateViewModal()}
              </>
            ) : (
              <Alert>
                <h1 className="text-center mt-3">
                  User not loaded from server !!
                  {/* {console.log(user)} */}
                </h1>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
