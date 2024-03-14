export const BASE_URL = 'https://quikbazaar.up.railway.app';
export const PRODUCT_PAGE_SIZE = 6;
export const ADMIN_ORDER_PAGE_SIZE = 2;
export const USER_PAGE_SIZE = 10;
export const PAYMENT_STATUS = "NOTPAID";
export const ORDER_STATUS = "PENDING";

// //get Category ImageUrl

// // export const getCategoryImageUrl=(categoryId)=>{
// //     return `${BASE_URL}/categories/image/${categoryId}`;
// // }

//get User image url

export const getUserImageUrl = (userId) => {
  return `${BASE_URL}/users/image/${userId}`;
};

//get product image url
export const getProductImageUrl = (productId) => {
  return `${BASE_URL}/products/image/${productId}`;
};

//date formate
export const formatDate = (timeInLongs) => {
  if (!timeInLongs) {
    return null;
  }
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(timeInLongs);
  return (
    date.toLocaleString("en-US", options) +
    "  ," +
    " " +
    date.toLocaleTimeString()
  );
};

//helper categroy id

//laptop category id

export const LAPTOP_CAT_ID = "1146cc41-7b8c-4bd5-9a25-c7b2bdf4c1a0";
export const BEAUTY_CAT_ID = "68b1cf6f-8c40-4e32-915a-90446599c46a";
export const MEN_CAT_ID = "23562e1f-a4fc-49a1-8c14-35d111a4fa77";
export const WOMEN_CAT_ID = "c5c26d92-2630-4da4-aed2-5f90d6765ac4";
export const WATCH_CAT_ID = "5e069cc7-7584-4db2-8004-df56a47e6a23";
export const LIGHT_CAT_ID = "a9e0c1dd-387f-46f3-8c36-9dd1102c6b48";
export const WINTER_CAT_ID = "b8e3c272-de09-430a-8e5d-ebf76697ed2b";
export const STUDY_CAT_ID = "ac61c36b-b1bd-47e1-926a-e445f560dcc8";
export const KITCHEN_CAT_ID = "51d0696d-8cb5-47ee-98cc-0a5377e78f81";
export const GIFT_CAT_ID = "9fba24d9-162c-4f5d-8041-78e0b3ca2643";
