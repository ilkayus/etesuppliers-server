const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  legalNumber: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
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

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
