import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import UserContext from "./UserContext";
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
} from "../services/CartService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, AlertTitle } from "@mui/material";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartProvider = ({ children }) => {
  const MySwal = withReactContent(Swal);
  const { isLogin, userData } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [heading, setHeading] = useState("Initial Heading");
  useEffect(() => {
    console.log(userData);
    if (isLogin) {
      //get user cart
      loadUserCart(userData.user.userId);
    } else {
      setCart(null);
    }
  }, [isLogin]);

  //load user cart initialy
  const loadUserCart = async (userId) => {
    try {
      console.log(userId);
      const cart = await getCart(userId);
      setCart({ ...cart });
      console.log(cart);
    } catch (error) {
      console.log(error);
      setCart({ items: [] });
    }
  };

  //add item to cart

  const addItem = async (quantity, productId, next) => {
    try {
      if (!isLogin) {
        
        MySwal.fire({
          title: "Not Logged In",
          html: <Container>
          <Alert className="m-3 shadow " severity="warning">
         
          <p>
          Please do login to add items to cart.
                    </p>
        </Alert>
          </Container>,
          icon: "error",
        }).then(()=>{

        });
        return;
      }
      const result = await addItemToCart(
        userData.user.userId,
        productId,
        quantity
      );
      setCart({ ...result });
      next();
      // if (quantity > 1) {
      //   toast.success(" Quantity updated !!");
      // } else {
      //   toast.success(" Item added to Cart !!");
      // }
    } catch (error) {
      console.log(error);

      toast.error("error in adding product in cart !!");
    }
  };

  //remove item from cart
  const removeItem = async (itemId) => {
    try {
      const result = await removeItemFromCart(userData.user.userId, itemId);
      const newCartItems = cart.items.filter((item) => {
        if (item.cartItemId != itemId) {
          return item;
        }
      });
      setCart({
        ...cart,
        items: newCartItems,
      });
      toast.success(" Item removed from Cart !!");
    } catch (error) {
      console.log(error);
      toast.error("Error : item  not removed !!");
    }
  };
  return (
    <CartContext.Provider value={{ cart, setCart, removeItem, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
