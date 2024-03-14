import React, { useState } from "react";
import {

  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../services/CategoryServices";
import { Button } from "@mui/material";

const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);

  const handleFieldChange = (event, property) => {
    event.preventDefault();
    setCategory({
      ...category,
      [property]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(category);
    if (category.title === undefined || category.title.trim() === "") {
      toast.error("Category title required !!");
      return;
    }
    if (
      category.description === undefined ||
      category.description.trim() === ""
    ) {
      toast.error("Category description required !!");
      return;
    }

    // call server api to add category
    setLoading(true);
    addCategory(category)
      .then((data) => {
        //success
        toast.success("Category Added !!");
        console.log(data);
        setCategory({
          title: "",
          description: "",
          coverImage: "",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in adding category !!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

const clearForm=(event)=>{
  event.preventDefault()
  setCategory({
    title:'',
    description:'',
    coverImage:''
  })

}

  return (
    <>
      <Container fluid>
        <Card className="border-0 shadow">
          {/* {JSON.stringify(category)} */}
          <Card.Body>
            <h5 className="fw-bold">Add Category</h5>

            <Form onSubmit={handleFormSubmit}>
              <FormGroup className="mt-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here .."
                  onChange={(event) => handleFieldChange(event, "title")}
                  value={category.title}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  rows={6}
                  as={"textarea"}
                  placeholder="Enter here.."
                  onChange={(event) => handleFieldChange(event, "description")}
                  value={category.description}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Category Cover Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here .."
                  onChange={(event) => handleFieldChange(event, "coverImage")}
                  value={category.coverImage}
                />
              </FormGroup>

              <Container className="text-center mt-3">
                <Button type="submit" variant="contained" color="success"  disabled={loading}>
                <Spinner 
                size={"sm"}
                variant="border"
                className="me-2"
                hidden={!loading}
                
                />
                 <span hidden={!loading}>Please wait..</span>
                 <span hidden={loading}> Add Category</span>
                </Button>
                <Button onClick={clearForm} className="ms-2" variant="contained" color="error">
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;
