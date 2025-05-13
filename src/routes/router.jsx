import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import ProductsDetails from "../pages/ProductDetails/ProductsDetails";
import OrderPage from "../pages/OrderPage/OrderPage";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import AllProducts from "../pages/AllProducts/AllProducts";
import PrivateRoute from "../PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation";
import ManageOrders from "../pages/Dashboard/ManageOrders/ManageOrders";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import AddProductPage from "../pages/AddProductPage/AddProductPage";
import UpdateProductPage from "../pages/Dashboard/UpdateProductPage/UpdateProductPage";
import ManageCategory from "../pages/Dashboard/ManageCategory/ManageCategory";
import AddCategory from "../pages/Dashboard/AddCategory/AddCategory";
import UpdateCategory from "../pages/Dashboard/UpdateCategory/UpdateCategory";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/product/:id",
        element: <ProductsDetails />
      },
      {
        path: 'order-page',
        element: <OrderPage />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "all-products",
        element: <AllProducts />
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />
      },
      {
        path: "dashboard",
        element: <PrivateRoute> <Dashboard /></PrivateRoute>,
        children: [
          {
            path: "my-orders",
            element: <PrivateRoute><MyOrders /></PrivateRoute>
          },
          {
            path: "manage-orders",
            element: <PrivateRoute><ManageOrders /></PrivateRoute>
          },
          {
            path: "manage-users",
            element: <PrivateRoute><ManageUsers /></PrivateRoute>
          },
          {
            path: "manage-products",
            element: <PrivateRoute><ManageProducts /></PrivateRoute>
          },
          {
            path: "add-product",
            element: <PrivateRoute><AddProductPage /></PrivateRoute>
          },
          {
            path: "update-product",
            element: <PrivateRoute><UpdateProductPage /></PrivateRoute>
          },
          {
            path: "manage-category",
            element: <PrivateRoute><ManageCategory/></PrivateRoute>
          },
          {
            path: "add-category",
            element: <PrivateRoute><AddCategory/></PrivateRoute>
          },
          {
            path: "update-category",
            element: <PrivateRoute><UpdateCategory/></PrivateRoute>
          }

        ]
      }
    ]
  },
]);

export default router;