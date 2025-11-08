import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import ReceiptModal from "./components/ReceiptModal";
import {
  getProducts,
  getCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
  checkout as apiCheckout,
} from "./services/api";
import { X } from "lucide-react";

const App = () => {
  const [userId] = useState("guest"); // Replace with real auth user later
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkoutForm, setCheckoutForm] = useState({ name: "", email: "" });

  // Fetch products and cart
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data); // if backend returns {data: [products]} leave as-is

        const cartData = await getCart(userId);
        setCart(cartData.items);
        setCartTotal(cartData.totalAmount);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again later.");
      }
    };
    loadInitialData();
  }, [userId]);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  };

  const refreshCart = async () => {
    try {
      const cartData = await getCart(userId);
      setCart(cartData.items);
      calculateTotal(cartData.items);
    } catch (err) {
      console.error(err);
      setError("Failed to refresh cart.");
    }
  };


  const addToCart = async (product) => {
    setLoading(true);
    try {
      await apiAddToCart(product._id, 1, userId);
      await refreshCart();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add item to cart.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await apiRemoveFromCart(itemId, userId);
      await refreshCart();
    } catch (err) {
      console.error(err);
      setError("Failed to remove item.");
    }
  };

  const updateQuantity = async (itemId, delta) => {
    try {
      const item = cart.find((i) => i._id === itemId);
      if (!item) return;
      const newQty = Math.max(1, item.quantity + delta);
      await apiUpdateCartItem(itemId, newQty, userId);
      await refreshCart();
    } catch (err) {
      console.error(err);
      setError("Failed to update quantity.");
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart(userId);
      await refreshCart();
    } catch (err) {
      setError("Failed to clear cart.", err);
    }
  };

  const handleCheckout = async () => {
    if (!checkoutForm.name || !checkoutForm.email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customerName: checkoutForm.name, 
        customerEmail: checkoutForm.email, 
        userId, 
      };

      const response = await apiCheckout(orderData);
      setReceipt(response.data); 
      setShowReceipt(true);
      setShowCheckout(false);

      await apiClearCart(userId);
      setCart([]);
      setCartTotal(0);
      setCheckoutForm({ name: "", email: "" });
      setError("");
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };




  if (!products.length) {
    return (
      <p className="text-center mt-10 text-gray-500">No products found.</p>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.length}
        toggleCart={() => setShowCart(!showCart)}
      />

      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
              loading={loading}
            />
          ))}
        </div>
      </main>

      {/* Cart */}
      {showCart && (
        <Cart
          cart={cart}
          cartTotal={cartTotal}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          closeCart={() => setShowCart(false)}
          proceedToCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {/* Checkout */}
      {showCheckout && (
        <CheckoutModal
          checkoutForm={checkoutForm}
          setCheckoutForm={setCheckoutForm}
          cartTotal={cartTotal}
          handleCheckout={handleCheckout}
          closeCheckout={() => setShowCheckout(false)}
          loading={loading}
        />
      )}

      {/* Receipt */}
      {showReceipt && (
        <ReceiptModal
          receipt={receipt}
          closeReceipt={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default App;
