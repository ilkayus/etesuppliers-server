const express = require("express");
const authController = require("../controllers/authController");
const activityController = require("../controllers/activityController");
const productController = require("../controllers/productController");

const router = express.Router();

router.get(
  "/getone/:id",
  authController.protect,
  productController.getOneProduct
);
router.get("/getall", authController.protect, productController.getAllProducts);
router.get(
  "/getlast",
  authController.protect,
  productController.getLastProducts
);
router.post(
  "/new",
  authController.protect,
  activityController.createLogNew,
  productController.createProduct
);
router.delete(
  "/remove/:id",
  authController.protect,
  activityController.createLog,
  productController.deleteProduct
);
router.patch(
  "/update/:id",
  authController.protect,
  activityController.createLog,
  productController.updateProduct
);

module.exports = router;
