import React, { useState } from "react";
import { Container } from "react-bootstrap";

import {
  infoWithImageInRightSection,
  TrendingProducts,
  infoWithImageInLeftTopSection,
  infoWithImageInLeftBotomSection,
  infoWithImageInRightBotomSection,
  LightCard,
  Advertise,
  WenterCard,
  StudyLampCard,
  KitchenCard,
  GiftCard,
  infoWithImageInMiddleSection,
  WatchCard,
} from "./HomePageComponent";
import CarouselsHome from "../components/CarouselsHome";
import { Button } from "@mui/material";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

//Import category id
import { LAPTOP_CAT_ID } from "../services/HelperService";
const Index = () => {
  const [products, setProducts] = useState([
    {
      productId: "e24662f0-4ff3-4362-a7a0-d18f4de51128",
      title: "2&CO Pixel 8 Pro 5G (Porcelain, 12GB RAM, 128GB Storage)",
      description:
        "Pixel 8 Pro is crafted with a polished aluminium frame and smooth, matte back glass.",
      price: 98990,
      discountedPrice: 89900,
      quantity: 23,
      addedDate: "2024-02-20T02:13:27.129Z",
      live: true,
      stock: true,
      productImageName: "string",
      category: {
        categoryId: "string",
        title: "Mobile Phones",
        description: "string",
        coverImage: "string",
      },
    },
    {
      productId: "a96d5c5d-db53-4ba5-a7c6-5afa9f5e7c25",
      title: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
      description: "string",
      price: 159900,
      discountedPrice: 148900,
      quantity: 23,
      addedDate: "2024-02-20T02:13:27.129Z",
      live: true,
      stock: true,
      productImageName: "string",
      category: {
        categoryId: "string",
        title: "Mobile Phones",
        description: "string",
        coverImage: "string",
      },
    },
    {
      productId: "a04ff533-a64d-406f-baa8-130ba55ba969",
      title: "Samsung Galaxy S24 Ultra 5G AI Smartphone",
      description: "string",
      price: 144999,
      discountedPrice: 139999,
      quantity: 2,
      addedDate: "2024-02-20T02:13:27.129Z",
      live: true,
      stock: true,
      productImageName: "string",
      category: {
        categoryId: "string",
        title: "Mobile Phones",
        description: "string",
        coverImage: "string",
      },
    },
  ]);

  return (
    <div>
      <div fluid className=" shadow">
        <CarouselsHome />
        <Container
          className="text-center "
          style={{
            position: "relative",
            top: -95,
          }}
        >
          {" "}
          <Button
            as={Link}
            to={`/store/${LAPTOP_CAT_ID}/Laptops`}
            size="large"
            variant="contained"
            color="primary"
          >
            Shop Now
          </Button>
        </Container>
      </div>

      <div style={{ margin: "70px 0px" }}>
        {infoWithImageInRightSection(
          "Discover contemporary trends and timeless classics in our curated collection of modern men's fashion essentials.Elevate your wardrobe effortlessly.",
          "Modern Men's Styles"
        )}
      </div>
      <Container fluid>{Advertise()}</Container>

      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInLeftBotomSection(
          "Discover enduring style with our curated collection of timeless and chic women's fashion essentials. Elevate your wardrobe effortlessly.",
          "Graceful Threads Haven"
        )}
      </div>
      <div className="my-4"> {TrendingProducts(products)} </div>
      {/* <div className="my-5">{contactForm()}</div> */}
      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInLeftTopSection(
          "Experience innovation on your wrist with our curated collection of smartwatches, blending style seamlessly with cutting-edge technology.",
          "Smart Tech Timepieces"
        )}
      </div>
      <Container fluid style={{ margin: "100px 0px" }}>
        {infoWithImageInRightBotomSection(
          "Indulge in our curated collection of beauty products, carefully chosen to enhance your natural radiance and elevate your self-care routine.",
          "Radiant Beauty Essentials"
        )}
      </Container>

      <Container fluid className="text-center mb-5">
        {" "}
        {LightCard()}
      </Container>
      <Container fluid className="text-center mb-5">
        {" "}
        {WenterCard()}
      </Container>
      <Container fluid style={{ margin: " 0px" }} className="text-center mb-5">
        {infoWithImageInMiddleSection(
          "This is random image genreating section which provide us such as grete experience",
          "This is Random Image"
        )}
      </Container>
      <Container fluid className="text-center mb-5">
        {" "}
        {StudyLampCard()}
      </Container>
      <Container fluid className="text-center mb-5">
        {" "}
        {KitchenCard()}
      </Container>
      <Container fluid className="text-center mb-5">
        {" "}
        {GiftCard()}
      </Container>
      <Container fluid className="text-center mb-5">
        {" "}
        {WatchCard()}
      </Container>
      <Footer />
    </div>
  );
};

export default Index;
