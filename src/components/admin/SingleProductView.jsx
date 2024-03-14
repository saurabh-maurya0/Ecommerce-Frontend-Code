import React from "react";
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { deleteProduct } from "../../services/ProductService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const SingleProductView = ({
  product,
  index,
  updateProductList,
  openProductViewModal,
  openEditProductModel,
}) => {
  const formateDate = (time) => {
    return new Date(time).toLocaleDateString();
  };

  const getBackgroundForProduct = () => {
    //live + stock ===> green: table-success
    if (product.live && product.stock) {
      return "table-success";
    }
    //not live: ==>red:table-danger
    else if (!product.live) {
      return "table-danger";
    }
    //not stock ==>yellow: table-warning
    else if (!product.stock) {
      return "table-warning";
    } else {
    }
  };

  //deleteProduct
  const deleteProductLocal = (productId) => {
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
        deleteProduct(product.productId)
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
            updateProductList(productId);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error ! Product not deleted !!");
          });
      }
    });
  };

  return (
    <tr className={getBackgroundForProduct()}>
      <td className="px-3 small">{index + 1}</td>
      <td className="px-3 small  ">{product.title}</td>
      <td className="px-3 small">{product.quantity}</td>
      <td className="px-3 small">₹{product.price}</td>
      <td className="px-3 small">₹{product.discountedPrice}</td>
      <td className="px-3 small">{product.live ? "True" : "False"}</td>
      <td className="px-3 small">{product.stock ? "True" : "False"}</td>
      <td className="px-3 small">
        {product.category ? product.category.title : "Null"}
      </td>
      <td className="px-3 small">{formateDate(product.addedDate)}</td>
      <td className="px-3 small d-flex table-light">
        {/*   Delete Button */}
        <Button
          variant="contained"
          color="error"
          size="large"
          className="m-1"
          onClick={(event) => deleteProductLocal(product.productId)}
        >
          <RiDeleteBin6Line />
        </Button>

        {/* View Button   */}
        <Button
          variant="contained"
          onClick={() => openProductViewModal(product)}
          color="info"
          className="m-1"
          size="large"
        >
          <FaEye />
        </Button>

        {/*   Update Button */}
        <Button
          variant="contained"
          onClick={(event) => openEditProductModel(event, product)}
          color="warning"
          size="large"
        >
          <FaRegEdit />
        </Button>
      </td>
    </tr>
  );
};

export default SingleProductView;
