import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const url = "https://food-del-backend-bter.onrender.com";

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (err) {
      console.error("Fetch food list error:", err);
    }
  };

  // Load cart data from backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error("Load cart error:", err);
    }
  };

  // Add to cart
  const addToCart = async (itemId) => {
    try {
      // Optimistic UI update
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

      if (token) {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData || {});
        }
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => {
        const currentQty = prev[itemId] || 0;
        if (currentQty <= 1) {
          const newCart = { ...prev };
          delete newCart[itemId];
          return newCart;
        } else {
          return { ...prev, [itemId]: currentQty - 1 };
        }
      });

      if (token) {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData || {});
        }
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  // Total amount calculation
  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((f) => f._id === item);
        if (itemInfo) total += itemInfo.price * cartItems[item];
      }
    }
    return total;
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;





