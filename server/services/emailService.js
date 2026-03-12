const nodemailer=require("nodemailer")
const transport =nodemailer.createTransport({
    service:"gmail",
    auth:{user:process.env.GMAIL_ADDRESS,pass:process.env.GMAIL_PASSWORD}
})
module.exports=transport