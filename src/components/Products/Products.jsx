import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";
import Spinners from "../spinners/spinners";
import UseToGetData from "../UseToGetData/UseToGetData";
import Helmet from "react-helmet";

export default function Products() {
  const { addItem } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlistItems } =
    useContext(WishlistContext);

  const [searchTerm, setSearchTerm] = useState("");
  window.scrollTo(0, 0); // Scroll to top

  let { data, isLoading, error } = UseToGetData("Products");

  if (isLoading) return <Spinners />;
  if (error) return <p>Error loading data</p>;

  const filteredProducts = data.filter((product) =>
    product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Check if a product is in wishlist
  const isWishlisted = (productId) =>
    wishlistItems?.some((item) => item._id === productId);

  // ✅ Toggle Wishlist Handler (Simplified)
  const handleWishlistToggle = (productId) => {
    const isInWishlist = wishlistItems?.find((item) => item._id === productId);
    isInWishlist ? removeFromWishlist(productId) : addToWishlist(productId);
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Products</title>
        </Helmet>

        <section className="px-4 sm:px-8 md:px-16 lg:px-24 pb-10">
          {/* Search Input */}
          <div className="my-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts?.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition flex flex-col p-2 relative"
              >
                {/* ❤️ Wishlist Icon */}
                <div
                  onClick={() => handleWishlistToggle(product?._id)}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <i
                    className={`fa-solid fa-heart text-2xl transition ${
                      isWishlisted(product._id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  ></i>
                </div>

                <Link
                  to={`/ProductsDetails/${product._id}/${product?.category?.name}`}
                >
                  <img
                    className="w-full h-48 object-contain p-4"
                    src={product?.imageCover}
                    alt={product?.slug}
                  />
                  <div className="px-5 pb-5">
                    <h5 className="text-lg font-semibold truncate mb-2 text-gray-900">
                      {product?.title?.split(" ").slice(0, 4).join(" ")}
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
                        {product?.ratingsAverage}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800">
                        {product?.price} EGP
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart */}
                <button
                  onClick={() => addItem(product._id)}
                  className="mt-2 bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
