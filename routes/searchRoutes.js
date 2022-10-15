const express = require("express");
const authController = require("../controllers/authController");
const searchController = require("../controllers/searchController");

const router = express.Router();

// router.get(
//   "/getone/:id",
//   authController.protect,
//   searchController.getOneCompany
// );
router.get(
  "/companylist",
  authController.protect,
  searchController.getCompanyList
);

module.exports = router;
