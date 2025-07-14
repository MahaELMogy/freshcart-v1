import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Start with a more descriptive initial value
export const CartContext = createContext(null);

export default function CartContextProvider(props) {
  const [userName, setUserName] = useState("");
  const [numOfCartItems, setNumOfCartItems] = useState(0); // ✅ new state
  const [UserIdCart, setUserIdCart] = useState("");
  const [items, setItems] = useState([]);
  // --------------------- TOKEN ---------------------------
  let token = localStorage.getItem("user-token");
  // ------------ fun Add Item --------------------

  function addItem(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("user-token"),
          },
        }
      )
      .then((res) => {
        console.log("message from context", res.data);
        console.log("numOfCartItems", res.data.numOfCartItems);
        toast.success(res.data.message);
        setNumOfCartItems(res.data.numOfCartItems);
        getCartItems();

        return res;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  // ------------ fun to get cart Items --------------------

  function getCartItems() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("user-token"),
        },
      })
      .then((res) => {
        setUserIdCart(res.data.cartId);
        console.log(res.data.cartId);

        setItems(res.data.data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch cart:", err);
      });
  }
  useEffect(() => {
    if (token) {
      getCartItems();
    }
  }, [token]);

  // ---------------------- update Count --------------------
  async function updateCount(productId, newCount) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        {
          headers: {
            token: localStorage.getItem("user-token"),
          },
        }
      );
      setItems(res.data.data.products);
      setNumOfCartItems(res?.data?.numOfCartItems); // Update the state with the new cart data
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  }
  // ------------------------- remove Item --------------------
  function removeItem(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: localStorage.getItem("user-token"),
        },
      })
      .then((res) => {
        let response = res;
        console.log(response.data.numOfCartItems);

        // setItems(res.data.data.products); // Update cart state
        if (response.data.status === "success") {
          toast("Item Was Deleted", {
            icon: "🗑️",
          });
          console.log(response);
        } else {
          toast.error(response.data.message);
        }
        setItems(res.data.data.products);

        setNumOfCartItems(response?.data?.numOfCartItems);
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  }
  // ---------------------------------------------------------------------------
  // ✅ Clear the entire cart
  const clearCart = () => {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      })
      .then(() => {
        setItems([]); // update UI to empty
        setNumOfCartItems(0); // Update the state with the new cart data
      })
      .catch(() => {
        toast.error("Failed to clear cart");
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // ------------------------------------------------

  return (
    <CartContext.Provider
      value={{
        userName,
        setUserName,
        addItem,
        getCartItems,
        items,
        updateCount,
        removeItem,
        numOfCartItems,
        clearCart,
        UserIdCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
