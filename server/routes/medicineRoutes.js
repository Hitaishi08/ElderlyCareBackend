const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");
const authMiddleware = require("../middleware/authMiddleware");

// 📌 Protected Routes
router.post("/", authMiddleware, medicineController.createMedicine);
router.get("/", authMiddleware, medicineController.getAllMedicines);
router.get("/:id", authMiddleware, medicineController.getMedicineById);
router.put("/:id", authMiddleware, medicineController.updateMedicine);
router.delete("/:id", authMiddleware, medicineController.deleteMedicine);

// 📌 Fetch Medicine Info from Open API
router.get("/search/:name", authMiddleware, medicineController.getMedicineInfo);

module.exports = router;
