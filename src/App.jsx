import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy } from "react";
import Layout from "./Layout/Layout";

import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import Brands from "./Brands/Brands";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
import Register from "./Register/Register";
import Login from "./Login/Login";
import UserContext from "./UserContext/UserContext";
import ProtectRoute from "./ProtectRoute/ProtectRoute";

import CartContextProvider from "./CartContext/CartContext";
import WishlistContextProvider from "./WishlistContext/WishlistContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// -------------- lazy loading --------------------------------------
// import Cart from "./Cart/Cart";
const Cart = lazy(() => import("./Cart/Cart"));
// ---------------------------------------------------------
// import Checkout from "./Checkout/Checkout";
const Checkout = lazy(() => import("./Checkout/Checkout"));
// ---------------------------------------------------------

// import ProductsDetails from "./productsDetails/productsDetails";
const ProductsDetails = lazy(() => import("./productsDetails/productsDetails"));

// ---------------------------------------------------------

// import ForgotPassword from "./ForgotPassword/ForgotPassword";
const ForgotPassword = lazy(() => import("./ForgotPassword/ForgotPassword"));

// ---------------------------------------------------------

// import ResetPassword from "./ResetPassword/ResetPassword";
const ResetPassword = lazy(() => import("./ResetPassword/ResetPassword"));

// ---------------------------------------------------------

// import VerifyResetCode from "./VerifyResetCode/VerifyResetCode";
const VerifyResetCode = lazy(() => import("./VerifyResetCode/VerifyResetCode"));

// ---------------------------------------------------------
// import WishList from "./WishList/WishList";
const WishList = lazy(() => import("./WishList/WishList"));

const queryClient = new QueryClient();
let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        ),
      },

      {
        path: "Cart",
        element: (
          <ProtectRoute>
            <Cart />
          </ProtectRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectRoute>
            <Products />
          </ProtectRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectRoute>
            <Categories />
          </ProtectRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectRoute>
            <Brands />
          </ProtectRoute>
        ),
      },
      {
        path: "ProductsDetails/:id/:category",
        element: (
          <ProtectRoute>
            <ProductsDetails />
          </ProtectRoute>
        ),
      },
      {
        path: "WishList",
        element: (
          <ProtectRoute>
            <WishList />
          </ProtectRoute>
        ),
      },
      {
        path: "Checkout",
        element: (
          <ProtectRoute>
            <Checkout />
          </ProtectRoute>
        ),
      },

      { path: "ForgotPassword", element: <ForgotPassword /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "VerifyResetCode", element: <VerifyResetCode /> },
      { path: "*", element: <NotFound /> },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContext>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" reverseOrder={false} />
          <WishlistContextProvider>
            <CartContextProvider>
              <RouterProvider router={router}></RouterProvider>
            </CartContextProvider>
          </WishlistContextProvider>
        </QueryClientProvider>
      </UserContext>
    </>
  );
}

export default App;
