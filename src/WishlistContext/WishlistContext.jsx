import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  const token = localStorage.getItem("user-token");
  // ---------- Add Item to Wishlist ----------
  function addToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers: { token },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Added to wishlist");
        getWishlist(); // Refresh
        return res;
      })
      .catch((err) => {
        toast.error("Failed to add to wishlist");
        console.error(err);
        return err;
      });
  }

  // ---------- Fetch Wishlist ----------
  function getWishlist() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setWishlistItems(res.data.data);
        setWishlistCount(res.data.count);
      })
      .catch((err) => {
        console.error("Failed to fetch wishlist:", err);
      });
  }

  useEffect(() => {
    if (token) {
      getWishlist();
    }
  }, [token]);

  // ---------- Remove Item from Wishlist ----------
  function removeFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token },
      })
      .then((res) => {
        toast.success("Removed from wishlist", {
          icon: "🗑️",
        });

        getWishlist(); // Refresh
        return res;
      })
      .catch((err) => {
        toast.error("Failed to remove from wishlist");
        console.error(err);
        return err;
      });
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
