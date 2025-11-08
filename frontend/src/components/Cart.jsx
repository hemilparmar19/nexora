import React from "react";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";

const Cart = ({
  cart,
  cartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
  closeCart,
  proceedToCheckout,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Blur Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-white/10 backdrop-brightness-75"
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col rounded-l-2xl">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name || "Product image"}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.name || "Unnamed Product"}
                    </h3>
                    <p className="text-blue-600 font-bold">
                      ${item.price?.toFixed(2) || "0.00"}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="p-1 bg-white border rounded hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="px-3 py-1 bg-white border rounded">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="p-1 bg-white border rounded hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-auto p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Clear Cart
              </button>
              <button
                onClick={proceedToCheckout}
                className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
