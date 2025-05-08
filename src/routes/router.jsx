import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import ProductsDetails from "../pages/ProductDetails/ProductsDetails";
import OrderPage from "../pages/OrderPage/OrderPage";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import AllProducts from "../pages/AllProducts/AllProducts";


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
          element: <OrderPage/>
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
          path: "/all-products",
          element: <AllProducts/>
        }
      ]
    },
  ]);

  export default router;