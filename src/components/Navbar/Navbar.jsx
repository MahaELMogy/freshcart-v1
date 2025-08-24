import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/freshcart-logo.svg";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function Navbar() {
  let { UserToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  let { numOfCartItems } = useContext(CartContext);
  let { wishlistCount } = useContext(WishlistContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user-token");
    setUserToken(null);
    navigate("/login");
  };

  return (
    <nav className="fixed w-full px-4 sm:px-10 bg-white/80 backdrop-blur-md shadow-md transition-transform duration-300 transform-gpu z-50">
      <div className="container py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="" className="cursor-pointer">
          <img src={Logo} alt="Logo" className="w-28 sm:w-36" />
        </Link>

        {/* Main Menu (Desktop) */}
        <ul className="hidden lg:flex space-x-4 sm:space-x-6 text-gray-700 text-sm sm:text-base font-medium">
          {UserToken && (
            <>
              <li>
                <NavLink to="" className="hover:text-green-500">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="Cart" className="hover:text-green-500">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="WishList" className="hover:text-green-500">
                  Wish List
                </NavLink>
              </li>
              <li>
                <NavLink to="Products" className="hover:text-green-500">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="Categories" className="hover:text-green-500">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="Brands" className="hover:text-green-500">
                  Brands
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Social Media (Desktop) */}
        <div className="hidden lg:flex gap-3 sm:gap-4 text-gray-700 text-lg">
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

        {/* Mobile Menu Button */}
        {UserToken && (
          <button
            onClick={toggleMenu}
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

        {/* Auth Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {UserToken === null && (
            <>
              <NavLink
                to="Login"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 sm:py-2 sm:px-4 rounded-md shadow-sm text-sm sm:text-base text-center"
              >
                Login
              </NavLink>
              <NavLink
                to="Register"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 sm:py-2 sm:px-4 rounded-md shadow-sm text-sm sm:text-base text-center"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Cart & Wishlist Icons */}
        {UserToken && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center text-center">
            <Link to="Cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs px-2 rounded-full">
                {numOfCartItems}
              </span>
              <i className="fa-solid fa-cart-shopping text-xl sm:text-2xl"></i>
            </Link>
            <Link to="WishList" className="relative">
              <span className="absolute -top-2 -right-2 bg-red-100 text-red-800 text-xs px-2 rounded-full">
                {wishlistCount}
              </span>
              <i className="fa-solid fa-heart text-xl sm:text-2xl"></i>
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 sm:py-2 sm:px-4 rounded-md shadow-sm text-sm sm:text-base"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden bg-white shadow-md`}
      >
        <ul className="space-y-3 p-4 text-gray-700 text-sm sm:text-base font-medium">
          <li>
            <NavLink onClick={toggleMenu} to="">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="Cart">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="WishList">
              Wish List
            </NavLink>
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="Products">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="Categories">
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink onClick={toggleMenu} to="Brands">
              Brands
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-center gap-3 py-3 text-gray-700 text-lg">
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
  );
}
