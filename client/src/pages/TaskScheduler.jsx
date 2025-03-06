import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import axios from "axios";

const TaskScheduler = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    scheduledTime: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers(); // Fetch users for the "assignedTo" field
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          ...taskData,
          scheduledTime: new Date(taskData.scheduledTime),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task Scheduled!");
      fetchTasks();
    } catch (error) {
      toast.error("Task creation failed");
    }
  };

  const updateTaskStatus = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task marked as completed!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Task Scheduler</h2>

      <div className="flex gap-6">
        {/* Calendar Component */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <Calendar onChange={setDate} value={date} />
        </div>

        {/* Task Form */}
        <div className="p-6 bg-white shadow-lg rounded-lg w-96">
          <h3 className="text-lg font-semibold mb-3">Add a New Task</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Task Title"
              className="border p-2 rounded"
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-2 rounded"
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
            <select
              className="border p-2 rounded"
              onChange={(e) =>
                setTaskData({ ...taskData, assignedTo: e.target.value })
              }
              required
            >
              <option value="">Assign to User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              className="border p-2 rounded"
              onChange={(e) =>
                setTaskData({ ...taskData, scheduledTime: e.target.value })
              }
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Schedule Task
            </button>
          </form>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-6 w-3/4 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Upcoming Tasks</h3>
        {loading ? (
          <p className="text-blue-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks scheduled.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`p-3 rounded-md shadow-md mb-2 bg-gray-100 text-gray-700 flex justify-between items-center`}
              >
                <div>
                  <strong>{task.title}</strong> -{" "}
                  {new Date(task.scheduledTime).toLocaleString()} <br />
                  Assigned To:{" "}
                  <span className="text-blue-600">{task.assignedTo?.name || "N/A"}</span>{" "}
                  <br />
                  Status:{" "}
                  <span
                    className={`${
                      task.status === "pending" ? "text-yellow-500" : "text-green-600"
                    } font-semibold`}
                  >
                    {task.status}
                  </span>
                </div>
                {task.status === "pending" && (
                  <button
                    onClick={() => updateTaskStatus(task._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Mark as Completed
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskScheduler;
