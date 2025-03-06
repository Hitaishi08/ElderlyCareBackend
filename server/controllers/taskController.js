const Task = require("../model/Task");
const User = require("../model/User");
const cron = require("node-cron");
const webpush = require("web-push");

// Register Web Push (Replace with your VAPID keys)
webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Schedule Notifications with node-cron
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const tasks = await Task.find({ scheduledTime: { $lte: now }, status: "pending" }).populate("assignedTo");

    tasks.forEach(async (task) => {
      console.log(`Sending reminder for task: ${task.title}`);

      // Here, you would send a notification (Push Notification, Email, or SMS)
      // Simulating a web push notification
      const payload = JSON.stringify({ title: "Task Reminder", body: `Reminder for: ${task.title}` });

      // Assuming users have a stored subscription object (in a real app)
      // webpush.sendNotification(user.subscription, payload).catch(err => console.error(err));

      // Optionally mark as "Notified" or "In Progress"
      await Task.findByIdAndUpdate(task._id, { status: "pending" });
    });

  } catch (error) {
    console.error("Error in task scheduler:", error);
  }
});

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, scheduledTime } = req.body;
    
    const task = new Task({ title, description, assignedTo, scheduledTime });
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    if(!tasks)res.status(404).json("not found tasks");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo", "name email");
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
