import React, { useState } from "react";
import Common from "../components/Common";
import {
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { registerUser } from "../services/UserService";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const Register = () => {
  //data

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
    gender: "",
  });

  //check error
  const [errorData, setErrorData] = useState({
    isError: "false",
    errorData: "null",
  });

  //loading
  const [loading, setLoading] = useState(false);

  //clear Data
  const clearData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      gender: "",
    });

    setErrorData({
      isError: "false",
      errorData: "null",
    });
  };

  // do signup function
  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    //validate client side
    if (data.name == undefined || data.name.trim() == "") {
      toast.error("Name is required !!");
      return;
    }
    //validate client side
    if (data.email == undefined || data.email.trim() == "") {
      toast.error("Email is required !!");
      return;
    }
    //basics check..

    if (data.password == undefined || data.password.trim() == "") {
      toast.error("Password is required !!");
      return;
    }
    if (
      data.confirmPassword == undefined ||
      data.confirmPassword.trim() == ""
    ) {
      toast.error("ConfirmPassword is required !!");
      return;
    }
    if (data.password != data.confirmPassword) {
      toast.error(" Password and ConfirmPassword is not matched !!");
      return;
    }

    //all right
    //call api
    setLoading(true);
    registerUser(data)
      .then((userData) => {
        //success handler
        console.log(data);
        toast.success("User created successfullly !!");
        clearData();
      })
      .catch((error) => {
        //error handler
        console.log(error);
        setErrorData({
          isError: true,
          errorData: error,
        });
        toast.error("Error is creating user ! Try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle change

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };
  const registerForm = () => {
    return (
      <Container>
        {/* Single Row ==>12 grids (col)*/}

        <Row>
          {/*  {JSON.stringify(data)} */}
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="my-3 border-0 shadow p-4"
              style={{
                position: "relative",
                top: -65,
              }}
            >
              <Card.Body>
                <Container className="text-center ">
                  <img
                    src="logo.png"
                    alt="logo"
                    height={100}
                    width={100}
                    style={{ objectFit: "cover" }}
                  />
                </Container>
                <h3 className="mb-5 text-center fw-bold display-5 txt-logo-color">
                  SignUp
                </h3>
                <Container></Container>
                <Form onSubmit={submitForm} dis>
                  {/* name field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      onChange={(event) => handleChange(event, "name")}
                      value={data.name}
                      isInvalid={errorData.errorData?.response?.data?.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* eamil field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                      isInvalid={errorData.errorData?.response?.data?.email}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* password field */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter new Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                      isInvalid={errorData.errorData?.response?.data?.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Confirm password field */}
                  <Form.Group className="mb-3" controlId="ConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="confirm password"
                      onChange={(event) =>
                        handleChange(event, "confirmPassword")
                      }
                      value={data.confirmPassword}
                    />
                  </Form.Group>

                  {/* gender radio button  */}
                  <FormGroup className="mb-3">
                    <Form.Label>Select Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        name="gender"
                        label="Male"
                        type="radio"
                        id={"gender"}
                        value={"male"}
                        checked={data.gender == "male"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                      <Form.Check
                        inline
                        name="gender"
                        label="Female"
                        type="radio"
                        id={"gender"}
                        value={"female"}
                        checked={data.gender == "female"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                    </div>
                  </FormGroup>

                  {/* text area about field  */}
                  <FormGroup className="mb-2">
                    <Form.Label>Write Something about yourself</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows={6}
                      placeholder="write here"
                      onChange={(event) => handleChange(event, "about")}
                      value={data.about}
                      isInvalid={errorData.errorData?.response?.data?.about}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.about}
                    </Form.Control.Feedback>
                  </FormGroup>
                  {/* if already register field */}
                  <Container>
                    <p className="text-center">
                      Already register !
                      <NavLink to="/login" className="txt-logo-color ">
                        <b> login</b>
                      </NavLink>
                    </p>
                  </Container>

                  {/* Button field */}

                  <Container className="text-center ">
                    <Button
                      type="submit"
                      className=" text-uppercase"
                      variant="contained"
                      color="success"
                      disabled={loading}
                    >
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                        hidden={!loading}
                      />
                      <span hidden={!loading}>wait..</span>
                      <span hidden={loading}>Register</span>
                    </Button>
                    <Button
                      className="ms-3 text-uppercase"
                      variant="contained"
                      color="error"
                      onClick={clearData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <Common
      title="Store / Register"
      description="Fill the from Correctly to register with us !!"
    >
      {registerForm()}
    </Common>
  );
};

export default Register;
