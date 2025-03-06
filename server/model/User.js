const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["elderly", "family", "volunteer"], required: true },
  phone: { type: String },
  address: { type: String },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
