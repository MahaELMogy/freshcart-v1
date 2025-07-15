import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";
import Helmet from "react-helmet";

export default function WishList() {
  const { addItem } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlistItems } =
    useContext(WishlistContext);
  window.scrollTo(0, 0); // Scroll to top

  // ✅ Toggle Wishlist Handler
  const handleWishlistToggle = (productId) => {
    const isInWishlist = wishlistItems?.some((item) => item._id === productId);
    isInWishlist ? removeFromWishlist(productId) : addToWishlist(productId);
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <title>My WishList</title>
        </Helmet>
      </div>

      <section className="py-9 sm:px-8 md:px-16 lg:px-24 pb-10 max-w-[1400px] mx-auto">
        <h2 className="text-[32px] font-semibold mb-6 text-center text-green-600">
          My Wishlist
        </h2>

        {wishlistItems?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlistItems.map((product) => {
              const isInWishlist = wishlistItems.some(
                (item) => item._id === product._id
              );

              return (
                <div
                  key={product._id}
                  className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition flex flex-col p-2 relative"
                >
                  {/* ❤️ Wishlist Icon */}
                  <div
                    onClick={() => handleWishlistToggle(product._id)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <i
                      className={`fa-solid fa-heart text-2xl transition ${
                        isInWishlist ? "text-red-500" : "text-gray-400"
                      }`}
                    ></i>
                  </div>

                  <Link
                    to={`/ProductsDetails/${product._id}/${product?.category?.name}`}
                  >
                    <img
                      className="w-full h-48 object-contain p-4"
                      src={product.imageCover}
                      alt={product.slug}
                    />
                    <div className="px-5 pb-5">
                      <h5 className="text-lg font-semibold truncate mb-2 text-gray-900 dark:text-white">
                        {product.title.split(" ").slice(0, 4).join(" ")}
                      </h5>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < Math.floor(product.ratingsAverage)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M10.5 0L12.9 6.3l6.6.9-4.8 4.7 1.1 6.5L10.5 15l-5.9 3.1L5.7 11 1 6.3l6.6-.9L10.5 0z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {product.ratingsAverage}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-800">
                          {product.price} EGP
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addItem(product._id)}
                    className="mt-2 bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Add to cart
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )}
      </section>
    </>
  );
}
