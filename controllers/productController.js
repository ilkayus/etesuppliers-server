const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Company = require("../models/companyModal");
const Product = require("../models/productModal");
const AppError = require("../utils/appError");

exports.createProduct = catchAsync(async (req, res, next) => {
  console.log(req.body, req.user);
  const newProduct = await Product.create({
    ...req.body,
    owner: req.user._id,
  });
  res.status(201).json({
    status: "success",
    message: "New Product added successfully",
    data: newProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const productId = mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findByIdAndDelete(productId);

  if (!product)
    return next(new AppError("No document found with that ID", 404));

  res.status(204).json({
    status: "success",
    message: "Product deleted successfully",
    data: null,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  console.log(req.params.body);
  const productId = mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: product,
  });
});

exports.getOneProduct = catchAsync(async (req, res, next) => {
  const productId = mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findById(productId);
  res.status(200).json({
    status: "success",
    message: "Requested Product data.",
    data: product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    message: "All Products in database retrieved.",
    data: products,
  });
});

exports.getLastProducts = catchAsync(async (req, res, next) => {
  const query = [
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 3,
    },
  ];
  const products = await Product.aggregate(query);
  res.status(200).json({
    status: "success",
    message: "All Products in database retrieved.",
    data: products,
  });
});
