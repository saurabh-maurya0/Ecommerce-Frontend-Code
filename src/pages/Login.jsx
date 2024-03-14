import React, { useContext, useState } from "react";
import Common from "../components/Common";
import {
  Alert,
 
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/UserService";
import UserContext from "../context/UserContext";
import { Button } from "@mui/material";

const Login = () => {
  const redirect = useNavigate();
  const userContext = useContext(UserContext);
  //data hook
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  //error hook
  let [error, setError] = useState({
    errorData: null,
    isError: false,
  });

  //loading hook
  let [loading, setLoading] = useState(false);

  //handlechange function
  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

//reset function implement
const handleReset=()=>{
 setData({
  email: "",
  password: "",
 })
 setError({
  errorData: null,
  isError: false,
 })

 setLoading(false)
}

  //submit form
  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    //clint side validation
    if (data.email == undefined || data.email.trim() == "") {
      toast.error("Email is required !!");
    }
    if (data.password == undefined || data.password.trim() == "") {
      toast.error("Password is required !!");
    }

    //login api
    setLoading(true);
    loginUser(data)
      .then((data) => {
        console.log(data);
        toast.success("Login Successfully !");
        setError({
          errorData: null,
          isError: false,
        });
        //  normal user => normal dashboard

        // userContext.setIsLogin(true);
        // userContext.setUserData(data);
        userContext.login(data);

        redirect("/");

        //admin user => admin dashboard
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error ! something went wrong !!");
        setError({
          errorData: error,
          isError: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginForm = () => {
    return (
      <Container>
        <Row>
          <Col
            md={{
              span: 8,
              offset: 2,
            }}
          >
            <Card
              className="my-3 border-0 shadow"
              style={{
                position: "relative",
                top: -65,
              }}
            >
              <Card.Body>
                <Container className="text-center ">
                  <img src="logo.png" alt="logo" height={100} width={100}  style={{objectFit:"cover"}}/>
                </Container>
                <h3 className="text-center mb-4 display-6 fw-bold txt-logo-color ">
                  Login Here..
                </h3>
                {/*showing alert message*/}
                <Alert
                  variant="danger"
                  onClose={() =>
                    setError({
                      isError: false,
                      errorData: null,
                    })
                  }
                  dismissible
                  show={error.isError}
                >
                  <Alert.Heading>Hey there,</Alert.Heading>
                  <p>{error.errorData?.response?.data?.message}</p>
                </Alert>

                <Form noValidate onSubmit={submitForm}>
                  {/* Email Login Field.. */}

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter here .. "
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                    />
                  </Form.Group>

                  {/* Password Login Field ..*/}

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter here .. "
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                    />
                  </Form.Group>

                  <Container className="text-center">
                    {/* <p>
                      Forget Password !
                      <NavLink
                        className="txt-logo-color fw-bold ms-2"
                        to="/forget"
                      >
                        Click
                      </NavLink>
                    </p>*/}

                    <p>
                      If not registered !
                      <NavLink
                        className="txt-logo-color fw-bold ms-2"
                        to="/register"
                      >
                        Click
                      </NavLink>
                    </p>
                  </Container>

                  <Container className="text-center">
                    <Button type="submit" className="" variant="contained" color="success"       disabled={loading}>
                    <Spinner
                    animation="border"
                    size="sm"
                    hidden={!loading}
                    className="me-2"
                    />
                    <span hidden={!loading}>Please wait..</span>
                    <span hidden={loading}>Login</span>
                    </Button>
                    <Button onClick={handleReset} className="ms-2" variant="contained" color="error">
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
      title="Store / Login"
      description="fill the email and password and explore the services !!"
    >
      {loginForm()}
    </Common>
  );
};

export default Login;
