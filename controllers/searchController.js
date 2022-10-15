const User = require("../models/userModal");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Company = require("../models/companyModal");
const AppError = require("../utils/appError");

exports.getCompanyList = catchAsync(async (req, res, next) => {
  const companies = await Company.find({}).select({ name: 1, _id: -1 });
  res.status(200).json({
    status: "success",
    message: "All companies in database retrieved.",
    data: companies,
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
