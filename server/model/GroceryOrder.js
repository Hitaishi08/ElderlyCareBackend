const mongoose = require("mongoose");

const GroceryOrderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true }, // Item name
      quantity: { type: Number, required: true, min: 1 } // Quantity of the item
    }
  ],
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Elderly user
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Family member or volunteer
  status: { type: String, enum: ["pending", "accepted", "delivered", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GroceryOrder", GroceryOrderSchema);
