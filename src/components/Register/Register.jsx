// import React from "react";
// import styles from "./Register.module.css";
import Helmet from "react-helmet";

import { useState } from "react";
// import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";

export default function Register() {
  window.scrollTo(0, 0); // Scroll to top

  const [Loading, setLoading] = useState(false);

  let { UserToken, setUserToken } = useContext(UserContext);

  let Navigate = useNavigate();

  // ------------------ function el SubmitForm ------------------------------
  async function SubmitForm(values) {
    setLoading(true);
    try {
      let req = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );

      if (req.data.message == "success") {
        localStorage.setItem("user-token", req.data.token);
        setUserToken(req.data.token);

        Navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // عرض رسالة الخطأ من السيرفر
      // هنا ممكن تعرضي رسالة للمستخدم على الشاشة
    }
  }
  // ------------------ function validate  ------------------------------
  function validateForm(value) {
    const error = {};
    //------------------------------ name validate ---------------------
    if (value.name == "") {
      error.name = "name is req ";
    } else if (!/^[A-Z][a-zA-z ]{2,29}$/.test(value.name)) {
      error.name = "Invalid name ";
    }
    //------------------------------ email validate ---------------------
    if (value.email == "") {
      error.email = "email is req";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.email)
    ) {
      error.email = "invalid email ";
    }
    //------------------------------ password validate ---------------------
    if (value.password == "") {
      error.password = "password is req";
    } else if (!/^[A-Z][a-z]{3,5}[0-9]{3,5}$/.test(value.password)) {
      error.password = "password invalid";
    }
    //------------------------------ rePassword validate ---------------------
    if (value.rePassword == "") {
      error.rePassword = "rePassword is req";
    } else if (value.rePassword !== value.password) {
      error.rePassword = "rePassword is invalid";
    }
    //------------------------------ phone validate ---------------------
    if (value.phone == "") {
      error.phone = "phone is req";
    } else if (!/^01[0125][0-9]{8}$/.test(value.phone)) {
      error.phone = "phone is invalid";
    }
    return error;
  }

  // ------------------ formik  ------------------------------

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validate: validateForm,
    onSubmit: SubmitForm,
  });

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Register</title>
        </Helmet>
      </div>
      <section>
        <div className="w-3/4 m-auto mb-10 ">
          <h3 className="my-6 text-2xl">Register Now :</h3>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            {/* name  */}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="name"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Name :
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                id="name"
                name="name"
                autoComplete="userName"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* alert name  */}
            {formik.errors.name && formik.touched.name ? (
              <div class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                  ></path>
                </svg>
                <span class="text-red-800"> {formik.errors.name} </span>
              </div>
            ) : null}
            {/* ----------------------------------------------------------------------------------------------------- */}

            {/* email  */}

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Email :
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                id="email"
                name="email"
                autoComplete="userEmail"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* alert email  */}
            {formik.errors.email && formik.touched.email ? (
              <div class="bg-red-200 px-6 py-4  my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                  ></path>
                </svg>
                <span class="text-red-800"> {formik.errors.email} </span>
              </div>
            ) : null}

            {/* ----------------------------------------------------------------------------------------------------- */}
            {/* Password */}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="new-password"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Password :
              </label>
              <input
                autoComplete="new-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                id="new-password"
                name="password"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* alert password */}
            {formik.errors.password && formik.touched.password ? (
              <div class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                  ></path>
                </svg>
                <span class="text-red-800">{formik.errors.password}</span>
              </div>
            ) : null}
            {/* rePassword */}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="new-rePassword"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Confirm Password :
              </label>
              <input
                autoComplete="new-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                type="password"
                id="new-rePassword"
                name="rePassword"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* alert rePassword */}
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div class="bg-red-200 px-6 py-4  my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                  ></path>
                </svg>
                <span class="text-red-800">{formik.errors.rePassword}</span>
              </div>
            ) : null}
            {/* phone  */}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="phone"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                phone :
              </label>
              <input
                autoComplete="userPhone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                type="text"
                id="phone"
                name="phone"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* alert phone */}
            {formik.errors.phone && formik.touched.phone ? (
              <div class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                  ></path>
                </svg>
                <span class="text-red-800">{formik.errors.phone}</span>
              </div>
            ) : null}
            {/* button   */}
            <div className=" ms-auto">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm "
              >
                {Loading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
