import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create context with default values to prevent null context
export const StoreContext = createContext({
  drug_list: [],
  setDrugList: () => {},
  cartItems: {},
  setCartItems: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalCartAmount: () => 0,
  url: "http://localhost:5000",
  token: "",
  setToken: () => {},
});

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");
  const [drug_list, setDrugList] = useState([]);

  const addToCart = async (itemId) => {
    console.log("StoreContext: Adding to cart:", itemId);
    
    // Update local state immediately
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (!newCartItems[itemId]) {
        newCartItems[itemId] = 1;
      } else {
        newCartItems[itemId] += 1;
      }
      console.log("Updated cart items:", newCartItems);
      return newCartItems;
    });
    
    // Then update server if token exists
    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        if(response.data.success){
          toast.success("Item Added to Cart");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    console.log("StoreContext: Removing from cart:", itemId);
    
    // Update local state immediately
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 0) {
        newCartItems[itemId] -= 1;
      }
      console.log("Updated cart items:", newCartItems);
      return newCartItems;
    });
    
    // Then update server if token exists
    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
        if(response.data.success){
          toast.success("Item Removed from Cart");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Failed to remove item from cart");
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = drug_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchDrugList = async () => {
    try {
      const response = await axios.get(url + "/api/drug/list");
      if (response.data.success) {
        setDrugList(response.data.data);
      } else {
        console.error("Failed to fetch drugs:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching drug list:", error);
    }
  };

  const loadCardData = async () => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.cartData) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchDrugList();
    }
    loadData();
  }, []);

  
  const contextValue = {
    drug_list,
    setDrugList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
