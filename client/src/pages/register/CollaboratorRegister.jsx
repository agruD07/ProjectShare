import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/register.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import instance from "../../utils/apiClient";

const CollaboratorRegister = () => {

  const navigate = useNavigate();//to redirect after success
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    skills: "",
    portfolio: "",
    bio: "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    skills: "",
    portfolio: "",
    bio: "",
    profilePic: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

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


  //MAIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    let localErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      skills: "",
      portfolio: "",
      bio: "",
      profilePic: "",
    };    

        /* Full Name validation */
    if (!formData.fullName) {
      localErrors.fullName = "Full name is required";
    }

    /* Email validation */
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!formData.email) {
      localErrors.email = "Email is required";
    }
    else if (!gmailRegex.test(formData.email)) {
      localErrors.email = "Please enter a valid Gmail address";
    }

    /* Phone validation */
    const phoneRegex = /^\+\d{2}\s\d{5}\s\d{5}$/;

    if (!formData.phone) {
      localErrors.phone = "Phone number is required";
    }
    else if (!phoneRegex.test(formData.phone)) {
      localErrors.phone = "Phone format must be +91 00000 00000";
    }


  /* Password validation */
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!formData.password) {
    localErrors.password = "Password is required";
  }
  else if (!passwordRegex.test(formData.password)) {
    localErrors.password =
    "Password must contain uppercase, lowercase, number and special character";
  }

    /* Confirm password */
    if (!formData.confirmPassword) {
      localErrors.confirmPassword = "Confirm password is required";
    }
    else if (formData.password !== formData.confirmPassword) {
      localErrors.confirmPassword = "Passwords do not match";
    }
    
    /* Skills validation */
    if (!formData.skills) {
      localErrors.skills = "Skills are required";
    }

    /* Portfolio validation */
    if (!formData.portfolio) {
      localErrors.portfolio = "Portfolio links are required";
    }

    /* Bio validation */
    if (!formData.bio) {
      localErrors.bio = "Bio is required";
    }

    /* Profile picture validation */
    if (!formData.profilePic) {
      localErrors.profilePic = "Profile picture is required";
    }

    setErrors(localErrors);

    // /* Payload sent to backend (RAW password) */
    // const payload = {
    //   fullName: formData.fullName,
    //   email: formData.email,
    //   phone: formData.phone,
    //   password: formData.password, // 🔑 backend will hash
    //   skills: formData.skills.split(",").map(s => s.trim()),
    //   portfolio: formData.portfolio
    //     ? formData.portfolio.split(",").map(p => p.trim())
    //     : [],
    //   bio: formData.bio,
    //   profilePic: formData.profilePic,
    //   role: "collaborator",
    // };

    // console.log("➡️ Sending to backend:", payload);

  /* Check if no errors */
  if (Object.values(localErrors).every((item) => item === "")) {

    // Using FormData because we are uploading a file
    const data = new FormData();

    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    data.append("skills",JSON.stringify(formData.skills.split(",").map((s) => s.trim())));
    data.append("portfolio",JSON.stringify(formData.portfolio.split(",").map((p) => p.trim())));
    data.append("bio", formData.bio);
    data.append("profilePic", formData.profilePic);
    data.append("role", "collaborator");   
    
    try {

      // ADDED: Backend API call
      const res = await instance.post("/collaborator/register", data);//API call to backend

      console.log(res.data);

      alert("Collaborator registered successfully!");

      // ADDED: redirect to login
      navigate("/login/collaborator");

    } catch (err) {

      console.error(err);

      alert(
      err?.response?.data?.message ||
      "Registration failed. Please try again."
      );
    }
  }
  else {
            alert("Please fill the form correctly")
        }
 };

    // later:
    // await apiClient.post("/auth/register", payload);

  //   alert("Collaborator registered successfully!");
  // };

  return (
    <>
    <Navbar/>
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h3>Collaborator Registration</h3>

        {/* Global error removed because we use field errors */}

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
          {errors.confirmPassword && <p className="input-error">{errors.confirmPassword}</p>}
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
          <label>Skills <span className="required">*</span></label>
          <input
            name="skills"
            placeholder="React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
          />
          {errors.skills && <p className="input-error">{errors.skills}</p>}
        </div>

        <div className="form-group">
          <label>Portfolio <span className="required">*</span></label>
          <input
            name="portfolio"
            placeholder="GitHub, LinkedIn links"
            value={formData.portfolio}
            onChange={handleChange}
          />
          {errors.portfolio && <p className="input-error">{errors.portfolio}</p>}
        </div>

        <div className="form-group">
          <label>Bio <span className="required">*</span></label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleChange}
          />
          {errors.bio && <p className="input-error">{errors.bio}</p>}
        </div>

         <div className="form-group">
          <label>Profile Picture<span className="required">*</span></label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.profilePic && <p className="input-error">{errors.profilePic}</p>}
        </div>

        <button type="submit" className="register-btn">Register</button>

        <Link to="/login/collaborator" className="login-text">
          Already have an account? Login
        </Link>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default CollaboratorRegister;
