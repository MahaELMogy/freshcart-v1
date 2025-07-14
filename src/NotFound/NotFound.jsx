import errorImg from "../assets/error.svg"; // Adjust the path to match where you saved the SVG
import { NavLink } from "react-router-dom";
export default function NotFound() {
  window.scrollTo(0, 0); // Scroll to top

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-center p-6">
      <img src={errorImg} alt="Not Found" className="w-72 mb-8" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <NavLink
        to="/"
        className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        Go to Home
      </NavLink>
    </div>
  );
}
