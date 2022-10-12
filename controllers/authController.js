const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const dotenv = require("dotenv");
const sendEmail = require("../utils/email");

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    photo: req.body.photo,
  });
  createSendToken(newUser, 201, res);
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  user.password = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    _id: user._id,
    email: user.email,
    username: user.username,
    photo: user.photo,
  });
};

exports.signInWithGoogleOAuth = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) signUp(req, res, next);
  else signIn(req, res, next);
});

const signIn = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = signToken(user._id);
  // response
  res.status(200).json({
    status: "success",
    token,
    _id: user._id,
    email: user.email,
    username: user.username,
    photo: user.photo,
  });
});

exports.hasUser = catchAsync(async (req, res, next) => {
  console.log(req.body, req.params);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    req.user = currentUser;
  } else req.user = undefined;
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1- Getting token and check if it's exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  // 2- Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3- Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User is no longer exists", 401));
  }
  // 4- Chec k if user changed password after the JWT tooken was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.!", 401)
    );
  }
  // Grant access to protected route.
  req.user = currentUser;
  next();
});

exports.googleOAuth = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    clientId: process.env.OauthClientID,
  });
});

exports.signUp = signUp;
exports.signIn = signIn;
