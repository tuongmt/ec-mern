const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount products"],
    },
    orderTotal: {
      type: Number,
      requried: [true, "Please provide total price"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    cartItems: {
      type: Array,
      required: [true, "Please provide cart items"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
