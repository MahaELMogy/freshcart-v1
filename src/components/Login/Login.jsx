import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Link } from "react-router-dom";

export default function Login() {
  window.scrollTo(0, 0); // Scroll to top

  let [Spinner, setSpinner] = useState(false);
  let [Message, setMessage] = useState(false);
  let Navigate = useNavigate();
  let { UserToken, setUserToken } = useContext(UserContext);

  // ---------------------------------- Submit Form Login  ----------------------------------------------------
  async function SubmitFormLogin(values) {
    try {
      setSpinner(true);
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      console.log("Login successful:", res.data);

      setSpinner(false);
      if (res.data.message == "success") {
        Navigate("/");
        localStorage.setItem("user-token", res.data.token);
        setUserToken(res.data.token);
      }
      console.log(res.data.message);
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      setSpinner(false);
      console.log(error?.response.data.message);

      setMessage(error.response.data.message);
    }
  }
  // ---------------------------------- validate form ----------------------------------------------------
  function validateFunLogIn(values) {
    let errors = {};
    if (values.email === "") {
      errors.email = "Email is required";
      console.log("Email is required");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
    ) {
      errors.email = "Email is invalid";
      console.log("Email is invalid");
    } else {
      console.log("done");
    }
    if (values.password == "") {
      errors.password = "password is required";
      console.log("password is required");
    } else if (!/^[A-Z][a-z]{3,5}[0-9]{3,5}$/.test(values.password)) {
      errors.password = "password is invalid ";
      console.log("password is invalid");
    } else {
      console.log("done");
    }
    return errors;
  }
  // ---------------------------------- formik  ----------------------------------------------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: SubmitFormLogin,
    validate: validateFunLogIn,
  });

  return (
    <>
      <div className="application">
        <Helmet>
          <title>LogIn</title>
        </Helmet>
      </div>
      <section>
        <div className="w-3/4 m-auto my-7">
          <h3 className="my-6 text-2xl">Login Now :</h3>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            {/* Email */}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Email :
              </label>
              <input
                autoComplete="current-email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
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
                <span class="text-red-800"> {formik.errors.email}</span>
              </div>
            ) : null}

            {/* Password */}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Password :
              </label>
              <input
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                id="password"
                name="password"
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            {formik.errors.password && formik.touched.password ? (
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
                <span class="text-red-800"> {formik.errors.password}</span>
              </div>
            ) : null}
            {Message ? (
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
                <span class="text-red-800"> {Message}</span>
              </div>
            ) : null}
            <Link to="/ForgotPassword">
              <div className="  flex justify-end">
                <a className="underline underline-offset-5 text-gray-400 hover:text-green-600  text-center">
                  Forget Password
                </a>
              </div>
            </Link>

            {/* Submit Button */}
            <div className="ms-auto">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
              >
                {Spinner ? (
                  <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
