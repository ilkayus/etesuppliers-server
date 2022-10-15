const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  legalNumber: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    default: "https://dummyimage.com/256x256/cccccc/000.png",
  },
  incorporationCountry: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus elementum. Ornare suspendisse sed nisi lacus.",
  },
  fields: [
    {
      type: String,
    },
  ],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

companySchema.pre(/^find/, function (next) {
  this.populate({
    path: "owner",
    select: "username",
  });
  next();
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
