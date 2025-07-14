import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinners from "../spinners/spinners";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function ProductsHome() {
  const { addItem } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlistItems } =
    useContext(WishlistContext);

  // Fetch products using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["Products"],
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/Products`)
        .then((res) => res.data.data),
  });

  if (isLoading) return <Spinners />;
  if (error) return <p className="text-red-500">Error loading products.</p>;

  // Check if product is in wishlist
  const isWishlisted = (productId) =>
    wishlistItems?.some((item) => item._id === productId);

  // Toggle wishlist state
  const handleWishlistToggle = (productId) => {
    isWishlisted(productId)
      ? removeFromWishlist(productId)
      : addToWishlist(productId);
  };

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.map((product) => (
          <div
            key={product._id}
            className="relative bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition flex flex-col p-2"
          >
            {/* Wishlist Icon */}
            <div
              onClick={() => handleWishlistToggle(product._id)}
              className="absolute top-2 right-2 cursor-pointer z-10"
              title="Add to Wishlist"
            >
              <i
                className={`fa-solid fa-heart text-2xl transition-transform duration-200 hover:scale-110 ${
                  isWishlisted(product._id) ? "text-red-500" : "text-gray-400"
                }`}
              ></i>
            </div>

            <Link
              to={`/ProductsDetails/${product._id}/${product?.category?.name}`}
              className="block"
            >
              {/* Product Image */}
              <img
                className="w-full h-48 object-contain p-4"
                src={product.imageCover}
                alt={product.slug || product.title}
              />

              {/* Product Info */}
              <div className="px-5 pb-5">
                <h5 className="text-lg font-semibold truncate mb-2 text-gray-900 dark:text-white">
                  {product?.title}
                </h5>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(product?.ratingsAverage)
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

            {/* Add to Cart Button */}
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
  );
}
