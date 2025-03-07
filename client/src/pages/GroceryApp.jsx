import { useState } from "react";
import GroceryOrderForm from "./GroceryOrderForm";
import GroceryOrderList from "./GroceryOrderList";

const GroceryApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const fetchOrders = () => setReload(!reload);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #FFF7E6 0%, #EBF8FF 100%)" }}>
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
            color: #F6AD55;
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
            color: #F6AD55;
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
            background: linear-gradient(90deg, #F6AD55, #4299E1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .header p {
            font-size: 18px;
            color: #718096;
            margin-top: 8px;
          }

          .grocery-container {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 32px;
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
            color: #F6AD55;
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
            color: #F6AD55;
            font-weight: 600;
          }
          .footer-bottom a:hover {
            color: #4299E1;
          }

          @media (max-width: 768px) {
            .sidebar {
              width: ${isSidebarOpen ? "200px" : "60px"};
            }
            .main-content {
              margin-left: ${isSidebarOpen ? "200px" : "60px"};
            }
            .grocery-container {
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
            {isSidebarOpen && <h3>Grocery App</h3>}
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
              <a href="/task" className="nav-link">
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
            <h1>Grocery & Essentials Ordering</h1>
            <p>Plan and manage your shopping with ease</p>
          </header>

          <div className="grocery-container">
            <GroceryOrderForm fetchOrders={fetchOrders} />
            <GroceryOrderList key={reload} />
          </div>
        </div>
      </div>

      {/* Full-Width Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              Simplifying grocery ordering for elderly care, ensuring essentials are always stocked.
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
            <p>Get shopping tips and updates delivered to you!</p>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ width: "100%", padding: "12px", marginTop: "10px", borderRadius: "8px", border: "none", background: "#4A5568", color: "#EDF2F7" }}
            />
            <button
              style={{
                width: "100%", padding: "12px", marginTop: "10px", background: "#F6AD55", color: "#FFFFFF",
                border: "none", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#4299E1")}
              onMouseOut={(e) => (e.target.style.background = "#F6AD55")}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Grocery App. All rights reserved. 
            Made with ❤️ by <a href="mailto:support@careapp.com">CareApp Team</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GroceryApp;