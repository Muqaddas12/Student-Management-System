import express from 'express'
import EmailOtpRegistration from '../../controller/EmailOtpRegistration.js';
import connectDB from '../../Database.js'
import initialRegistration from '../../controller/initialRegistrationForm.js'

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
router.get('/initialRegistrationForm',initialRegistration.initialRegistrationFormGet)
router.post('/initialRegistrationForm',initialRegistration.initialRegistrationFormPost);

//final registration form route
router.get('/fillRegistrationForm',(req,res)=>{
    res.render('fillRegistrationForm',{title:'fillRegistrationForm'})
})

router.post('/sendOtp',EmailOtpRegistration)


export default router