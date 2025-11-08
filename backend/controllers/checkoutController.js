const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @desc    Process checkout
// @route   POST /api/checkout
// @access  Public
exports.checkout = async (req, res, next) => {
  try {
    const { customerName, customerEmail, userId = "guest" } = req.body;

    // Validate input
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }

    // Get cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Create order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    // Create order
    const order = await Order.create({
      orderId,
      customerName,
      customerEmail,
      items: orderItems,
      totalAmount: cart.totalAmount,
      status: "confirmed",
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Mock receipt
    const receipt = {
      orderId: order.orderId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items,
      total: order.totalAmount,
      timestamp: order.createdAt,
      status: order.status,
    };

    res.status(201).json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/checkout/order/:orderId
// @access  Public
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
