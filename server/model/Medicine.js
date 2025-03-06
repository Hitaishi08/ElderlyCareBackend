const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true }, // e.g., "500mg"
  frequency: { type: String, required: true }, // e.g., "Twice a day"
  prescribedBy: { type: String }, // Doctor's name
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  timesPerDay: [{ type: String, required: true }], // e.g., ["08:00 AM", "08:00 PM"]
  status: { type: String, enum: ["ongoing", "missed", "completed"], default: "ongoing" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Medicine", MedicineSchema);
