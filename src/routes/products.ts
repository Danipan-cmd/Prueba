import { Router } from "express";
import { authenticate, authorize } from "../middlewares/authMiddlewares";
import { createProduct } from "../controllers/productController";
import { createOrder, getOrders } from "../controllers/orderController";

const router = Router();

router.post("/products", authenticate, authorize("ADMIN"), createProduct);
router.post("/orders", authenticate, authorize("CLIENT"), createOrder);
router.get("/orders", authenticate, getOrders);

export default router;
