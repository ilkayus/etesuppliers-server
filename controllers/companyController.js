const User = require("../models/userModal");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Company = require("../models/companyModal");
const Product = require("../models/productModal");
const AppError = require("../utils/appError");

exports.createCompany = catchAsync(async (req, res, next) => {
  //console.log(req.body, req.user);
  const newCompany = await Company.create({
    name: req.body.name,
    legalNumber: req.body.legalNumber,
    photo: req.body.photo,
    incorporationCountry: req.body.incorporationCountry,
    website: req.body.website,
    description: req.body.description,
    owner: req.user._id,
    createdAt: req.body.createdAt,
  });
  res.status(201).json({
    status: "success",
    message: "New company added successfully",
    data: newCompany,
  });
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const companyId = mongoose.Types.ObjectId(req.params.id);
  const company = await Company.findByIdAndDelete(companyId);
  await Product.deleteMany({ company: companyId });

  if (!company)
    return next(new AppError("No document found with that ID", 404));

  res.status(204).json({
    status: "success",
    message: "Company deleted successfully",
    data: null,
  });
});

exports.updateCompany = catchAsync(async (req, res, next) => {
  // console.log(req.params.body);
  const companyId = mongoose.Types.ObjectId(req.params.id);
  const company = await Company.findByIdAndUpdate(companyId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!company)
    return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    message: "Company updated successfully",
    data: company,
  });
});

exports.getOneCompany = catchAsync(async (req, res, next) => {
  const companyId = mongoose.Types.ObjectId(req.params.id);
  const company = await Company.findById(companyId);
  res.status(200).json({
    status: "success",
    message: "Requested company data.",
    data: company,
  });
});

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  const companies = await Company.find();
  res.status(200).json({
    status: "success",
    message: "All companies in database retrieved.",
    data: companies,
  });
});

exports.getLastCompanies = catchAsync(async (req, res, next) => {
  const query = [
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 3,
    },
  ];
  const companies = await Company.aggregate(query);
  res.status(200).json({
    status: "success",
    message: "All companies in database retrieved.",
    data: companies,
  });
});
