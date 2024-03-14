import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";
import defaultProductImage from "./../../asset/default-product-image.png";
import {
  addProductImage,
  getAllProducts,
  searchProduct,
  updateProduct,
  updateProductCategory,
} from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import {
  PRODUCT_PAGE_SIZE,
  getProductImageUrl,
} from "../../services/HelperService";
import ShowHtml from "../../components/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import { getCategories } from "../../services/CategoryServices";

const ViewProducts = () => {
  const editorRef = useRef();

  //view product state variable

  const [currentProduct, setCurrentProduct] = useState(undefined);
  const [show, setShow] = useState(false);
  const [previousProducts, setPreviousProducts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageUpdate, setImageUpdate] = useState({
    image: undefined,
    imagePreview: undefined,
  });

  const [categoryChangedId, setCategoryChangeId] = useState("");

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        setCategories({ ...data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeProductViewModal = () => {
    setShow(false);
  };
  const openProductViewModal = (ProductDetail) => {
    console.log(ProductDetail);
    setCurrentProduct(ProductDetail);
    setShow(true);
  };

  //#End view product state variable

  //edit product state variables

  const [showEditModal, setShowEditModal] = useState(false);

  const closeEditProductModel = (event, productEdit) => {
    setShowEditModal(false);
  };

  const openEditProductModel = (event, productEdit) => {
    setShowEditModal(true);
    setCurrentProduct(productEdit);
    // Check if editorRef and editorRef.current are defined
    if (editorRef && editorRef.current) {
      // Assuming setContent is a method on the editor instance
      editorRef.current.setContent(productEdit.description);
    } else {
      console.error("Editor reference is undefined or null.");
    }
  };

  //#End edit product state variables

  const [product, setProducts] = useState(undefined);

  useEffect(() => {
    getProduct();
  }, []);

  //handleUpdateFormSubmit

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    console.log("function call");
    console.log(currentProduct);
    if (currentProduct.title === "") {
      toast.error("title required");
      return;
    }

    //form submit api call

    updateProduct(currentProduct, currentProduct.productId)
      .then((data) => {
        console.log(data);

        //update image also

        if (imageUpdate.image && imageUpdate.imagePreview) {
          addProductImage(imageUpdate.image, currentProduct.productId)
            .then((imageData) => {
              console.log(imageData);
              setCurrentProduct({
                ...currentProduct,
                productImageName: imageData.imageName,
              });
              toast.success("image updated successfully!");
              setImageUpdate({
                imagePreview: undefined,
                image: undefined,
              });
            })
            .catch((error) => {
              console.log(error);
              toast.error("Error in updating image !!!");
            });
        }

        //category update:
        if (
          categoryChangedId === "none" ||
          categoryChangedId === currentProduct.category?.categoryId
        ) {
        } else {
          updateProductCategory(categoryChangedId, currentProduct.productId)
            .then((catData) => {
              console.log(catData);
              toast.success("Category Added Successfully!!");
              setCurrentProduct({
                ...currentProduct,
                category: catData.category,
              });

              const newArray = product.content.map((p) => {
                if (p.productId === currentProduct.productId) return catData;

                return p;
              });
              setProducts({
                ...product,
                content: newArray,
              });
              closeEditProductModel();
              toast.success("Updated Successfully !!");
            })
            .catch((error) => {
              console.log(error);
            });
        }

        const newArray = product.content.map((p) => {
          if (p.productId === currentProduct.productId) return data;

          return p;
        });
        setProducts({
          ...product,
          content: newArray,
        });
        closeEditProductModel();
        toast.success("Updated Successfully !!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Product Not Updated !!");
      });
  };

  const getProduct = (
    pageNumber = 0,
    pageSize = PRODUCT_PAGE_SIZE,
    sortBy = "addedDate",
    sortDir = "asc"
  ) => {
    //get all product by using product service with backend api
    getAllProducts(pageNumber, pageSize, sortBy, "desc", sortDir)
      .then((data) => {
        console.log(data);
        setProducts({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading products !!!");
      });
  };

  //handle update file change

  const handleFileChange = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setImageUpdate({
          imagePreview: r.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      setImageUpdate({
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  //create a function of update product which we will pass as a props

  const updateProductList = (productId) => {
    const newArray = product.content.filter((p) => p.productId != productId);
    setProducts({
      ...product,
      content: newArray,
    });
  };
  //modal view
  const viewProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal size={"xl"} show={show} onHide={closeProductViewModal}>
            <Modal.Header closeButton>
              <Modal.Title>{currentProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card className="shadow border-0">
                <Card.Body>
                  {/*  product picture  */}

                  <Container className="text-center p-3">
                    <img
                      style={{ height: "350px" }}
                      src={
                        currentProduct.productImageName
                          ? getProductImageUrl(currentProduct.productId)
                          : defaultProductImage
                      }
                      alt=""
                    />
                  </Container>
                  <Table striped bordered responsive className="text-center ">
                    <thead>
                      <tr>
                        <th>Info</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product Id</td>
                        <td className="fw-bold">{currentProduct.productId}</td>
                      </tr>
                      <tr>
                        <td>Quantity</td>
                        <td className="fw-bold">{currentProduct.quantity}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td className="fw-bold">₹{currentProduct.price}</td>
                      </tr>
                      <tr>
                        <td>Discounted Price</td>
                        <td className="fw-bold">
                          ₹{currentProduct.discountedPrice}
                        </td>
                      </tr>
                      <tr className={currentProduct.live ? "" : "table-danger"}>
                        <td>Live</td>
                        <td className="fw-bold">
                          {currentProduct.live ? "True" : "False"}
                        </td>
                      </tr>
                      <tr
                        className={currentProduct.stock ? "" : "table-danger"}
                      >
                        <td>Stock</td>
                        <td className="fw-bold">
                          {currentProduct.stock ? "In Stock" : "Not in Stock"}
                        </td>
                      </tr>
                      <tr>
                        <td> Categroy</td>
                        <td className="fw-bold">
                          {currentProduct.category
                            ? currentProduct.category.title
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* description   */}
                  <div className="p-4 border border-1 shadow ">
                    <ShowHtml htmlText={currentProduct.description} />
                  </div>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                color="error"
                size="small"
                className="m-2"
                onClick={closeProductViewModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  //update modal
  //
  const editProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal size="xl" show={showEditModal} onHide={closeEditProductModel}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdateFormSubmit}>
                {/* product title */}
                <FormGroup className="mt-3">
                  <Form.Label>Product title </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter here.."
                    value={currentProduct.title}
                    onChange={(event) =>
                      setCurrentProduct({
                        ...currentProduct,
                        title: event.target.value,
                      })
                    }
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
                    apiKey="8kq8waeqbc6gbmwv0crubx7o3tohy8v6z7vjsd8wplxnx88s"
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
                    value={currentProduct.description}
                    onEditorChange={(event) =>
                      setCurrentProduct({
                        ...currentProduct,
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
                        value={currentProduct.price}
                        placeholder="Enter here.."
                        onChange={(event) =>
                          setCurrentProduct({
                            ...currentProduct,
                            price: event.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  {/* Discounted price   */}
                  <Col>
                    <FormGroup className="mt-3">
                      <Form.Label>Discounted Price </Form.Label>
                      <Form.Control
                        type="number"
                        value={currentProduct.discountedPrice}
                        placeholder="Enter here.."
                        onChange={(event) =>
                          setCurrentProduct({
                            ...currentProduct,
                            discountedPrice: event.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/*  product Quantity  */}
                <Form.Group className="mt-3">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={currentProduct.quantity}
                    placeholder="Enter here."
                    onChange={(event) =>
                      setCurrentProduct({
                        ...currentProduct,
                        quantity: event.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Row className="mt-3 px-3">
                  <Col>
                    <Form.Check
                      id="live"
                      checked={currentProduct.live}
                      type="switch"
                      label={"Live"}
                      onChange={(event) =>
                        setCurrentProduct({
                          ...currentProduct,
                          live: !currentProduct.live,
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      id="stock"
                      checked={currentProduct.stock}
                      type="switch"
                      label={"Stock"}
                      onChange={(event) =>
                        setCurrentProduct({
                          ...currentProduct,
                          stock: !currentProduct.stock,
                        })
                      }
                    />
                  </Col>
                </Row>
                {/*  product image  */}
                <Form.Group className="mt-3">
                  <Container className="text-center py-4 border-2 shadow">
                    <p className="text-muted">Image Preview</p>
                    <img
                      className="img-fluid shadow "
                      height={200}
                      width={200}
                      src={
                        imageUpdate.imagePreview
                          ? imageUpdate.imagePreview
                          : currentProduct.productImageName
                          ? getProductImageUrl(currentProduct.productId)
                          : defaultProductImage
                      }
                      alt=""
                    />
                  </Container>
                  <Form.Label className="mt-2">Select Product image</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={"file"}
                      onChange={(event) => {
                        handleFileChange(event);
                      }}
                    />

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={(event) => {
                        setImageUpdate({
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
                {JSON.stringify(categoryChangedId)}
                <Form.Group className="mt-3">
                  <Form.Label>Select Categroy</Form.Label>
                  <Form.Select
                    onChange={(event) => {
                      setCategoryChangeId(event.target.value);
                    }}
                  >
                    <option value={"none"}>None</option>
                    {categories &&
                      categories.content.map((cat) => {
                        return (
                          <option
                            selected={
                              cat.categoryId ===
                              currentProduct.category?.categoryId
                            }
                            value={cat.categoryId}
                            key={cat.categoryId}
                          >
                            {cat.title}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>
                //
                <Container className="text-center mt-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="medium"
                  >
                    Save Details
                  </Button>
                </Container>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                color="error"
                size="small"
                className="m-2 me-3"
                onClick={closeEditProductModel}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };

  //

  //search Product

  const searchProducts = () => {
    if (searchQuery === undefined || searchQuery.trim() === "") {
      return;
    }

    //call server api to search

    searchProduct(searchQuery)
      .then((data) => {
        if (data.content.length <= 0) {
          toast.info("No result found");
          return;
        }
        setPreviousProducts(product);
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error ii searching the products");
      });
  };

  const productsView = () => {
    return (
      <Card className="border-0 shadow">
        <Card.Body>
          <h5 className="mb-3 fw-bold">View Products</h5>
          <Form.Group className="mb-3">
            <Form.Label>Search Product</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search here.."
                onChange={(event) => {
                  if (event.target.value === "") {
                    if (previousProducts) {
                      setProducts(previousProducts);
                    }
                  }
                  setSearchQuery(event.target.value);
                }}
                value={searchQuery}
              />
              <Button
                onClick={searchProducts}
                variant="outlined"
                color="success"
              >
                Search
              </Button>
            </InputGroup>
          </Form.Group>
          <Table className="text-center" bordered hover responsive size="sm">
            <thead>
              <tr>
                <th className="px-3 small">SN</th>
                <th className="px-3 small">Title</th>
                <th className="px-3 small">Quantity</th>
                <th className="px-3 small">Price</th>
                <th className="px-3 small">Discounted</th>
                <th className="px-3 small">Live</th>
                <th className="px-3 small">Stock</th>
                <th className="px-3 small">Category</th>
                <th className="px-3 small">Date</th>
                <th className="px-3 small">Action</th>
              </tr>
            </thead>
            <tbody>
              {product.content.map((product, index) => (
                <SingleProductView
                  key={index}
                  product={product}
                  index={index}
                  openEditProductModel={openEditProductModel}
                  updateProductList={updateProductList}
                  openProductViewModal={openProductViewModal}
                />
              ))}
            </tbody>
          </Table>
          <Container className="d-flex justify-content-end">
            <Pagination size="md">
              {/*  0 -- totalpages-1  */}
              <Pagination.First
                onClick={(event) => {
                  getProduct((product.pageNumber = 0));
                }}
              />
              <Pagination.Prev
                onClick={(event) => {
                  if (product.pageNumber - 1 < 0) {
                    return;
                  }
                  getProduct(product.pageNumber - 1);
                }}
              />
              {[...Array(product.totalPages)]
                .map((ob, i) => i)
                .map((item) => {
                  return product.pageNumber == item ? (
                    <Pagination.Item active key={item}>
                      {item + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      onClick={(event) => {
                        getProduct(item);
                      }}
                      key={item}
                    >
                      {item + 1}
                    </Pagination.Item>
                  );
                })}

              <Pagination.Next
                onClick={() => {
                  if (product.lastPage) {
                    return;
                  }
                  getProduct(product.pageNumber + 1);
                }}
              />
              <Pagination.Last
                onClick={(event) => {
                  getProduct(product.totalPages - 1);
                }}
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    );
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col>{product ? productsView() : ""}</Col>
        </Row>
      </Container>
      {viewProductModalView()}
      {editProductModalView()}
    </>
  );
};

export default ViewProducts;
