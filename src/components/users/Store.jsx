import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { getCategories } from "../../services/CategoryServices";
import { getAllLive } from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { PRODUCT_PAGE_SIZE } from "../../services/HelperService";
import CategoryView from "./../../components/users/CategoryView";
import { Link, NavLink } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState(null);
  const [category,setCategories]=useState(undefined)
  const [currentPage, setCurrentPage] = useState(0);
  //use hook when component is called category and product both are loaded
  useEffect(() => {
    
    loadProducts(currentPage, PRODUCT_PAGE_SIZE, "addedDate", "desc");
  }, []);

  const loadCategories = (pageNumber, pageSize) => {
    //get api call and load all category
    getCategories(pageNumber, pageSize)
      .then((data) => {
        console.log(data);
        setCategories({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentPage > 0) {
      loadProducts(currentPage, PRODUCT_PAGE_SIZE, "addedDate", "desc");
    }
  }, [currentPage]);

  // loading next page

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    //get api call and load all product
    getAllLive(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);

        if (currentPage > 0) {
          setProducts({
            content: [...products.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        } else {
          setProducts({ ...data });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading Product !!");
      });
  };


  //
  const productView = () => {
    return (
      products && (
        <InfiniteScroll
          dataLength={products.content.length}
          next={loadNextPage}
          hasMore={!products.lastPage}
          loader={<h3 className="my-5 text-center">Loading...</h3>}
          endMessage={<p className="my-4 text-center">All Products Loaded</p>}
        >
          <Container fluid>
            <Row>
              {products.content.map((p) => (
                <Col key={p.productId} md={4}>
                  <SingleProductCard products={p} key={p.productId} />
                </Col>
              ))}
            </Row>
          </Container>
        </InfiniteScroll>
      )
    );
  };

  return (
    <Container  fluid className=" px-5 pt-5">
      <Row>
      <Container>
      <Breadcrumb className="mx-4">
        <Breadcrumb.Item>
          <Link  to="/stores" className="txt-logo-color fw-bold ">Store</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="txt-logo-color fw-bold ">All Products</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Container>
        <Col md={2}><CategoryView/></Col>
        <Col md={10}>{productView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;
