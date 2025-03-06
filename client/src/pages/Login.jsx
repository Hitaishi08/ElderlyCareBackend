import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../index.css"; // Import CSS styles

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", credentials); // Update with your backend URL

      // ✅ Store token & userId in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id); // ✅ Store user ID

      toast.success("Login successful!");

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Login</h2>

        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" required />

        <button type="submit" className="btn-primary">Login</button>
        <a href="/signup" className="link-text">Don't have an account? Sign Up</a>
      </form>
    </div>
  );
};

export default Login;
