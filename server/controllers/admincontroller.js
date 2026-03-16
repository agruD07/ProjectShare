const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
// const adminVerify = require("../middlewares/")

router.post("/login",async(req,res)=>{
    const {email, password} =req.body
    if(email=="admmin@admin.com" && password=="admin"){
        const token = jwt.sign({admin:true},process.env.JWT_TOKEN)
        res.send({
            message: "Login Successfully", token
        })
    }
    else{
        res.status(404).send({
            message: "Login Failed"
        })
    }
})

module.exports=router