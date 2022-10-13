const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  amountUnit: {
    type: String,
    default: "pieces",
  },
  description: {
    type: String,
    default: "Ut tellus elementum sagittis vitae et leo duis.",
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  company: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
