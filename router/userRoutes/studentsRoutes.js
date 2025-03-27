import express from 'express'
import EmailOtpRegistration from '../../controller/EmailOtpRegistration.js';
import connectDB from '../../Database.js'
import initialRegistration from '../../controller/enrollment.js'
import verifyOtp from '../../src/services/VerifyOtp.js';
import multer from 'multer';
const storage=multer.memoryStorage()
const upload=multer({storage:storage})
const router = express.Router();
//connect to mysql 
connectDB()

router.get('/dashboard',(req,res)=>{
    res.render('dashboard',{title:'dashboard'})
})
router.get('/academicCalendar',(req,res)=>{
    res.render('academicCalendar')
})
router.get('/mentorDetails',(req,res)=>{
    res.render('mentorDetails',{title:'mentorDetails'})
})

//initial registration form route
router.get('/enrollment',initialRegistration.enrollmentGet)
router.post('/enrollment',verifyOtp,upload.single('profilePicture'),initialRegistration.enrollmentPost);

//final registration form route
router.get('/addmissionForm',(req,res)=>{
    res.render('addmissionForm',{title:'addmissionForm'})
})

router.post('/sendOtp',EmailOtpRegistration)


export default router