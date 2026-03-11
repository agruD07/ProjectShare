import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/register.css";
import Navbar from "../../navbar";
import Footer from "../../footer";

const expertiseOptions = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Project Management",
  "Marketing",
  "Content Creation",
  "Business Strategy",
];

const MentorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    expertise: [],
    experience: "",
    credentials: "",
    bio: "",
    profilePhoto: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* 📞 Phone formatter */
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

  const toggleExpertise = (item) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(item)
        ? prev.expertise.filter((i) => i !== item)
        : [...prev.expertise, item],
    }));
  };

  const removeExpertise = (item) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((i) => i !== item),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phoneRegex = /^\+\d{2}\s\d{5}\s\d{5}$/;

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone ||
      !formData.expertise.length ||
      !formData.experience
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!formData.email.endsWith("@gmail.com")) {
      setError("Email must end with @gmail.com");
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      setError("Phone format must be +91 00000 00000");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password, // backend will hash
      expertise: formData.expertise,
      experience: formData.experience,
      credentials: formData.credentials,
      bio: formData.bio,
      profilePhoto: formData.profilePhoto,
      role: "mentor",
    };

    console.log("➡️ Mentor payload:", payload);
    alert("Mentor registered successfully!");
  };

  return (
    <>
    <Navbar/>
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h3>Mentor / Expert Registration</h3>

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
          <label>Areas of Expertise <span className="required">*</span></label>

          <div className="multi-select" ref={dropdownRef}>
            <div
              className="multi-select-box"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {formData.expertise.length === 0 && (
                <span className="multi-select-placeholder">
                  Select expertise areas
                </span>
              )}

              {formData.expertise.map((item) => (
                <div key={item} className="chip">
                  {item}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExpertise(item);
                    }}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>

            {showDropdown && (
              <div className="expertise-dropdown">
                {expertiseOptions.map((item) => (
                  <div
                    key={item}
                    className="expertise-dropdown-item"
                    onClick={() => toggleExpertise(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Years of Experience <span className="required">*</span></label>
          <input
            name="experience"
            placeholder="Enter years of experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Credentials</label>
          <textarea
            name="credentials"
            placeholder="Enter your credentials"
            value={formData.credentials}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button className="register-btn">Register</button>

        <Link to="/login/mentor" className="login-text">
          Already have an account? Login
        </Link>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default MentorRegister;
