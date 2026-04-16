//import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


import "../../assets/styles/login.css"; // reuse same CSS
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import instance from "../../utils/apiClient";

const CreatorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error when typing
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  let lerror = { email: "", password: "" };

  if (!formData.email) {
    lerror.email = "Email is required";
  }

  if (!formData.password) {
    lerror.password = "Password is required";
  }

  setError(lerror);

  if (Object.values(lerror).every((item) => item === "")) {
    try {
      const response = await instance.post("/creator/login", formData);

      // ✅ store token
      //const token = response.data.token
      //localStorage.setItem("TOKEN", token)
      localStorage.setItem("TOKEN", response.data.token);


      // ✅ store user details (IMPORTANT)
// localStorage.setItem("USER", JSON.stringify(response.data.creator));
localStorage.setItem("USER", JSON.stringify({
  _id: response.data.creator._id,
  role: "creator"
}));

alert("✅ Login Successful");

      // ✅ React navigation
      navigate("/creator/dashboard");

    } catch (err) {
      if (err.response?.data?.message) {
        setError({email: "", password: err.response.data.message});
        //setError({ ...lerror, password: err.response.data.message });
      } else {
        alert("❌ Login failed");
      }
    }
  }
};

  return (
    <><Navbar/>
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h3>Project Creator Login</h3>

        


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
          {error.email && <p className="form-error">{error.email}</p>}
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
          {error.password && <p className="form-error">{error.password}</p>}
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        {/* links same as register pages login link */}
        <div>
            <Link to="/forgot-password" className="login-text">Forgot Password?</Link>
        </div>
        <div>
            <Link to="/register/creator" className="login-text">New to ProjectShare? Register now</Link>
        </div>
      </form>
    </div>
    <Footer/>

    </>
  );
};

export default CreatorLogin;
