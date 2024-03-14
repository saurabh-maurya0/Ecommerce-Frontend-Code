# QuikBazaar -  E-commerce WebApplication

Welcome to QuikBazaar, a feature-rich e-commerce platform that seamlessly integrates a robust React.js front end with a powerful Spring Boot backend, backed by MySQL for data storage. This full-stack solution exemplifies my expertise in creating dynamic and scalable web applications.

## Contact Information
- **Developer:** Saurabh Maurya
- **Website:** [QuikBazaar](https://quikbazaar.netlify.app/)
- **Email:** saurabhmaurya.in@gmail.com
- **License:** [OPEN License](https://vvnt.netlify.app/)

## API Documentation External Docs
For additional information, refer to the [external documentation](https://github.com/saurabhm1).

## API Base URL
[http://quikbazaar.up.railway.app](http://quikbazaar.up.railway.app) - Generated server URL.


## Frontend (React.js):

1. **Interactive User Experience:**
   - Engaging product pages with real-time updates and smooth transitions.
   - Intuitive navigation and user-friendly design for optimal user experience.

2. **Efficient State Management:**
   - Leveraging React.js for efficient state management, ensuring dynamic and seamless interactions.

3. **Responsive Design:**
   - A layout that adapts flawlessly to various devices, providing a consistent experience on desktops, tablets, and mobiles.

## Backend (Spring Boot):

1. **RESTful API:**
   - Building a RESTful API to facilitate communication between the frontend and backend.
   - Efficient handling of HTTP requests and responses for a smooth user experience.

2. **User Authentication and Authorization:**
   - Implementing secure user authentication and authorization mechanisms to protect user data and ensure a safe environment.

3. **Data Processing and Logic:**
   - Utilizing Spring Boot for efficient data processing, business logic implementation, and seamless integration with the database.

## Database (MySQL):

1. **Relational Data Management:**
   - Designing a well-structured relational database schema to manage product information, user data, and order details.

2. **Transaction Management:**
   - Ensuring the integrity of transactions, allowing users to safely place and track orders.

3. **Scalability and Performance:**
   - Optimizing database queries and indexing for improved performance as the user base grows.

## Key Features:

1. **Product Catalog:**
   - Comprehensive catalog with categorization for easy navigation.
   - Detailed product pages with high-quality images, descriptions, and user reviews.

2. **Search and Filters:**
   - Robust search functionality with filters for refining search results.

3. **Shopping Cart:**
   - Seamless cart management with real-time updates on order summary.

4. **User Accounts:**
   - Secure user authentication and personalized accounts for order history and preferences.

5. **Checkout Process:**
   - Streamlined checkout with multiple payment options and order tracking.

6. **Admin Dashboard:**
   - Admin panel for managing products, user accounts, and monitoring order processing.
   - Analytics and reporting tools for gaining insights into user behavior and sales trends.

## Technologies Used:

- **Frontend:** React.js, JavaScript, CSS
- **Backend:** Spring Boot (Java)
- **Database:** MySQL
- **API Communication:** RESTful API

Explore the QuikBazaar project to witness the seamless integration of React.js with Spring Boot, providing a comprehensive e-commerce solution with a rich set of features. Dive into the codebase to understand the intricacies of full-stack development and feel free to reach out with any questions or feedback!


# QuikBazaar API Documentation

Welcome to the QuikBazaar API documentation, providing insights into the precision and innovation of Saurabh Maurya's expertly crafted E-commerce backend code. QuikBazaar offers a dynamic and reliable online shopping experience powered by Spring Boot, reshaping the future of E-commerce technology.


## Table of Contents
1. [Authentication](#authentication)
   - [Login](#login)
   - [Login with Google](#login-with-google)
2. [User Operations](#user-operations)
   - [Get Single User](#get-single-user-by-userid)
   - [Update User](#update-user)
   - [Delete User](#delete-user)
   - [Get All Users](#get-all-users)
   - [Create New User](#create-new-user)
   - [Serve User Image](#serve-user-image)
   - [Upload User Image](#upload-user-image)
   - [Search Users](#search-users)
   - [Get User by Email](#get-user-by-email)
   - [Get Current User](#get-current-user)
3. [Product Operations](#product-operations)
   - [Get Product](#get-product)
   - [Update Product](#update-product)
   - [Delete Product](#delete-product)
   - [Get All Products](#get-all-products)
   - [Create Product](#create-product)
   - [Serve Product Image](#serve-product-image)
   - [Upload Product Image](#upload-product-image)
   - [Search Products](#search-products)
   - [Get All Live Products](#get-all-live-products)
4. [Order Operations](#order-operations)
   - [Update Order](#update-order)
   - [Remove Order](#remove-order)
   - [Get Orders](#get-orders)
   - [Create Order](#create-order)
   - [Get Orders of User](#get-orders-of-user)
5. [Category Operations](#category-operations)
   - [Get Single Category](#get-single-category)
   - [Update Category](#update-category)
   - [Delete Category](#delete-category)
   - [Get All Categories](#get-all-categories)
   - [Create Category](#create-category)
   - [Get Products of Category](#get-products-of-category)
   - [Create Product with Category](#create-product-with-category)
6. [Cart Operations](#cart-operations)
   - [Get Cart](#get-cart)
   - [Add Item to Cart](#add-item-to-cart)
   - [Clear Cart](#clear-cart)
   - [Remove Item from Cart](#remove-item-from-cart)
7. [Payment Operations](#payment-operations)
   - [Initiate Payment](#initiate-payment)
   - [Verify and Save Payment](#verify-and-save-payment)

## Authentication

### Login
- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      // UserDto details
    }
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Login with Google
- **Endpoint:** `/auth/google`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    // Google Sign-In response
  }
  ```
- **Response:**
  ```json
  {
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      // UserDto details
    }
  }
  ```
- **Security:** Bearer Token (`JWT`)

## User Operations

### Get Single User by UserId
- **Endpoint:** `/users/{userId}`
- **Method:** `GET`
- **Parameters:**
  - `{userId}`: User ID (String)
- **Response:**
  ```json
  {
    // UserDto details
  }
  ```

### Update User
- **Endpoint:** `/users/{userId}`
- **Method:** `PUT`
- **Parameters:**
  - `{userId}`: User ID (String)
- **Request Body:**
  ```json
  {
    // UserDto details
  }
  ```
- **Response:**
  ```json
  {
    // Updated UserDto details
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Delete User
- **Endpoint:** `/users/{userId}`
- **Method:** `DELETE`
- **Parameters:**
  - `{userId}`: User ID (String)
- **Response:**
  ```json
  {
    "message": "User deleted successfully",
    "success": true


  }
  ```
- **Security:** Bearer Token (`JWT`)

### Get All Users
- **Endpoint:** `/users`
- **Method:** `GET`
- **Response:**
  ```json
  {
    // List of UserDto
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Create New User
- **Endpoint:** `/users`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    // UserDto details
  }
  ```
- **Response:**
  ```json
  {
    // UserDto details of the created user
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Serve User Image
- **Endpoint:** `/users/{userId}/image`
- **Method:** `GET`
- **Parameters:**
  - `{userId}`: User ID (String)
- **Response:**
  - User image (Binary)

### Upload User Image
- **Endpoint:** `/users/{userId}/image`
- **Method:** `POST`
- **Parameters:**
  - `{userId}`: User ID (String)
- **Request Body:**
  - Image file (multipart/form-data)
- **Response:**
  ```json
  {
    "message": "Image uploaded successfully",
    "success": true
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Search Users
- **Endpoint:** `/users/search`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    // Search criteria
  }
  ```
- **Response:**
  ```json
  {
    // List of UserDto matching the search criteria
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Get User by Email
- **Endpoint:** `/users/email/{email}`
- **Method:** `GET`
- **Parameters:**
  - `{email}`: User email (String)
- **Response:**
  ```json
  {
    // UserDto details
  }
  ```

### Get Current User
- **Endpoint:** `/users/me`
- **Method:** `GET`
- **Response:**
  ```json
  {
    // UserDto details
  }
  ```
- **Security:** Bearer Token (`JWT`)

## Product Operations

### Get Product
- **Endpoint:** `/products/{productId}`
- **Method:** `GET`
- **Parameters:**
  - `{productId}`: Product ID (String)
- **Response:**
  ```json
  {
    // ProductDto details
  }
  ```

### Update Product
- **Endpoint:** `/products/{productId}`
- **Method:** `PUT`
- **Parameters:**
  - `{productId}`: Product ID (String)
- **Request Body:**
  ```json
  {
    // ProductDto details
  }
  ```
- **Response:**
  ```json
  {
    // Updated ProductDto details
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Delete Product
- **Endpoint:** `/products/{productId}`
- **Method:** `DELETE`
- **Parameters:**
  - `{productId}`: Product ID (String)
- **Response:**
  ```json
  {
    "message": "Product deleted successfully",
    "success": true
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Get All Products
- **Endpoint:** `/products`
- **Method:** `GET`
- **Response:**
  ```json
  {
    // List of ProductDto
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Create Product
- **Endpoint:** `/products`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    // ProductDto details
  }
  ```
- **Response:**
  ```json
  {
    // ProductDto details of the created product
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Serve Product Image
- **Endpoint:** `/products/{productId}/image`
- **Method:** `GET`
- **Parameters:**
  - `{productId}`: Product ID (String)
- **Response:**
  - Product image (Binary)

### Upload Product Image
- **Endpoint:** `/products/{productId}/image`
- **Method:** `POST`
- **Parameters:**
  - `{productId}`: Product ID (String)
- **Request Body:**
  - Image file (multipart/form-data)
- **Response:**
  ```json
  {
    "message": "Image uploaded successfully",
    "success": true
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Search Products
- **Endpoint:** `/products/search`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    // Search criteria
  }
  ```
- **Response:**
  ```json
  {
    // List of ProductDto matching the search criteria
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Get All Live Products
- **Endpoint:** `/products/live`
- **Method:** `GET`
- **Response:**
  ```json
  {
    // List of live ProductDto
  }
  ```
- **Security:** Bearer Token (`JWT`)

## Order Operations

### Update Order
- **Endpoint:** `/orders/{orderId}`
- **Method:** `PUT`
- **Parameters:**
  - `{orderId}`: Order ID (String)
- **Request Body:**
  ```json
  {
    // OrderDto details
  }
  ```
- **Response:**
  ```json
  {
    // Updated OrderDto details
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Remove Order
- **Endpoint:** `/orders/{orderId}`
- **Method:** `DELETE`
- **Parameters:**
  - `{orderId}`: Order ID (String)
- **Response:**
  ```json
  {
    "message": "Order removed successfully",
    "success": true
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Get Orders
- **Endpoint:** `/orders`
- **Method:** `GET`
- **Response:**
  ```json
  {
    // List of OrderDto
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Create Order
- **Endpoint:** `/orders`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    // OrderDto details
  }
  ```
- **Response:**
  ```json
  {
    // OrderDto details of the created order
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Get Orders of User
- **Endpoint:** `/orders/user/{userId}`
- **Method:** `GET`
- **Parameters:**
  - `{userId}`: User ID (String)
- **Response:**
  ```json
  {
    // List of OrderDto for the user
  }
  ```

## Category Operations

### Get Single Category
- **Endpoint:** `/categories/{categoryId}`
- **Method:** `GET`
- **Parameters:**
  - `{categoryId}`: Category ID (String)
- **Response:**
  ```json
  {
    // CategoryDto details
  }
  
  
### Get All Categories
- **Endpoint:** `/categories`
- **Method:** `GET`
- **Response:**
  ```json
  {
    // List of CategoryDto
  }
  ```

### Create Category
- **Endpoint:** `/categories`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    // CategoryDto details
  }
  ```
- **Response:**
  ```json
  {
    // CategoryDto details of the created category
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Update Category
- **Endpoint:** `/categories/{categoryId}`
- **Method:** `PUT`
- **Parameters:**
  - `{categoryId}`: Category ID (String)
- **Request Body:**
  ```json
  {
    // CategoryDto details
  }
  ```
- **Response:**
  ```json
  {
    // Updated CategoryDto details
  }
  ```
- **Security:** Bearer Token (`JWT`)

### Delete Category
- **Endpoint:** `/categories/{categoryId}`
- **Method:** `DELETE`
- **Parameters:**
  - `{categoryId}`: Category ID (String)
- **Response:**
  ```json
  {
    "message": "Category deleted successfully",
    "success": true
  }
  ```
- **Security:** Bearer Token (`JWT`)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
