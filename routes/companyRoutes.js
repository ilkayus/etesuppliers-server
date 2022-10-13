const express = require("express");
const authController = require("../controllers/authController");
const companyController = require("../controllers/companyController");

const router = express.Router();

// router.get("/get", authController.protect, companyController.createCompany);
router.post("/new", authController.protect, companyController.createCompany);
// router.delete("/remove", authController.protect);
// router.pacth("/update", authController.protect);

module.exports = router;
