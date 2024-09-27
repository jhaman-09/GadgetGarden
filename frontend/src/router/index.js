import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProduct from "../pages/AllProduct";
import ProductDetails from "../pages/ProductDetails";
import CategoryProducts from "../pages/CategoryProducts";
import CartsProducts from "../pages/CartsProducts";
import SearchProducts from "../pages/SearchProducts";
import RecommendationProducts from "../components/RecommendationProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        children: [
          {
            path: ":id",
            element: <RecommendationProducts />,
          },
        ],
      },
      {
        path: "category-product",
        element: <CategoryProducts />,
      },
      {
        path: "cart",
        element: <CartsProducts />,
      },
      {
        path: "search",
        element: <SearchProducts />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUser />,
          },
          {
            path: "all-products",
            element: <AllProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;
