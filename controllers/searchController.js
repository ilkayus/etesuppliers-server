const User = require("../models/userModal");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Company = require("../models/companyModal");
const Product = require("../models/productModal");
const AppError = require("../utils/appError");
const ActivityLog = require("../models/activityLogModal");

exports.getCompanyList = catchAsync(async (req, res, next) => {
  const companies = await Company.find({}).select({ name: 1, _id: -1 });
  res.status(200).json({
    status: "success",
    message: "Company list retrieved.",
    data: companies,
  });
});

exports.getSearchBarList = catchAsync(async (req, res, next) => {
  const companies = await Company.find({}).select({ name: 1, _id: -1 });
  const products = await Product.find({}).select({ name: 1, _id: -1 });
  res.status(200).json({
    status: "success",
    message: "List for search bar retrieved.",
    companyList: companies,
    productList: products,
  });
});

exports.getHomePageLogs = catchAsync(async (req, res, next) => {
  const query = {
    $sort: { _id: -1 },
  };
  const companies = await Company.find(query);
  const products = await Product.find(query);
  const logs = await ActivityLog.find(query);
  const sysLogs = logs.slice(0, -10).map((el) => el.activity);
  const compLogs = companies
    .slice(-5)
    .map((company) => `${company.name} added by ${company.owner.username}`);
  const prodLogs = products
    .slice(-5)
    .map(
      (product) =>
        `${product.name} added to ${product.company.name} by ${product.owner.username}`
    );
  res.status(200).json({
    status: "success",
    message: "List for search bar retrieved.",
    companyLogs: compLogs,
    productLogs: prodLogs,
    systemLogs: sysLogs,
  });
});

// exports.getLastCompanies = catchAsync(async (req, res, next) => {
//   const query = [
//     {
//       $sort: { _id: -1 },
//     },
//     {
//       $limit: 3,
//     },
//   ];
//   const companies = await Company.aggregate(query);
//   res.status(200).json({
//     status: "success",
//     message: "All companies in database retrieved.",
//     data: companies,
//   });
// });
