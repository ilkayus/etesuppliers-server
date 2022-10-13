const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");
const Company = require("../models/companyModal");
const AppError = require("../utils/appError");

exports.createCompany = catchAsync(async (req, res, next) => {
  console.log(req.body, req.user);
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
  res.status(200).json({
    status: "success",
    message: "New company added successfully",
    data: newCompany,
  });
});
