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


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/product/:id",
          element: <ProductsDetails/>
        },
        {
          path: 'order-page',
          element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
          path: "signup",
          element: <Signup/>
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "all-products",
          element: <AllProducts/>
        },
        {
         path: "order-confirmation",
         element: <OrderConfirmation/>
        },
        {
          path: "dashboard",
          element: <Dashboard/>,
          children: [
            {
              path: "my-orders",
              element: <MyOrders/>
            }
          ]
        }
      ]
    },
  ]);

  export default router;