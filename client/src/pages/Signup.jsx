import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { toast } from "react-toastify";
import "../index.css"; // Import the CSS file

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "elderly",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", user);
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed.");
    }
  };

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Signup</h2>

        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="input-field" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" required />

        <select name="role" onChange={handleChange} className="input-field">
          <option value="elderly">Elderly</option>
          <option value="family">Family Member</option>
          <option value="volunteer">Volunteer</option>
        </select>

        <input type="text" name="phone" placeholder="Phone (optional)" onChange={handleChange} className="input-field" />
        <input type="text" name="address" placeholder="Address (optional)" onChange={handleChange} className="input-field" />

        <button type="submit" className="btn-primary">Sign Up</button>
        <a href="/login" className="link-text">Already have an account? Login</a>
      </form>
    </div>
    </>
  );
};

export default Signup;
