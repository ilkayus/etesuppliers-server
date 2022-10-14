const express = require("express");
const authController = require("../controllers/authController");
const companyController = require("../controllers/companyController");

const router = express.Router();

router.get(
  "/getone/:id",
  authController.protect,
  companyController.getOneCompany
);
router.get(
  "/getall",
  authController.protect,
  companyController.getAllCompanies
);
router.get(
  "/getlast",
  authController.protect,
  companyController.getLastCompanies
);
router.post("/new", authController.protect, companyController.createCompany);
router.delete(
  "/remove/:id",
  authController.protect,
  companyController.deleteCompany
);
router.patch(
  "/update/:id",
  authController.protect,
  companyController.updateCompany
);

module.exports = router;
