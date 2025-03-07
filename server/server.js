const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./model/User")
const authenticateUser = require("./middleware/authMiddleware");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/api/users/me", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/medicines", require("./routes/medicineRoutes")); 
app.use("/api/groceries", require("./routes/groceryRoutes")); 

// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
