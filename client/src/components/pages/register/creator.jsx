import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/register.css";
import Navbar from "../../navbar";
import Footer from "../../footer";

/* 📞 Phone formatter: +91 00000 00000 */
const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, "");

  const country = digits.slice(0, 2);
  const first = digits.slice(2, 7);
  const second = digits.slice(7, 12);

  let formatted = "+";
  if (country) formatted += country;
  if (first) formatted += " " + first;
  if (second) formatted += " " + second;

  return formatted;
};

const CreatorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profilePic: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      setFormData({ ...formData, phone: formatPhoneNumber(value) });
      return;
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    /* Required fields */
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone
    ) {
      setError("Please fill all required fields.");
      return;
    }

    /* Gmail validation */
    if (!formData.email.endsWith("@gmail.com")) {
      setError("Email must end with @gmail.com");
      return;
    }

    /* Phone validation */
    const phoneRegex = /^\+\d{2}\s\d{5}\s\d{5}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone format must be +91 00000 00000");
      return;
    }

    /* Password match */
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /* ✅ Payload for backend (RAW password) */
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password, // backend will hash
      profilePic: formData.profilePic,
      role: "creator",
    };

    console.log("➡️ Sending to backend:", payload);

    // later:
    // await apiClient.post("/auth/register", payload);

    alert("Creator registered successfully!");
  };

  return (
    <>
    <Navbar/>
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h3>Project Creator Registration</h3>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label>Full Name <span className="required">*</span></label>
          <input
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email <span className="required">*</span></label>
          <input
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password <span className="required">*</span></label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="password-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password <span className="required">*</span></label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span className="password-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Phone <span className="required">*</span></label>
          <input
            name="phone"
            placeholder="+91 00000 00000"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button className="register-btn">Register</button>

        <Link to="/login" className="login-text">
          Already have an account? Login
        </Link>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default CreatorRegister;
