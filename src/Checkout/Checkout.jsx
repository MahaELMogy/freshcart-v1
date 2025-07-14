import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import Helmet from "react-helmet";

export default function Checkout() {
  window.scrollTo(0, 0); // Scroll to top

  const [Loading, setLoading] = useState(false);
  const { UserToken } = useContext(UserContext);
  const { UserIdCart, clearCart } = useContext(CartContext);
  const Navigate = useNavigate();

  // 🟢 Submit Order API call
  function SubmitForm(values) {
    setLoading(true);

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${UserIdCart}`,
        {
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
          },
        },
        {
          headers: {
            token: UserToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Order placed successfully!");

        // 🧹 Clear cart from context
        clearCart();

        // ✅ Redirect
        Navigate("/");
        window.scrollTo(0, 0); // Scroll to top
      })
      .catch((error) => {
        toast.error("Something went wrong with your order.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // 🔧 Formik setup
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: SubmitForm,
  });

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Checkout</title>
        </Helmet>
      </div>

      <section className="px-4 sm:px-8 md:px-16 lg:px-24 pb-10">
        <div className="w-3/4 m-auto mb-10">
          <h3 className="my-6 text-2xl font-bold text-green-600 text-center">
            Place Your Order
          </h3>

          <form
            onSubmit={formik.handleSubmit}
            className="w-1/2 flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition p-6 mx-auto"
          >
            {/* Details */}
            <div className="flex flex-col">
              <label htmlFor="details" className="text-sm text-gray-700">
                Address Details:
              </label>
              <input
                type="text"
                id="details"
                required
                name="details"
                onChange={formik.handleChange}
                value={formik.values.details}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                required
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm text-gray-700">
                City:
              </label>
              <input
                required
                type="text"
                id="city"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <div className="">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full"
                disabled={Loading}
              >
                {Loading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
