import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/register.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import instance from "../../utils/apiClient";

function CreatorRegister() {

    const Navigate = useNavigate();
    
    const [data, setData] = useState({ fullName: "", phone: "", email: "", password: "", cpassword: "", profilePic: null })
    // profilePic is initialized as null because no file is selected initially.
    // File inputs return a File object when a user uploads a file,
    // so null correctly represents "no file selected yet".
    const [error, setError] = useState({ fullName: "", phone: "", email: "", password: "", cpassword: "", profilePic: "" })
    
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

    
    function change(e) {

    const { name, value } = e.target;
     //format phone   
    if (name === "phone") {
      setData({ ...data, phone: formatPhoneNumber(value) });
      return;
    }

    setData({ ...data, [name]: value });
  }


    // function change(e) {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }
    function upload(e) {
        setData({ ...data, profilePic: e.target.files[0] });
        // console.log({ ...data, Profile_pic: e.target.files[0] });
        
    }

    async function submit(e) {

        e.preventDefault()
        let localerror = { 
            fullName: "", 
            phone: "", 
            email: "", 
            password: "", 
            cpassword: "", 
            profilePic: "" 
        };

        console.log(data)

         /* Name validation */
        if (!data.fullName) {
            localerror.fullName = "Name is required";
        }
        // else {
        //     localerror.fullName = ""
        // }

        /* Phone validation */
        const phoneRegex = /^\+\d{2}\s\d{5}\s\d{5}$/;

        if (!data.phone) {
            localerror.phone = "Contact number is required";
        }
        else if (!phoneRegex.test(data.phone)) {
            localerror.phone = "Phone format must be +91 00000 00000";
        }
        // if (data.phone == ) {
        //     localerror.phone = "Contact number is required"
        // }
        // else if (data.phone.length < 10 || data.phone.length > 10) {
        //     localerror.phone = "Contact number should be 10 digits"
        // }
        // else {
        //     localerror.phone = ""
        // }

        /* Email validation */
        if (!data.email) {
            localerror.email = "Email is required"
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
            localerror.email = "Invalid Email"
        }
        // else {
        //     localerror.email = ""
        // }

        /* Password validation */
        if (!data.password) {
            localerror.password = "Password is required"
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password)) {
            localerror.password = "Atleast 8 characters including 1 uppercase, 1 lowercase, 1 number and 1 special character"
        }
        // else {
        //     localerror.password = ""
        // }

        /* Confirm password */
        if (!data.cpassword) {
            localerror.cpassword = "Confirm Password is required"
        }
        else if (data.cpassword !== data.password) {
            localerror.cpassword = "Passwords do not match"
        }
        // else {
        //     localerror.cpassword = ""
        // }

        /*Profile pic validation*/
        if (!data.profilePic) {
            localerror.profilePic = "Profile Picture is required"
        }
        // else {
        //     localerror.profilePic = ""
        // }

        // console.log(Object.values(error))
        // setError({ ...localerror })

        // We directly pass localerror because it is already an object.
        // Using {...localerror} (spread operator) would create a copy,
        // which is unnecessary here since we are not modifying it further.
        setError(localerror);

        if (Object.values(localerror).every((item) => item === "")) {
            try {
                const formData = new FormData();

                formData.append("fullName", data.fullName);
                formData.append("email", data.email);
                formData.append("password", data.password);
                formData.append("phone", data.phone);
                formData.append("profilePic", data.profilePic);

                const response = await instance.post("/creator/register", formData)
                console.log(response.formData);

                alert("Project Creator Registered Successfully")
                Navigate("/login/creator")
            }
            catch (e) {
                console.error(e)
                alert(e.response?.data?.message || "Registration Error");
            }
        }
        else {
            alert("Please fill the form correctly")
        }
    }
    return (
        <>
            <Navbar />
            <div className="register-container">
                <form className="register-card" onSubmit={submit}>
                        <h3>Project Creator Registration</h3>

                        <div className="form-group">
                            <label>
                                Full Name <span className="required">*</span>
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={data.fullName}
                                onChange={change}
                            />

                            <p className="text-danger">{error.fullName}</p>
                        </div>
                        

                         {/* EMAIL */}
                        <div className="form-group">
                            <label>
                                Email <span className="required">*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={data.email}
                                onChange={change}
                            />

                            <p className="text-danger">{error.email}</p>
                        </div>

                        {/* PASSWORD */}
                        <div className="form-group">
                            <label>
                                Password <span className="required">*</span>
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create password"
                                value={data.password}
                                onChange={change}
                            />

                            <p className="text-danger">{error.password}</p>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="form-group">
                            <label>
                                Confirm Password <span className="required">*</span>
                            </label>

                            <input
                                type="password"
                                name="cpassword"
                                placeholder="Re-enter password"
                                value={data.cpassword}
                                onChange={change}
                            />

                            <p className="text-danger">{error.cpassword}</p>
                        </div>

                        {/* PHONE */}
                        <div className="form-group">
                            <label>
                                Contact Number <span className="required">*</span>
                            </label>

                            <input
                                type="text"
                                name="phone"
                                placeholder="+91 00000 00000"
                                value={data.phone}
                                onChange={change}
                            />

                            <p className="text-danger">{error.phone}</p>
                        </div>

                        {/* PROFILE PIC */}
                        <div className="form-group">
                            <label>
                                Profile Picture <span className="required">*</span>
                            </label>

                            <input
                                type="file"
                                name="profilePic"
                                onChange={upload}
                            />

                            <p className="text-danger">{error.profilePic}</p>
                        </div>


                        <button type="submit" className="register-btn">Register</button>
                        <Link to="/login/creator" className="login-text">
                                  Already have an account? Login
                        </Link>
                    </form>
                </div>
           
            <Footer/>
        </>
    )
}

export default CreatorRegister;