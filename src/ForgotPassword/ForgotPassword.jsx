import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // ✅ Form validation function
  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    return errors;
  }

  // ✅ Submit handler using `.then() / .catch()`
  function onSubmit(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: values.email,
      })
      .then((res) => {
        toast.success("Check your email for the reset code");
        navigate("/VerifyResetCode"); // 🔁 go to next step
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
      });
  }

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit,
  });

  return (
    <section className="px-4 py-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
        Forgot Password
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 bg-white border border-gray-200 shadow p-6 rounded-lg"
      >
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Send Reset Code
        </button>
      </form>
    </section>
  );
}
