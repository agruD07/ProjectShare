import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/register.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar";
import Footer from "../../footer";
import instance from "../../../utils/apiClient"

function Creator() {
    const Navigate = useNavigate()
    const [data, setData] = useState({ fullName: "", phone: "", email: "", password: "", cpassword: "", Profile_pic: "" })
    const [error, setError] = useState({ fullName: "", phone: "", email: "", password: "", cpassword: "", Profile_pic: "" })
    function change(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function upload(e) {
        setData({ ...data, Profile_pic: e.target.files[0] });
        // console.log({ ...data, Profile_pic: e.target.files[0] });
        
    }
    async function submit(e) {
        e.preventDefault()
        let localerror = { fullName: "", phone: "", email: "", password: "", cpassword: "", Profile_pic: "" }
        console.log(data)
        if (data.fullName == "") {
            localerror.fullName = "Name is required"
        }
        else {
            localerror.fullName = ""
        }
        if (data.phone == "") {
            localerror.phone = "Contact number is required"
        }
        else if (data.phone.length < 10 || data.phone.length > 10) {
            localerror.phone = "Contact number should be 10 digits"
        }
        else {
            localerror.phone = ""
        }
        if (data.email == "") {
            localerror.email = "Email is required"
        }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
            localerror.email = "Invalid Email"
        }
        else {
            localerror.email = ""
        }
        if (data.password == "") {
            localerror.password = "Password is required"
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password)) {
            localerror.password = "Atleast 8 characters including 1 uppercase, 1 lowercase, 1 number and 1 special character"
        }
        else {
            localerror.password = ""
        }
        if (data.cpassword == "") {
            localerror.cpassword = "Confirm Password is required"
        }
        else if (data.cpassword != data.password) {
            localerror.cpassword = "Password and Confirm Password should be same"
        }
        else {
            localerror.cpassword = ""
        }
        if (data.Profile_pic == "") {
            localerror.Profile_pic = "Profile Picture is required"
        }
        else {
            localerror.Profile_pic = ""
        }
        console.log(Object.values(error))
        setError({ ...localerror })
        if (Object.values(localerror).every((item) => item === "")) {
            try {
                const formData = new FormData()
                formData.append("fullName", data.fullName)
                formData.append("phone", data.phone)
                formData.append("email", data.email)
                formData.append("password", data.password)
                formData.append("Profile_pic", data.Profile_pic)
                const response = await instance.post("/creator/register", formData)
                alert("Registered Successfully")
                Navigate("/creatorlogin")
            }
            catch (e) {
                console.error(e)
                alert(e.response?.data?.message || "Registration Error");
            }
        }
        else {
            alert("Please fill the form to register")
        }
    }
    return (
        <>
            <Navbar />
            <div className="register-container">
                <div className="register-card">
                    <form action="" className="form-group">
                        <h2>Registration</h2>
                        <label htmlFor="fullName">Full Name: </label>
                        <input onChange={change} type="text" name="fullName" />
                        <p className="text-danger">{error.fullName}</p>
                        <label htmlFor="phone">Contact Number: </label>
                        <input onChange={change} type="number" name="phone" />
                        <p className="text-danger">{error.phone}</p>
                        <label htmlFor="email">Email: </label>
                        <input onChange={change} type="email" name="email" />
                        <p className="text-danger">{error.email}</p>
                        <label htmlFor="password">Password: </label>
                        <input onChange={change} type="password" name="password" />
                        <p className="text-danger">{error.password}</p>
                        <label htmlFor="cpassword">Confirm Password: </label>
                        <input onChange={change} type="password" name="cpassword" />
                        <p className="text-danger">{error.cpassword}</p>
                        <label htmlFor="Profile_pic">Profile Picture</label>
                        <input onChange={upload} type="file" name="Profile_pic" />
                        <p className="text-danger">{error.Profile_pic}</p>
                        <button onClick={submit} value="submit" className="register-btn">REGISTER</button>
                        <p className="mt-3">
                            Already have an account? <Link to="/creatorlogin">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Creator;