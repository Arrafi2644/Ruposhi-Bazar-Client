import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import ProductsDetails from "../pages/ProductDetails/ProductsDetails";
import OrderPage from "../pages/OrderPage/OrderPage";


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
        }
      ]
    },
  ]);

  export default router;