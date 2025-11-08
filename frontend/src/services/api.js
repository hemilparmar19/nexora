// frontend/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products API
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Cart API
export const getCart = async (userId = "guest") => {
  try {
    const response = await api.get(`/cart?userId=${userId}`);
    const cartData = response.data?.data;

    const items =
      cartData?.items?.map((item) => ({
        _id: item._id,
        productId: item.productId?._id,
        name: item.productId?.name,
        price: item.productId?.price,
        image: item.productId?.image,
        quantity: item.quantity,
      })) || [];

    return {
      items,
      totalAmount: cartData?.totalAmount || 0,
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};


export const addToCart = async (productId, quantity = 1, userId = "guest") => {
  try {
    const response = await api.post("/cart", {
      productId,
      quantity,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateCartItem = async (itemId, quantity, userId = "guest") => {
  try {
    const response = await api.put(`/cart/${itemId}`, {
      quantity,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const removeFromCart = async (itemId, userId = "guest") => {
  try {
    const response = await api.delete(`/cart/${itemId}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const clearCart = async (userId = "guest") => {
  try {
    const response = await api.delete(`/cart?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Checkout API
export const checkout = async (checkoutData) => {
  try {
    const response = await api.post("/checkout", checkoutData);
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await api.get(`/checkout/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export default api;
