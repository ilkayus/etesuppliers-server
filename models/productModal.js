const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "https://dummyimage.com/256x256/cccccc/000.png",
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
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "owner",
    select: "username",
  }).populate({
    path: "company",
    select: "name",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
