import React, { useEffect, useRef, useState } from "react";
import {
 
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addProductImage,
  createProductInCategory,
  createProductWitOutCategory,
} from "../../services/ProductService";
import { getCategories } from "../../services/CategoryServices";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";

const AddProduct = () => {
  const [categories, setCategories] = useState(undefined);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    quantity: 1,
    live: false,
    stock: true,
    image: undefined,
    imagePreview: undefined
  });

  const formClear = () => {
    editorRef.current.setContent("");
    setProduct({
      title: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      quantity: 1,
      live: false,
      stock: true,
      image: undefined,
      imagePreview: undefined,
    });
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState("none");

  // for rich text editor

  const editorRef = useRef();

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading categories !!");
      });
  }, []);

  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setProduct({
          ...product,
          imagePreview: r.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      setProduct({
        ...product,
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  // submitAddPrductForm

  const submitAddPrductForm = (event) => {
    event.preventDefault();
    if (product.title === undefined || product.title.trim() === "") {
      toast.error("Title is required!!");
      return;
    }
    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.error("Description is required!!");
      return;
    }
    if (product.price <= 0) {
      toast.error("Invalid Price !!");
      return;
    }
    if (product.quantity <= 0) {
      toast.error("Invalid Quantity !!");
      return;
    }
    if (
      product.discountedPrice <= 0 ||
      product.discountedPrice >= product.price
    ) {
      toast.error("Invalid discountedPrice !!");
      return;
    }

    //create  product without category
    if (selectedCategoryId === "none") {
      createProductWitOutCategory(product)
        .then((data) => {
          console.log(data);
          toast.success("Product is Created !!");
          //image upload

          if (!product.image) {
            formClear();
            return;
          }

          addProductImage(product.image, data.productId)
            .then((data) => {
              console.log(data);
              toast.success("Image uploaded");
              formClear();
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in uploading image !!");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in creating product !! check product details");
        });
    } else {
      //create  product with category
      createProductInCategory(product, selectedCategoryId)
        .then((data) => {
          console.log(data);
          toast.success("Product is Created !!");

          //image upload

          if (!product.image) {
            formClear();
            return;
          }
          addProductImage(product.image, data.productId)
            .then((data) => {
              console.log(data);
              toast.success("Image uploaded");
              formClear();
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in uploading image !!");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in creating product !! check product details");
        });
    }
  };

  const formView = () => {
    return (
      <>
        <Card className="border-0 shadow">
          <Card.Body>
            <h4 className="fw-bold ">Add Product </h4>
            <Form onSubmit={submitAddPrductForm}>
              {/* product title */}
              <FormGroup className="mt-3">
                <Form.Label>Product title </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here..."
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      title: event.target.value,
                    })
                  }
                  value={product.title}
                />
              </FormGroup>

              {/* product description */}
              <Form.Group className="mt-3">
                <Form.Label>Product Discription</Form.Label>

                {/*    <Form.Control
                  as={"textarea"}
                  placeholder="Enter here.."
                  rows={6}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      description: event.target.value,
                    })
                  }
                  value={product.description}
                />  */}

                <Editor
                  apiKey="8qw0j7srwzw6mlexf5swpvh99nwfcntmvdchtbv940ixdqtp"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 380,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={() =>
                    setProduct({
                      ...product,
                      description: editorRef.current.getContent(),
                    })
                  }
                />
              </Form.Group>

              <Row>
                {/*
                  price
                */}
                <Col>
                  <FormGroup className="mt-3">
                    <Form.Label> Price </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here.."
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          price: event.target.value,
                        })
                      }
                      value={product.price}
                    />
                  </FormGroup>
                </Col>
                {/* Discounted price   */}
                <Col>
                  <FormGroup className="mt-3">
                    <Form.Label>Discounted Price </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here.."
                      onChange={(event) => {
                        setProduct({
                          ...product,
                          discountedPrice: event.target.value,
                        });
                      }}
                      value={product.discountedPrice}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/*  product Quantity  */}
              <Form.Group className="mt-3">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter here."
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      quantity: event.target.value,
                    })
                  }
                  value={product.quantity}
                />
              </Form.Group>

              <Row className="mt-3 px-3">
                <Col>
                  <Form.Check
                    id="live"
                    type="switch"
                    label={"Live"}
                    checked={product.live}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        live: !product.live,
                      })
                    }
                  />
                </Col>
                <Col>
                  <Form.Check
                    id="stock"
                    type="switch"
                    label={"Stock"}
                    checked={product.stock}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      })
                    }
                  />
                </Col>
              </Row>

              {/*  product image  */}
              <Form.Group className="mt-3">
                <Container
                  className="text-center py-4 border-2 shadow"
                  hidden={!product.imagePreview}
                >
                  <p className="text-muted">Image Preview</p>
                  <img
                    className="img-fluid shadow "
                    height={200}
                    width={200}
                    src={product.imagePreview}
                    alt=""
                  />
                </Container>
                <Form.Label className="mt-2">Select Product image</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={"file"}
                    onChange={(event) => handleFileChange(event)}
                  />

                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(event) => {
                      setProduct({
                        ...product,
                        imagePreview: undefined,
                        image: undefined,
                      });
                    }}
                  >
                    Clear
                  </Button>
                </InputGroup>
              </Form.Group>

              {/*  Select Category  */}

              <Form.Group className="mt-3">
                <Form.Label>Select Categroy</Form.Label>
                <Form.Select
                  onChange={(event) =>
                    setSelectedCategoryId(event.target.value)
                  }
                >
                  <option value={"none"}>None</option>
                  {categories ? (
                    <>
                      {categories.content.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.title}
                        </option>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </Form.Select>
              </Form.Group>

              <Container className="text-center mt-3">
                <Button type="submit" variant="contained" color="success" size="medium">
                  Add Product
                </Button>
                <Button
                  onClick={formClear}
                  variant="contained"
                  size="medium"
                  color="error"
                  className="ms-3"
                >
                  Clear Data
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  };

  return <div>{formView()}</div>;
};

export default AddProduct;
