const express = require("express");
const router = express.Router();
const groceryOrderController = require("../controllers/groceryOrderController");
const authMiddleware = require("../middleware/authMiddleware");

// 📌 Protected Routes
router.post("/", authMiddleware, groceryOrderController.createOrder);
router.get("/", authMiddleware, groceryOrderController.getAllOrders);
router.get("/:id", authMiddleware, groceryOrderController.getOrderById);
router.put("/:id/accept", authMiddleware, groceryOrderController.acceptOrder);
router.put("/:id/status", authMiddleware, groceryOrderController.updateOrderStatus);
router.delete("/:id", authMiddleware, groceryOrderController.deleteOrder);

// 📌 Search Grocery Items from OpenFoodFacts API
router.get("/search/:query", authMiddleware, groceryOrderController.searchGroceryItem);

module.exports = router;
