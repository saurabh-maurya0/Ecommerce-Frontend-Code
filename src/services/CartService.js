import { privateAxios } from "./AxiosService";

//get cart
export const getCart = async(userId) => {
    console.log("in side cart service ",userId)
  const res = await privateAxios.get(`/carts/${userId}`);
  console.log(res)
  return res.data;
};

//add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
  const res = await privateAxios.post(`/carts/${userId}`, {
    productId,
    quantity,
  });
  return res.data;
};

//clear cart

export const clearCart = async (userId) => {
  const res = await privateAxios.delete(`/carts/${userId}`);
  return res.data;
};

//remove item from cart

export const removeItemFromCart = async (userId, itemId) => {
  const res = await privateAxios.delete(`/carts/${userId}/items/${itemId}`);
  return res.data;
};


//write another cart related service