import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  // ✅ Validation function
  function validate(values) {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }

    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else if (!/^[A-Z][a-z]{3,5}[0-9]{3,5}$/.test(values.newPassword)) {
      errors.newPassword =
        "Password must start with uppercase, followed by 3-5 lowercase and 3-5 digits";
    }

    return errors;
  }

  // ✅ Submit handler
  function onSubmit(values) {
    setSpinner(true);

    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: values.email,
        newPassword: values.newPassword,
      })
      .then((res) => {
        console.log(res);

        toast.success("Password has been reset");
        navigate("/Login");
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => setSpinner(false));
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validate,
    onSubmit,
  });

  return (
    <section className="px-4 py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
        Reset Your Password
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 bg-white border border-gray-200 shadow p-6 rounded-lg"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm mb-1 font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm mb-1 font-medium"
          >
            New Password:
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            autoComplete="new-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-sm text-red-500">{formik.errors.newPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
        >
          {spinner ? (
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </section>
  );
}
