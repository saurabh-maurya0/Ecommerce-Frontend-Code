import React, { useEffect, useState } from "react";
import CategoryView from "../../components/CategoryView";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/CategoryServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  
  Container,
  Form,
  FormGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@mui/material";
const ViewCategories = () => {
  const [categories, setCategories] = useState({
    content: [],
  });
  const [loading, setLoading] = useState(false);
 const [currentPage,setCurrentPage] = useState(0)
  const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "contain",
  };
  //view modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //update modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [selectedCategory, setSelectedCategory] = useState(undefined);
//inetial page loading
  useEffect(() => {
    setLoading(true);
    getCategories(0,6)
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories from server !");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

//current page loading
useEffect(()=>{
  if(currentPage>0){
    getCategories(currentPage,6)
    .then((data) => {
      console.log(data);
      setCategories({
content:[...categories.content,...data.content],
lastPage:data.lastPage,
pageNumber:data.pageNumber,
pageSize:data.pageSize,
totalElements:data.totalElements,
totalPages:data.totalPages


      });
    })
    .catch((error) => {
      console.log(error);
      toast.error("Error in loading categories from server !");
    })
    
  }

},[currentPage])



  //delete category main function
  const deleteCategoryMain = (categoryId) => {
    // sweat alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b5e20 ",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // api call
        deleteCategory(categoryId)
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success",
            });
            const newArray = categories.content.filter((c) => {
              return c.categoryId != categoryId;
            });

            setCategories({
              ...categories,
              content: newArray,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error ! Category not deleted !!");
          });
      }
    });
  };

  //handle View Button of Category
  const handleView = (category) => {
    // alert("View button clicked !!");
    setSelectedCategory(category);
    handleShow();
  };

  // handle update of Category
  const handleUpdate = (category) => {
    setSelectedCategory(category);
    handleShowUpdate();
  };

  //update category to server
  const updateCategoryClicked = (event) => {
    event.preventDefault();
    if (
      selectedCategory.title === undefined ||
      selectedCategory.title.trim() === ""
    ) {
      toast.error("Title required !!");
      return;
    }

    updateCategory(selectedCategory)
      .then((data) => {
        console.log(data);
        const newCategories = categories.content.map((cat) => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = data.title;
            cat.description = data.description;
            cat.coverImage = data.coverImage;
          }
          return cat;
        });

        setCategories({
          ...categories,
          content: newCategories,
        });
        handleCloseUpdate();
        toast.success("Category Updated !!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating category !!");
      });
  };


  //load next page functoin
  const loadNextPage = () => {
    console.log("loading next page..");
    setCurrentPage(currentPage+1)
  };

  //modal view : View
  const modalView = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <img
                src={selectedCategory.coverImage}
                className="rounded  "
                style={imageStyle}
                alt="Category Cover Image"
              />
            </Container>
            <div className="mt-3"> {selectedCategory.description}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
//
  const modalUpdate = () => {
    return (
      <>
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  value={selectedCategory.title}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      title: event.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  value={selectedCategory.description}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      description: event.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Container className="py-3">
                  <img
                    className="img-fluid"
                    src={selectedCategory.coverImage}
                    alt=""
                  />
                </Container>
                <Form.Label>Category Image Url</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCategory.coverImage}
                  onChange={(event) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      coverImage: event.target.value,
                    })
                  }
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="secondary" size="small" className="m-1" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="contained" color="success" size="small" onClick={updateCategoryClicked}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
//
  return (
    <div>
      <Container className="text-center p-3" hidden={!loading}>
        <Spinner variant="" />
        <div>
          <h3 className="m-2 ">Loading....</h3>
        </div>
      </Container>
      {categories.content.length > 0 ? (
        <div>
          <InfiniteScroll
            dataLength={categories.content.length}
            next={loadNextPage}
            hasMore={!categories.lastPage}
            loader={<h2 className="p-2 text-center">Loading...</h2>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {categories.content.map((category) => {
              return (
                <CategoryView
                  viewCat={handleView}
                  updateCat={handleUpdate}
                  deleteCat={deleteCategoryMain}
                  category={category}
                  key={category.categoryId}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      ) : (
        <h5 className=" text-center"> There is no Category Found !</h5>
      )}
      {selectedCategory ? modalView() : ""}
      {selectedCategory ? modalUpdate() : ""}
    </div>
  );
};

export default ViewCategories;
