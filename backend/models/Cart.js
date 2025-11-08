const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      default: "guest",
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total before saving
cartSchema.pre("save", async function (next) {
  const cart = this;
  let total = 0;

  for (const item of cart.items) {
    const product = await mongoose.model("Product").findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }

  cart.totalAmount = total;
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
