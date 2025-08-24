import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function Cart() {
  let { items, updateCount, removeItem, numOfCartItems, clearCart } =
    useContext(CartContext);

  window.scrollTo(0, 0); // Scroll to top

  return (
    <>
      <div className="application">
        <Helmet>
          <title>My Cart</title>
        </Helmet>
      </div>
      <section className="w-full mt-20 md:mt-10 px-4 sm:px-6 md:px-10 lg:px-16 mb-10  bg-white dark:bg-[#0A2025] ">
        <h3 className="text-center dark:text-white text-2xl sm:text-[32px] font-semibold leading-[38px] text-green-500">
          My Shopping Cart
        </h3>

        {/* Main layout */}
        <div className="flex items-start mt-6 sm:mt-8 gap-6 flex-wrap lg:flex-nowrap">
          {/* Left: Cart table */}
          <div className="bg-white p-3 sm:p-4 w-full lg:w-[800px] rounded-xl overflow-x-auto">
            <table className="w-full min-w-[600px] bg-white rounded-xl">
              <thead>
                <tr className="text-center border-b border-gray-400 text-[#7f7f7f] text-xs sm:text-sm font-medium uppercase leading-[14px] tracking-wide">
                  <th className="text-left px-2 py-2">Product img</th>
                  <th className="text-left px-2 py-2">Product Name</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Subtotal</th>
                  <th className="w-7 px-2 py-2"></th>
                </tr>
              </thead>

              <tbody>
                {items?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  items?.map((product) => (
                    <tr
                      className="text-center border border-gray-200 rounded-lg"
                      key={product?._id}
                    >
                      <td className="px-2 py-2 text-left">
                        <img
                          src={product?.product.imageCover}
                          alt={product?.product.title}
                          className="w-20 h-20 sm:w-[100px] sm:h-[100px] object-cover"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <span className="whitespace-wrap max-w-[150px] sm:max-w-[200px] block text-xs sm:text-base">
                          {product?.product.title}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-sm sm:text-base">
                        {product.price} EGP
                      </td>
                      <td className="p-2 mt-3 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
                        <span
                          className="cursor-pointer px-2 sm:px-3.5 hover:bg-blue-500 hover:text-white"
                          onClick={() =>
                            product.count > 1 &&
                            updateCount(product.product._id, product.count - 1)
                          }
                        >
                          -
                        </span>
                        <span className="w-8 sm:w-10 text-center text-[#191919] text-sm sm:text-base font-normal">
                          {product.count}
                        </span>
                        <span
                          className="cursor-pointer px-2 sm:px-3 hover:bg-blue-500 hover:text-white"
                          onClick={() =>
                            updateCount(product.product._id, product.count + 1)
                          }
                        >
                          +
                        </span>
                      </td>
                      <td className="px-2 py-2 text-sm sm:text-base">
                        {product.count * product.price} EGP
                      </td>
                      <td className="px-2 py-2">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-red-500"
                          fill="none"
                          viewBox="0 0 24 25"
                          stroke="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => {
                            removeItem(product.product._id);
                          }}
                        >
                          <path
                            d="M16 8.5L8 16.5M16 16.5L8 8.5"
                            stroke="#666666"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              <tfoot>
                <tr className="border-t border-gray-400">
                  <td className="px-2 py-2 " colSpan="3">
                    <Link to="/">
                      <button className="px-6 py-3 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-xs sm:text-sm font-semibold leading-[16px] cursor-pointer">
                        Return to Shop
                      </button>
                    </Link>
                  </td>
                  <td className="px-2 py-2" colSpan="2">
                    <button
                      onClick={() => {
                        clearCart();
                        toast("Cart cleared successfully", {
                          icon: "🗑️",
                        });
                      }}
                      className="cursor-pointer px-6 py-3 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-xs sm:text-sm font-semibold leading-[16px]"
                    >
                      Clear Cart
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Right: Totals */}
          <div className="w-full lg:w-[424px] bg-white rounded-lg p-4 sm:p-6">
            <h2 className="text-[#191919] mb-2 text-lg sm:text-xl font-medium leading-[30px]">
              Cart Total
            </h2>

            <div className="py-3 flex justify-between items-center">
              <span className="text-[#4c4c4c] text-sm sm:text-base">
                Total:
              </span>
              <span className="text-[#191919] font-semibold">
                {items.reduce((sum, p) => sum + p.price * p.count, 0)} EGP
              </span>
            </div>
            <div className="py-3 border-t border-b border-[#e5e5e5] flex justify-between items-center">
              <span className="text-[#4c4c4c] text-xs sm:text-sm">
                Shipping:
              </span>
              <span className="text-[#191919] font-medium text-xs sm:text-sm">
                50 EGP
              </span>
            </div>
            <div className="py-3 border-t border-b border-[#e5e5e5] flex justify-between items-center">
              <span className="text-[#4c4c4c] text-xs sm:text-sm">
                Number Of Cart Items:
              </span>
              <span className="text-[#191919] font-medium text-xs sm:text-sm">
                {numOfCartItems}
              </span>
            </div>
            <div className="py-3 border-b border-[#e5e5e5] flex justify-between items-center">
              <span className="text-[#4c4c4c] text-xs sm:text-sm">
                Subtotal:
              </span>
              <span className="text-[#191919] font-medium text-xs sm:text-sm">
                {items.reduce((sum, p) => sum + p.price * p.count + 50, 0)} EGP
              </span>
            </div>
            {items.length === 0 ? (
              <button
                disabled
                title="Your cart is empty"
                className="w-full disabled:cursor-not-allowed text-white mt-5 px-6 sm:px-10 py-3 sm:py-4 bg-gray-400 rounded-[44px] text-sm sm:text-base font-semibold"
              >
                Proceed to Checkout
              </button>
            ) : (
              <Link to="/Checkout">
                <button className="w-full cursor-pointer text-white mt-5 px-6 sm:px-10 py-3 sm:py-4 bg-[#00b206] hover:bg-green-700 rounded-[44px] text-sm sm:text-base font-semibold">
                  Proceed to Checkout
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Coupon code */}
        <div className="mt-6 p-4 sm:p-5 max-w-[800px] bg-white rounded-lg border border-[#e6e6e6] flex flex-col sm:flex-row gap-4 sm:gap-6">
          <h3 className="text-[#191919] w-full sm:w-1/4 text-lg sm:text-xl font-medium leading-[30px]">
            Coupon Code
          </h3>
          <div className="flex w-full border border-[#e6e6e6] rounded-[46px] overflow-hidden flex-col sm:flex-row">
            <input
              placeholder="Enter code"
              type="text"
              className="w-full sm:w-2/3 px-4 sm:px-6 py-3 text-sm sm:text-base outline-none bg-white text-[#999999]"
            />
            <button className="px-6 sm:px-10 py-3 sm:py-4 bg-[#333333] text-white text-sm sm:text-base font-semibold rounded-3xl">
              Apply Coupon
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
