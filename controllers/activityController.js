const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const ActivityLog = require("../models/activityLogModal");
const Company = require("../models/companyModal");
const Product = require("../models/productModal");
const AppError = require("../utils/appError");

exports.createLog = catchAsync(async (req, res, next) => {
  let activity = "";
  const objId = mongoose.Types.ObjectId(req.params.id);
  const product = await Product.findById(objId);
  if (product) {
    activity = `${req.user.username} ${
      req.method === "DELETE" ? "deleted" : "updated"
    } product:${product.name}`;
  } else {
    const company = await Company.findById(objId);
    activity = `${req.user.username} ${
      req.method === "DELETE" ? "deleted" : "updated"
    } company:${company.name}`;
  }
  await ActivityLog.create({
    activity: activity,
    createdAt: req.body.createdAt,
  });
  next();
});

exports.createLogNew = catchAsync(async (req, res, next) => {
  let activity = "";
  if (req.body.hasOwnProperty("legalNumber")) {
    activity = `${req.user.username} created new company:${req.body.name}`;
  } else {
    activity = `${req.user.username} created new product:${req.body.name}`;
  }
  await ActivityLog.create({
    activity: activity,
    createdAt: req.body.createdAt,
  });
  next();
});

/*
---------------: Ilkay-Devecioglu {
  name: 'asdaasdasas',
  category: 'asd',
  amount: '22',
  amountUnit: 'gg',
  company: '634b46049f7a340070273837',
  description: 'asdasd',
  createdAt: '2022-10-15T23:59:21.006Z'
} :---------------
*/
