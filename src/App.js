import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";


import Profile from "./pages/users/Profile";
import AboutUser from "./pages/users/AboutUser";
import Dashboard from "./pages/users/Dashboard";
import CustomNav from "./components/Navbar";

import { ToastContainer, toast } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserProvider from "./context/UserProvider";
import Order from "./pages/users/Order";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import AddCategory from "./pages/admin/AddCategory";
import ViewCategories from "./pages/admin/ViewCategories";
import ViewProducts from "./pages/admin/ViewProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import StorePage from "./pages/users/StorePage";
import ProductView from "./pages/users/ProductView";
import CategoryStorePage from "./pages/users/CategoryStorePage";
import CartProvider from "./context/CartProvider";
import Loading from "./components/Loading";
import UseLoader from "./hooks/UseLoader";
import Index from "./pages";
import About from "./pages/About";
import Services from "./pages/Services";
import Carts from "./pages/Cart";
import { Contact } from "./pages/Contact";

function App() {
 const loading=UseLoader();
  return (
    //setting up routes
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastContainer pauseOnHover={false} />
          <CustomNav />
          <Loading show={loading} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/services" element={<Services />} />
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/stores" element={<StorePage />} />
            <Route
              path="/store/products/:productId"
              element={<ProductView />}
            />
            <Route
              path="/store/:categoryId/:categoryTitle"
              element={<CategoryStorePage />}
            />

            <Route path="/users" element={<Dashboard />}>
           
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="aboutuser" element={<AboutUser />} />
              <Route path="orders" element={<Order />} />
            </Route>

            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="categories" element={<ViewCategories />} />
              <Route path="products" element={<ViewProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
