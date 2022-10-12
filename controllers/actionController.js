// const mongoose = require("mongoose");
// const Cocktail = require("../models/cocktailModel");
// const Comment = require("../models/commentModel");
// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

// exports.addFavs = catchAsync(async (req, res, next) => {
//   //  console.log(req.body, req.user, req.params);
//   await Cocktail.findByIdAndUpdate(req.params.id, {
//     $inc: { timesfavorite: 1 },
//     $addToSet: { favorites: req.user._id },
//   });
//   next();
//   // res.status(200).json({
//   //   status: "success",
//   //   message: "Added to favorites successfully",
//   // });
// });
// exports.removeFavs = catchAsync(async (req, res, next) => {
//   // console.log("reemovv", req.body, req.user, req.params);
//   await Cocktail.findByIdAndUpdate(req.params.id, {
//     $inc: { timesfavorite: -1 },
//     $pull: { favorites: req.user._id },
//   });
//   next();
//   // res.status(200).json({
//   //   status: "success",
//   //   message: "Removed from favorites successfully",
//   // });
// });
// exports.addComment = catchAsync(async (req, res, next) => {
//   console.log(req.body, req.params);
//   const newComment = await Comment.create({
//     commentText: req.body.data,
//     createDate: req.body.createDate,
//     cocktailId: req.params.id,
//     userId: req.user._id,
//     username: req.user.username,
//     userPhoto: req.user.photo,
//   });
//   req.comment = newComment;
//   await Cocktail.findByIdAndUpdate(req.params.id, {
//     $inc: { timescommented: 1 },
//     $addToSet: { comments: req.comment._id },
//   });
//   next();
// });
// exports.removeComment = catchAsync(async (req, res, next) => {
//   // console.log("reemovv", req.body, req.user, req.params);
//   await Cocktail.findByIdAndUpdate(req.params.id, {
//     $inc: { timescommented: -1 },
//     $pull: { comments: req.comment._id },
//   });
//   next();
// });
