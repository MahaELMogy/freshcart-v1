import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import Helmet from "react-helmet";

export default function Checkout() {
  const [Loading, setLoading] = useState(false);
  const { UserToken } = useContext(UserContext);
  const { UserIdCart, clearCart } = useContext(CartContext);
  const Navigate = useNavigate();

  // 🟢 Submit Order API call (Cash on Delivery)
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
        console.log(response.data.status);
        toast.success(response.data.status + "! Your order was completed .");
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

  // 🔥 FIXED: Submit Order Online Payment
  function SubmitPayOnline(values) {
    setLoading(true);

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${UserIdCart}?url=${window.location.origin}`,
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

        // Check if response contains session URL for payment
        if (response.data.session && response.data.session.url) {
          // Redirect to payment gateway
          window.location.href = response.data.session.url;
        } else {
          toast.success("Order placed successfully!");
          // 🧹 Clear cart from context
          clearCart();
          // ✅ Redirect
          Navigate("/");
          window.scrollTo(0, 0);
        }
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
    validate: (values) => {
      const errors = {};

      if (!values.details) {
        errors.details = "Address details are required";
      }

      if (!values.phone) {
        errors.phone = "Phone number is required";
      } else if (!/^\d{10,15}$/.test(values.phone)) {
        errors.phone = "Please enter a valid phone number";
      }

      if (!values.city) {
        errors.city = "City is required";
      }

      return errors;
    },
    onSubmit: SubmitPayOnline,
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Checkout</title>
        </Helmet>
      </div>

      <section className="w-3/4 m-auto mx-auto mt-20 md:mt-10 px-4 sm:px-6 md:px-10 lg:px-16 mb-10">
        <div className="w-full max-w-2xl mx-auto mb-10">
          <h3 className="mt-10 mb-5 text-2xl font-bold text-green-600 text-center">
            Place Your Order
          </h3>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition p-6"
          >
            {/* Details */}
            <div className="flex flex-col">
              <label htmlFor="details" className="text-sm text-gray-700 mb-1">
                Address Details:
              </label>
              <input
                type="text"
                id="details"
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className={`w-full px-3 py-2 rounded-md border ${
                  formik.touched.details && formik.errors.details
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                } focus:ring-1 focus:outline-none`}
                placeholder="Enter your full address"
              />
              {formik.touched.details && formik.errors.details && (
                <span className="text-red-500 text-xs mt-1">
                  {formik.errors.details}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm text-gray-700 mb-1">
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={`w-full px-3 py-2 rounded-md border ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                } focus:ring-1 focus:outline-none`}
                placeholder="Enter your phone number"
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="text-red-500 text-xs mt-1">
                  {formik.errors.phone}
                </span>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm text-gray-700 mb-1">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={`w-full px-3 py-2 rounded-md border ${
                  formik.touched.city && formik.errors.city
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                } focus:ring-1 focus:outline-none`}
                placeholder="Enter your city"
              />
              {formik.touched.city && formik.errors.city && (
                <span className="text-red-500 text-xs mt-1">
                  {formik.errors.city}
                </span>
              )}
            </div>

            {/* Payment Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue("paymentMethod", "cash").then(() => {
                    formik.setSubmitting(true);
                    SubmitForm(formik.values);
                  })
                }
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Loading || !formik.isValid || !formik.dirty}
              >
                {Loading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Cash on Delivery"
                )}
              </button>

              {/* Online Payment */}
              <button
                type="submit"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Loading || !formik.isValid || !formik.dirty}
              >
                {Loading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Pay Online"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
