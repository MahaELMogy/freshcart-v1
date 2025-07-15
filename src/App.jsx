import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy } from "react";
import Layout from "./components/Layout/Layout";

import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserContext from "./components/UserContext/UserContext";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";

import CartContextProvider from "./components/CartContext/CartContext";
import WishlistContextProvider from "./components/WishlistContext/WishlistContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// -------------- lazy loading --------------------------------------
// import Cart from "./Cart/Cart";
const Cart = lazy(() => import("./components/Cart/Cart"));
// ---------------------------------------------------------
// import Checkout from "./Checkout/Checkout";
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
// ---------------------------------------------------------

// import ProductsDetails from "./productsDetails/productsDetails";
const ProductsDetails = lazy(() =>
  import("./components/productsDetails/productsDetails")
);

// ---------------------------------------------------------

// import ForgotPassword from "./ForgotPassword/ForgotPassword";
const ForgotPassword = lazy(() =>
  import("./components/ForgotPassword/ForgotPassword")
);

// ---------------------------------------------------------

// import ResetPassword from "./ResetPassword/ResetPassword";
const ResetPassword = lazy(() =>
  import("./components/ResetPassword/ResetPassword")
);

// ---------------------------------------------------------

// import VerifyResetCode from "./VerifyResetCode/VerifyResetCode";
const VerifyResetCode = lazy(() =>
  import("./components/VerifyResetCode/VerifyResetCode")
);

// ---------------------------------------------------------
// import WishList from "./WishList/WishList";
const WishList = lazy(() => import("./components/WishList/WishList"));

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
