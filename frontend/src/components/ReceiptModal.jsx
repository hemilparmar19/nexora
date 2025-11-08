import React from "react";
import { Check } from "lucide-react";

const ReceiptModal = ({ receipt, closeReceipt }) => {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/10 backdrop-brightness-75">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-semibold">
              {receipt.orderId || receipt._id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Customer:</span>
            <span className="font-semibold">
              {receipt.customerName || receipt.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold">
              {receipt.customerEmail || receipt.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-semibold">
              {receipt.timestamp ||
                new Date(receipt.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold text-blue-600">
              ${receipt.total?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>

        <button
          onClick={closeReceipt}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
