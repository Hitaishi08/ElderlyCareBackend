import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskScheduler from "./pages/TaskScheduler";
import MedicineTracker from "./pages/MedicineTracker";
import GroceryApp from "./pages/GroceryApp";
import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token); // Set user as logged in if token exists
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ?  <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task" element={<TaskScheduler />} />
        <Route path="/medicines" element={<MedicineTracker />} />
        <Route path="/groceries" element={<GroceryApp />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
