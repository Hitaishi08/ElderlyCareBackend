const GroceryOrder = require("../model/GroceryOrder");
const axios = require("axios");

// OpenFoodFacts API Base URL (Replace with actual API if needed)
const OPENFOODFACTS_API_URL = "https://world.openfoodfacts.org/api/v2";

// 📌 Create a Grocery Order
exports.createOrder = async (req, res) => {
  try {
    const { items, requestedBy } = req.body;

    // Check if requestedBy is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(requestedBy)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "At least one item is required" });
    }

    const order = new GroceryOrder({ items, requestedBy });
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 📌 Get All Orders (Admin/Family Members)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await GroceryOrder.find()
      .populate("requestedBy", "name email")
      .populate("acceptedBy", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await GroceryOrder.findById(req.params.id)
      .populate("requestedBy", "name email")
      .populate("acceptedBy", "name email");

    if (!order) return res.status(404).json({ msg: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Accept an Order (Family Member or Volunteer)
exports.acceptOrder = async (req, res) => {
  try {
    const { acceptedBy } = req.body;
    const order = await GroceryOrder.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: "Order not found" });
    if (order.status !== "pending") return res.status(400).json({ msg: "Order already accepted or delivered" });

    order.acceptedBy = acceptedBy;
    order.status = "accepted";
    await order.save();

    res.status(200).json({ message: "Order accepted successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Update Order Status (Delivered or Cancelled)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await GroceryOrder.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: "Order not found" });

    if (!["delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status update" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Delete an Order
exports.deleteOrder = async (req, res) => {
  try {
    await GroceryOrder.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Search Grocery Item from OpenFoodFacts API
exports.searchGroceryItem = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await axios.get(`${OPENFOODFACTS_API_URL}/search?q=${query}`);

    if (response.data && response.data.products.length > 0) {
      res.status(200).json(response.data.products);
    } else {
      res.status(404).json({ message: "No matching grocery items found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grocery item data" });
  }
};
