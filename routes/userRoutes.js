const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);

module.exports = router;
