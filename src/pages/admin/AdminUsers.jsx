import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/UserService";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import SingleUserView from "../../components/users/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";
import { USER_PAGE_SIZE } from "../../services/HelperService";
import { Button } from "@mui/material";
import { searchUser } from "../../services/UserService";
import { toast } from "react-toastify";
const AdminUsers = () => {
  const [userData, setUserData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [previousUser, setPreviousUser] = useState(undefined);

  useEffect(() => {
    getUsers(currentPage, USER_PAGE_SIZE, "name", "asc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getUsers(currentPage, USER_PAGE_SIZE, "name", "asc");
    }
  }, [currentPage]);
  const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllUsers(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        if (currentPage == 0) {
          setUserData({
            ...data,
          });
        } else {
          setUserData({
            content: [...userData.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //search User

  const searchUsers = () => {
    if (searchQuery === undefined || searchQuery.trim() === "") {
      return;
    }

    //call server api to search

    searchUser(searchQuery)
      .then((data) => {
        console.log("Saurabh Maurya");
        console.log(data);
        if (data.content.length <= 0) {
          toast.info("No result found");
          return;
        }
        setPreviousUser(userData);
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error ii searching the products");
      });
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const userView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="border border-0 shadow">
              <Card.Body>
                <h3>User List</h3>
                <Form.Group className="mb-3">
                  <Form.Label>Search Users</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search here.."
                      onChange={(event) => {
                        if (event.target.value === "") {
                          if (previousUser) {
                            setUserData(previousUser);
                          }
                        }
                        setSearchQuery(event.target.value);
                      }}
                      value={searchQuery}
                    />
                    <Button
                      onClick={searchUsers}
                      variant="outlined"
                      color="success"
                    >
                      Search
                    </Button>
                  </InputGroup>
                </Form.Group>
                <InfiniteScroll
                  hasMore={!userData.lastPage}
                  dataLength={userData.content.length}
                  next={loadNextPage}
                  loader={<h3 className="text-center my-3">Loading...</h3>}
                  endMessage={
                    <p className="text-center py-3 text-muted">
                      All users loaded !
                    </p>
                  }
                >
                  {userData.content.map((user) => (
                    <SingleUserView key={user.userId} user={user} />
                  ))}
                </InfiniteScroll>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <>{userData && userView()}</>;
};

export default AdminUsers;
