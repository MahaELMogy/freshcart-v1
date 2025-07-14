import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function Navbar() {
  let { UserToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  let { numOfCartItems } = useContext(CartContext);
  let { wishlistCount } = useContext(WishlistContext);

  // console.log(Test.data.numOfCartItems);

  let mobileMenu = document.getElementById("mobile-menu");
  function test() {
    mobileMenu.classList.toggle("hidden");
  }

  function demo() {
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("block");
  }

  const handleSignOut = () => {
    localStorage.removeItem("user-token");
    setUserToken(null);
    navigate("/login");
  };
  return (
    <>
      <nav
        id="navbar"
        className="fixed w-full px-10 bg-white/80 backdrop-blur-md shadow-md transition-transform duration-300 transform-gpu z-50"
      >
        <div className="container py-4 flex justify-between items-center">
          <img src={Logo} alt="" />

          <ul className="hidden lg:flex space-x-6 text-gray-700 font-medium">
            {/* login token */}
            {UserToken == null ? null : (
              <>
                <li>
                  <NavLink
                    to=""
                    className="hover:text-green-500 transition-colors"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Cart"
                    className="hover:text-green-500 transition-colors"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/WishList"
                    className="hover:text-green-500 transition-colors"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Products"
                    className="hover:text-green-500 transition-colors"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Categories"
                    className="hover:text-green-500 transition-colors"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Brands"
                    className="hover:text-green-500 transition-colors"
                  >
                    Brands
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="social-media gap-4 hidden lg:flex ">
            <a href="https://www.instagram.com" target="_blank">
              <i className="fa-brands fa-instagram hover:text-green-500"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <i className="fa-brands fa-facebook hover:text-green-500"></i>
            </a>
            <a href="https://www.tiktok.com" target="_blank">
              <i className="fa-brands fa-tiktok hover:text-green-500"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <i className="fa-brands fa-twitter hover:text-green-500"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <i className="fa-brands fa-youtube hover:text-green-500"></i>
            </a>
          </div>
          {UserToken == null ? null : (
            <button
              id="menu-btn"
              onClick={demo}
              className="lg:hidden flex items-center text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          )}

          {UserToken === null ? (
            <>
              <button href="#" className="">
                <NavLink
                  to="Register"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                >
                  Register
                </NavLink>
              </button>
            </>
          ) : null}
          {UserToken === null ? (
            <>
              {" "}
              <button className="">
                <NavLink
                  to="Login"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                >
                  Login
                </NavLink>
              </button>
            </>
          ) : null}

          {/* ----- */}
          {UserToken === null ? null : (
            <>
              <Link to="/Cart">
                <div className="relative">
                  <span className="absolute bottom-7 start-5 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                    {numOfCartItems}
                  </span>
                  <i class="fa-solid fa-cart-shopping fs-3 text-2xl"></i>
                </div>
              </Link>
              <Link to="/WishList">
                <div className="relative">
                  <span className="absolute bottom-7 start-5 bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
                    {wishlistCount}
                  </span>
                  <i class="fa-solid fa-heart text-2xl"></i>
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm cursor-pointer"
              >
                SingOut
              </button>
            </>
          )}
        </div>

        <div id="mobile-menu" className="hidden bg-white lg:hidden shadow-md">
          <ul className="space-y-4 p-4 text-gray-700 font-medium">
            <li>
              <NavLink
                onClick={test}
                to=""
                className="block hover:text-green-500 transition-colors"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={test}
                to="/Cart"
                className="block hover:text-green-500 transition-colors"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={test}
                to="/Products"
                className="block hover:text-green-500 transition-colors"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Categories"
                onClick={test}
                className="block hover:text-green-500 transition-colors"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Brands"
                onClick={test}
                className="block hover:text-green-500 transition-colors"
              >
                Brands
              </NavLink>
            </li>
          </ul>

          <div className="social-media gap-4 flex  justify-center py-5">
            <a href="https://www.instagram.com" target="_blank">
              <i className="fa-brands fa-instagram hover:text-green-500"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <i className="fa-brands fa-facebook hover:text-green-500"></i>
            </a>
            <a href="https://www.tiktok.com" target="_blank">
              <i className="fa-brands fa-tiktok hover:text-green-500"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <i className="fa-brands fa-twitter hover:text-green-500"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <i className="fa-brands fa-youtube hover:text-green-500"></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
