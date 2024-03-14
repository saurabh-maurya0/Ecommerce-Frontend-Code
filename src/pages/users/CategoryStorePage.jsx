import React, { useEffect, useState } from "react";
import {  Link, useParams } from "react-router-dom";
import { PRODUCT_PAGE_SIZE } from "../../services/HelperService";
import { getProductsOfCategories } from "../../services/ProductService";
import { Breadcrumb, Col, Container, ListGroup, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "../../components/users/SingleProductCard";
import CategoryView from "../../components/users/CategoryView";
import Footer from "../../components/Footer";

const CategoryStorePage = () => {
  const { categoryId, categoryTitle } = useParams();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadPrductsOfCategories(
      currentPage,
      PRODUCT_PAGE_SIZE,
      "addedDate",
      "desc"
    );
  }, [categoryId]);

  useEffect(() => {
    if (currentPage > 0) {
      loadPrductsOfCategories(
        currentPage,
        PRODUCT_PAGE_SIZE,
        "addedDate",
        "desc"
      );
    }
  }, [currentPage]);

  const loadPrductsOfCategories = (pageNumber, pageSize, sortBy, sortDir) => {
    getProductsOfCategories(categoryId, pageNumber, pageSize, sortBy, sortDir)
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
      });
  };

  // loading next page

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

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
    products && (
      <>
        <Container fluid className="px-5 pt-5">
          <Row>
          <Container>
          <Breadcrumb className="mx-4">
            <Breadcrumb.Item>
              <Link  to="/stores" className="txt-logo-color fw-bold ">Store</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="txt-logo-color fw-bold ">{categoryTitle}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
            <Col md={2}>
              <CategoryView />
            </Col>
            <Col md={10}>
              {" "}
              {products.content.length > 0 ? (
                productView()
              ) : (
                <h3 className="mt-5 text-center">No items in this Category</h3>
              )}
            </Col>
          </Row>
        </Container>
        <Footer/>
      </>
    )
  );
};

export default CategoryStorePage;
