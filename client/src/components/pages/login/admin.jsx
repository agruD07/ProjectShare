import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/register.css";
import Navbar from "../../navbar";
import Footer from "../../footer";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("⚠️ Please fill all required fields.");
      return;
    }

    /* TEMP ADMIN CHECK (frontend only) */
    if (formData.email === "admin@admin.com" && formData.password === "admin") {
      alert("✅ Admin Login Successful");
      navigate("/admin/dashboard");
    } else {
      setError("❌ Invalid admin credentials");
    }
  };

  return (
    <><Navbar/>
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h3>Admin Login</h3>

        {error && <p className="form-error">{error}</p>}

        {/* Email */}
        <div className="form-group">
          <label>
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <button type="submit" className="register-btn">
          Login
        </button>

        <div>
          <Link to="/forgot-password" className="login-text">
            Forgot Password?
          </Link>
        </div>
        <div>
          <Link to="/register" className="login-text">
            New to ProjectShare? Register now
          </Link>
        </div>
      </form>
    </div>
    <Footer/>

    </>
  );
};

export default AdminLogin;
