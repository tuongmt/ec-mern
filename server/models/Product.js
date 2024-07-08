const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    images: {
      type: Array,
      required: [true, "Must provide image"],
    },
    name: {
      type: String,
      required: [true, "Must provide name"],
    },
    price: {
      type: Number,
      required: [true, "Must provide price"],
    },
    totalAmount: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: {
        values: ["foods", "beverages", "confectionery"],
        message: "{VALUE} is not supported",
      },
    },
    quality: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
