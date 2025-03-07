import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import axios from "axios";

const TaskScheduler = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    fetchUsers();
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
      toast.success("Task Scheduled!", { position: "top-center" });
      setTaskData({ title: "", description: "", assignedTo: "", scheduledTime: "" });
      fetchTasks();
    } catch (error) {
      toast.error("Task creation failed", { position: "top-center" });
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
      toast.success("Task completed!", { position: "top-center" });
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task", { position: "top-center" });
    }
  };

  const filteredTasks = tasks.filter((task) =>
    new Date(task.scheduledTime).toDateString() === date.toDateString()
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E6FFFA 0%, #EBF8FF 100%)" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

          * {
            font-family: 'Poppins', sans-serif;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          .app-container {
            display: flex;
            min-height: 100vh;
            position: relative;
          }

          .sidebar {
            width: ${isSidebarOpen ? "250px" : "70px"};
            background: linear-gradient(180deg, #2D3748 0%, #1A202C 100%);
            color: #EDF2F7;
            padding: 20px;
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            transition: width 0.3s ease;
            z-index: 100;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          }
          .sidebar-header {
            display: flex;
            align-items: center;
            justify-content: ${isSidebarOpen ? "space-between" : "center"};
            margin-bottom: 40px;
          }
          .sidebar-header h3 {
            font-size: 24px;
            font-weight: 700;
            color: #48BB78;
            display: ${isSidebarOpen ? "block" : "none"};
          }
          .hamburger {
            font-size: 24px;
            color: #EDF2F7;
            cursor: pointer;
            background: none;
            border: none;
            padding: 5px;
            transition: transform 0.3s ease;
          }
          .hamburger:hover {
            transform: scale(1.1);
          }

          .nav-list {
            list-style: none;
          }
          .nav-item {
            margin-bottom: 20px;
          }
          .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            color: #A0AEC0;
            text-decoration: none;
            font-size: 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .nav-link:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #48BB78;
          }
          .nav-link span {
            display: ${isSidebarOpen ? "inline" : "none"};
          }

          .main-content {
            flex-grow: 1;
            margin-left: ${isSidebarOpen ? "250px" : "70px"};
            padding: 40px;
            transition: margin-left 0.3s ease;
          }

          .header {
            text-align: center;
            padding: 20px 0;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            margin-bottom: 40px;
          }
          .header h1 {
            font-size: 36px;
            font-weight: 700;
            color: #2D3748;
            background: linear-gradient(90deg, #48BB78, #4299E1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .header p {
            font-size: 18px;
            color: #718096;
            margin-top: 8px;
          }

          .task-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 32px;
          }

          .section-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .section-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          }
          .section-card h3 {
            font-size: 24px;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .react-calendar {
            border: none !important;
            border-radius: 12px;
            background: #F7FAFC;
            padding: 10px;
          }
          .react-calendar__tile--now {
            background: #48BB78 !important;
            color: white !important;
            border-radius: 8px;
          }
          .react-calendar__tile--active {
            background: #4299E1 !important;
            color: white !important;
            border-radius: 8px;
          }

          .form-input, .form-textarea, .form-select {
            width: 100%;
            padding: 14px;
            margin-bottom: 16px;
            border: 2px solid #E2E8F0;
            border-radius: 10px;
            font-size: 16px;
            background: #F7FAFC;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .form-input:focus, .form-textarea:focus, .form-select:focus {
            outline: none;
            border-color: #48BB78;
            box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.3);
          }
          .form-textarea {
            min-height: 100px;
            resize: vertical;
          }
          .form-button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(90deg, #48BB78, #4299E1);
            color: white;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }
          .form-button:hover {
            transform: scale(1.02);
            opacity: 0.95;
          }

          .tasks-list {
            max-height: 500px;
            overflow-y: auto;
            padding-right: 8px;
          }
          .tasks-list::-webkit-scrollbar {
            width: 6px;
          }
          .tasks-list::-webkit-scrollbar-thumb {
            background: #A0AEC0;
            border-radius: 3px;
          }
          .task-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background: linear-gradient(135deg, #F0FFF4, #C6F6D5);
            border-radius: 12px;
            margin-bottom: 12px;
            transition: all 0.3s ease;
          }
          .task-item.completed {
            background: linear-gradient(135deg, #EDF2F7, #E2E8F0);
          }
          .task-item:hover {
            transform: translateX(5px);
          }
          .task-item div {
            flex: 1;
            margin-right: 16px;
          }
          .task-item strong {
            font-size: 18px;
            color: #2D3748;
          }
          .task-item p {
            margin: 4px 0;
            color: #718096;
            font-size: 14px;
          }
          .task-item .status-pending {
            color: #F6AD55;
            font-weight: 600;
          }
          .task-item .status-completed {
            color: #38A169;
            font-weight: 600;
          }
          .task-item button {
            padding: 8px 16px;
            background: #38A169;
            color: white;
            font-size: 14px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.2s ease;
          }
          .task-item button:hover {
            background: #2F855A;
            transform: scale(1.05);
          }

          .loading {
            color: #48BB78;
            font-size: 16px;
            animation: pulse 1.5s infinite;
          }
          .error {
            color: #E53E3E;
            font-size: 16px;
          }
          .empty {
            color: #A0AEC0;
            font-size: 16px;
            font-style: italic;
          }

          .footer {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
            margin-top: 60px;
            padding: 40px 20px;
            background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%);
            color: #EDF2F7;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
          }
          .footer-container {
            max-width: 1280px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
          }
          .footer-section h4 {
            font-size: 20px;
            font-weight: 600;
            color: #48BB78;
            margin-bottom: 20px;
          }
          .footer-section p, .footer-section a {
            font-size: 14px;
            color: #A0AEC0;
            margin: 8px 0;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .footer-section a:hover {
            color: #4299E1;
          }
          .footer-bottom {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          .footer-bottom p {
            font-size: 14px;
            color: #718096;
            margin: 0;
          }
          .footer-bottom a {
            color: #48BB78;
            font-weight: 600;
          }
          .footer-bottom a:hover {
            color: #4299E1;
          }

          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }

          @media (max-width: 768px) {
            .sidebar {
              width: ${isSidebarOpen ? "200px" : "60px"};
            }
            .main-content {
              margin-left: ${isSidebarOpen ? "200px" : "60px"};
            }
            .task-container {
              grid-template-columns: 1fr;
            }
            .footer-container {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            {isSidebarOpen && <h3>Task Scheduler</h3>}
            <button className="hamburger" onClick={toggleSidebar}>
              {isSidebarOpen ? "✖" : "☰"}
            </button>
          </div>
          <ul className="nav-list">
          <li className="nav-item">
              <a href="/dashboard" className="nav-link">
                <span style={{ color: "#48BB78", fontSize: "20px" }}></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/tasks" className="nav-link">
                <span style={{ color: "#48BB78", fontSize: "20px" }}>📅</span>
                <span>Task Scheduling</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/medicines" className="nav-link">
                <span style={{ color: "#4299E1", fontSize: "20px" }}>💊</span>
                <span>Medicines</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/groceries" className="nav-link">
                <span style={{ color: "#F6AD55", fontSize: "20px" }}>🛒</span>
                <span>Groceries</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="header">
            <h1>Elderly Care Scheduler</h1>
            <p>Plan and manage care tasks with love and precision</p>
          </header>

          <div className="task-container">
            {/* Calendar */}
            <div className="section-card">
              <h3>
                <span style={{ color: "#48BB78" }}>📅</span> Pick a Date
              </h3>
              <Calendar onChange={setDate} value={date} />
            </div>

            {/* Task Form */}
            <div className="section-card">
              <h3>
                <span style={{ color: "#4299E1" }}>✨</span> Add a Task
              </h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Task Title (e.g., Medication)"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  className="form-input"
                  required
                />
                <textarea
                  placeholder="Description (e.g., Take 2 pills)"
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  className="form-textarea"
                />
                <select
                  value={taskData.assignedTo}
                  onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                  className="form-select"
                  required
                >
                  <option value="">Assign to Caregiver</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <input
                  type="datetime-local"
                  value={taskData.scheduledTime}
                  onChange={(e) => setTaskData({ ...taskData, scheduledTime: e.target.value })}
                  className="form-input"
                  required
                />
                <button type="submit" className="form-button">
                  Schedule Now
                </button>
              </form>
            </div>

            {/* Task List */}
            <div className="section-card">
              <h3>
                <span style={{ color: "#38A169" }}>✅</span> Tasks for {date.toDateString()}
              </h3>
              <div className="tasks-list">
                {loading ? (
                  <p className="loading">Loading tasks...</p>
                ) : error ? (
                  <p className="error">{error}</p>
                ) : filteredTasks.length === 0 ? (
                  <p className="empty">No tasks scheduled yet.</p>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task._id}
                      className={`task-item ${task.status === "completed" ? "completed" : ""}`}
                    >
                      <div>
                        <strong>{task.title}</strong>
                        <p>{task.description || "No description"}</p>
                        <p>Time: {new Date(task.scheduledTime).toLocaleTimeString()}</p>
                        <p>
                          Assigned: <span style={{ color: "#4299E1" }}>{task.assignedTo?.name || "N/A"}</span>
                        </p>
                        <span className={`status-${task.status}`}>{task.status}</span>
                      </div>
                      {task.status === "pending" && (
                        <button onClick={() => updateTaskStatus(task._id)}>Done</button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              Elderly Care Scheduler simplifies caregiving with intuitive tools for task management, built with care and precision.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <p><a href="/dashboard">Dashboard</a></p>
            <p><a href="/tasks">Tasks</a></p>
            <p><a href="/medicines">Medicines</a></p>
            <p><a href="/groceries">Groceries</a></p>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:support@careapp.com">support@careapp.com</a></p>
            <p>Phone: +1 (800) 123-4567</p>
            <p>Address: 123 Care Lane, Wellness City, CA 90210</p>
          </div>
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <p>Subscribe for caregiving tips and updates!</p>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ width: "100%", padding: "12px", marginTop: "10px", borderRadius: "8px", border: "none", background: "#4A5568", color: "#EDF2F7" }}
            />
            <button
              style={{
                width: "100%", padding: "12px", marginTop: "10px", background: "#48BB78", color: "#FFFFFF",
                border: "none", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#4299E1")}
              onMouseOut={(e) => (e.target.style.background = "#48BB78")}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Elderly Care Scheduler. All rights reserved. 
            Made with ❤️ by <a href="mailto:support@careapp.com">CareApp Team</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TaskScheduler;