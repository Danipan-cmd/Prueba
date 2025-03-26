const { authenticate, authorize } = require("../middlewares/authmiddlewares");
const { createProduct } = require("../controllers/productController");
const { createOrder, getOrders } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();
router.post("/products", authenticate, authorize("ADMIN"), createProduct);
router.post("/orders", authenticate, authorize("CLIENT"), createOrder);
router.get("/orders", authenticate, getOrders);