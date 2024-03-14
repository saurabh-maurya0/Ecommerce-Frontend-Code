import React from "react";
import {  Card, Col, Container, Row } from "react-bootstrap";
import img from "./../asset/defultpic.png";
import { Button } from "@mui/material";


const CategoryView = ({ category ,deleteCat,viewCat,updateCat}) => {
  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  };
  const deleteCategory=(categoryId)=>{
   deleteCat(categoryId)
  }
  return (
    <div className="mb-3">
      <Card className="shadow border-0 ">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={2} className="text-center">
              <img
                src={
                  category.coverImage
                    ? category.coverImage.startsWith("http")
                      ? category.coverImage
                      : img
                    : img
                }
                className="rounded-circle "
                style={imageStyle}
                alt="category image"
              />
            </Col>
            <Col md={8}>
              <h5>{category.title}</h5>
              <p>{category.description}</p>
            </Col>
            <Col md={2}>
              <Container className="d-grid ">
                <Button
                  size="small"
                  className="mt-2"
                  variant="contained" 
                  color="error"
                  onClick={(event) => deleteCategory(category.categoryId)}
                >
                  Delete
                </Button>
                <Button size="small" className="mt-1 " variant="contained" color="info" onClick={(event)=>viewCat(category)}>
                  View
                </Button>
                <Button size="small" className="mt-1 mb-2" variant="contained" color="warning" onClick={(event)=>updateCat(category)}>
                  Update
                </Button>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryView;
