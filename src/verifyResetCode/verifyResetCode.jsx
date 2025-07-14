import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function VerifyResetCode() {
  const [resetCode, setResetCode] = useState("");
  const navigate = useNavigate();

  function SubmitFormResetPassword(e) {
    e.preventDefault(); // prevent page reload

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: resetCode,
      })
      .then((res) => {
        console.log(res);
        toast.success("DONE");
        navigate("/ResetPassword"); // not navigator
      })
      .catch((error) => {
        console.log(error);
        toast.error("Try again");
      });
  }

  return (
    <>
      <section className="px-4 py-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Verify Code</h2>
        <form
          onSubmit={SubmitFormResetPassword}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Enter your Code"
            className="border p-2 rounded"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Reset Password
          </button>
        </form>
      </section>
    </>
  );
}
