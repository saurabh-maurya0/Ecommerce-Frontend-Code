import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { getCategories } from "../../services/CategoryServices";
import defaultCategoryImage from "./../../asset/default-product-image.png";

import { Link } from "react-router-dom";

const CategoryView = () => {
  const [Categories, setCategories] = useState(null);
  useEffect(() => {
    loadCategories(0, 100000);
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

  const categoryView = () => {
    return (
      Categories && (
        <>
          <ListGroup
          className="shadow sticky-top " variant="flush"
          >
            <ListGroup.Item  action  as={Link} to={'/stores'}>
              <img
                className="rounded-circle"
                src={defaultCategoryImage}
                alt="img"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                onError={(event) => {
                  event.currentTarget.setAttribute("src", defaultCategoryImage);
                }}
              />
              <span className="ms-2">All Products</span>
            </ListGroup.Item>
            {Categories.content.map((cat) => (
              <ListGroup.Item
                as={Link}
                to={`/store/${cat.categoryId}/${cat.title}`}
                action
                key={cat.categoryId}
              >
                <img
                  className="rounded-circle"
                  src={cat.coverImage}
                  alt="img"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  onError={(event) => {
                    event.currentTarget.setAttribute(
                      "src",
                      defaultCategoryImage
                    );
                  }}
                />
                <span className="ms-2">{cat.title}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )
    );
  };
  //
  return Categories &&  categoryView()
};

export default CategoryView;
