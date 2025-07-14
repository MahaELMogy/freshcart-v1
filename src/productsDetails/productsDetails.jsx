import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinners from "../spinners/spinners";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";
import Helmet from "react-helmet";

export default function ProductsDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedData, setRelatedData] = useState([]);
  const { id, category } = useParams();
  const { addItem } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlistItems } =
    useContext(WishlistContext);
  window.scrollTo(0, 0); // Scroll to top
  // -------------------------- wish list ----------------------------
  const isWishlisted = (productId) =>
    wishlistItems?.some((item) => item._id === productId);

  const handleWishlistToggle = (productId) => {
    isWishlisted(productId)
      ? removeFromWishlist(productId)
      : addToWishlist(productId);
  };

  async function fetchProductDetails() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(res.data.data);
    } catch (error) {
      alert("Failed to fetch product details");
    }
  }

  async function fetchRelatedProducts() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const related = res.data.data.filter(
        (item) => item.category.name === category
      );
      setRelatedData(related);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
    fetchRelatedProducts();
  }, [id, category]);

  if (!productDetails) return <Spinners />;

  return (
    <>
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 pb-10">
        <div className="application">
          <Helmet>
            <title>Products Details</title>
          </Helmet>
        </div>
        {/* Product Detail Section */}
        <section className="p-6">
          <div className="flex items-center lg:flex-row flex-col gap-6">
            {/* Product Images */}
            <div className="w-full lg:w-1/4">
              <img
                src={productDetails.imageCover}
                alt=""
                className="w-full object-cover rounded-xl mb-2"
              />
              <div className="flex gap-2 justify-center">
                {productDetails.images?.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-1/4 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-4xl font-bold">{productDetails.title}</h3>

                {/* ❤️ Wishlist Icon */}
                <div
                  onClick={() => handleWishlistToggle(productDetails._id)}
                  className="cursor-pointer"
                >
                  <i
                    className={`fa-solid fa-heart text-3xl transition ${
                      isWishlisted(productDetails._id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  ></i>
                </div>
              </div>
              <p className="mb-4 text-gray-700">{productDetails.description}</p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(productDetails.ratingsAverage)
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
                  {productDetails.ratingsAverage}
                </span>
              </div>

              <div className="text-2xl font-bold text-green-600 mb-4">
                EGP {productDetails.price}
              </div>

              <button
                onClick={() => addItem(productDetails.id)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-8 px-4 max-w-[1400px] mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-700">
            Related Products
          </h3>
          <div className="flex flex-wrap -mx-2">
            {relatedData?.map((product) => (
              <div
                key={product._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 relative"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition flex flex-col p-2">
                  {/* Wishlist Icon */}
                  <div
                    onClick={() => handleWishlistToggle(product._id)}
                    className="absolute top-5 right-5 cursor-pointer z-10"
                  >
                    <i
                      className={`fa-solid fa-heart text-2xl ${
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
                      src={product.imageCover}
                      alt={product.slug}
                    />
                    <div className="px-5 pb-5">
                      <h5 className="text-lg font-semibold truncate mb-2 text-gray-900 dark:text-white">
                        {product.title}
                      </h5>

                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.ratingsAverage)
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

                      <div className="text-xl font-bold text-gray-800">
                        {product.price} EGP
                      </div>
                    </div>
                  </Link>
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addItem(product?._id)}
                    className="mt-2 bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
