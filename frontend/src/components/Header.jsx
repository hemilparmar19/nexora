import React from "react";
import { ShoppingCart } from "lucide-react";

const Header = ({ cartCount, toggleCart }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vibe Commerce</h1>
        <button
          onClick={toggleCart}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
