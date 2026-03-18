import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import "../../assets/styles/register.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import instance from "../../utils/apiClient";

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

  const navigate = useNavigate();

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
    profilePic: null,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    expertise: "",
    experience: "",
    bio:"",
    profilePic: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  

  const dropdownRef = useRef(null);

   /* close dropdown when clicking outside */
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

  /* expertise selection */
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

    let localErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      expertise: "",
      experience: "",
      profilePic: "",
    };



 /* validations */

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\+\d{2}\s\d{5}\s\d{5}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!formData.fullName) {
      localErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      localErrors.email = "Email is required";
    }
    else if (!gmailRegex.test(formData.email)) {
      localErrors.email = "Enter a valid Gmail address";
    }

    if (!formData.phone) {
      localErrors.phone = "Phone number is required";
    }
    else if (!phoneRegex.test(formData.phone)) {
      localErrors.phone = "Phone must be +91 00000 00000";
    }

    if (!formData.password) {
      localErrors.password = "Password is required";
    }
    else if (!passwordRegex.test(formData.password)) {
      localErrors.password =
        "Password must contain uppercase, lowercase, number and symbol";
    }

    if (!formData.confirmPassword) {
      localErrors.confirmPassword = "Confirm password is required";
    }
    else if (formData.password !== formData.confirmPassword) {
      localErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.expertise.length) {
      localErrors.expertise = "Select at least one expertise area";
    }

    if (!formData.experience) {
      localErrors.experience = "Experience is required";
    }

    if (!formData.profilePic) {
      localErrors.profilePic = "Profile photo is required";
    }
        /* Bio validation */
    if (!formData.bio) {
      localErrors.bio = "Bio is required";
    }

    setErrors(localErrors);

    /* check if no errors */

    if (Object.values(localErrors).every((item) => item === "")) {

      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);

      data.append(
        "expertise",
        JSON.stringify(formData.expertise)
      );

      data.append("experience", formData.experience);
      data.append("credentials", formData.credentials);
      data.append("bio", formData.bio);

      data.append("profilePic", formData.profilePic);

      data.append("role", "mentor");

      try {

        const res = await instance.post(
          "/mentor/register",
          data
        );

        console.log(res.data);

        alert("Mentor registered successfully!");

        navigate("/login/mentor");

      }
      catch (err) {

        console.error(err);

        alert(
          err?.response?.data?.message ||
          "Registration failed"
        );
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h3>Mentor / Expert Registration</h3>

        

        <div className="form-group">
          <label>Full Name <span className="required">*</span></label>
          <input
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="input-error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label>Email <span className="required">*</span></label>
          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="input-error">{errors.email}</p>}
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
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.password && <p className="input-error">{errors.password}</p>}
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
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.confirmPassword && (
              <p className="input-error">{errors.confirmPassword}</p>
            )}
        </div>

        <div className="form-group">
          <label>Phone <span className="required">*</span></label>
          <input
            name="phone"
            placeholder="+91 00000 00000"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="input-error">{errors.phone}</p>}
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
         {errors.expertise && <p className="input-error">{errors.expertise}</p>} 
        </div>

        <div className="form-group">
          <label>Years of Experience <span className="required">*</span></label>
          <input
            name="experience"
            placeholder="Enter years of experience"
            value={formData.experience}
            onChange={handleChange}
          />
          {errors.experience && (
              <p className="input-error">{errors.experience}</p>
            )}
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
          <label>Bio<span className="required">*</span></label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleChange}
          />
        {errors.bio && <p className="input-error">{errors.bio}</p>}  
        </div>

        <div className="form-group">
          <label>Profile Photo<span className="required">*</span></label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.profilePic && <p className="input-error">{errors.profilePic}</p>}
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
