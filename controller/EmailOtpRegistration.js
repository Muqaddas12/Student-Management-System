import sendEmail from "../src/services/EmailOtpRegistration.js"

const EmailOtpRegistration=(req,res)=>{
    const {email}=req.body
    console.log(email)
    res.json({ message: "OTP sent successfully!" });
}

export default EmailOtpRegistration