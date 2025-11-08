import React from "react";

const ProductCard = ({ product, onAddToCart, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          ${product.price}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
