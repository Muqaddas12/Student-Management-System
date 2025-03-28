import express from 'express'
import multer from 'multer';
import EmailOtpRegistration from '../../controller/EmailOtpRegistration.js';
import connectDB from '../../Database.js'
import initialRegistration from '../../controller/enrollment.js'
import verifyOtp from '../../src/services/VerifyOtp.js';
import dashboardGET from '../../controller/dashboard.js';
import addmissionForm from '../../controller/addmissionForm.js';
import uploadDocuments from '../../controller/uploadDocuments.js';
import login from '../../controller/login.js';
import profile from '../../controller/profile.js';
import getPdfFile from '../../controller/getPdfFile.js';
const storage=multer.memoryStorage()
const upload=multer({storage:storage})
const router = express.Router();
//connect to mysql 
connectDB()

router.get('/dashboard',dashboardGET)

router.get('/addmissionForm',addmissionForm.addmissionFormGET)
router.post('/addmissionForm',addmissionForm.addmissionFormPOST)
router.get('/uploadDocuments',uploadDocuments.uploadDocumentsGet)
router.post('/uploadDocuments',upload.single('pdfFile'),uploadDocuments.uploadDocumentsPost)
router.get('/getPdf',getPdfFile)
router.get('/attendance',(req,res)=>{
    res.render('attendance')
})
router.get('/profile',profile)

router.get('/academicCalendar',(req,res)=>{
    res.render('academicCalendar')
})
router.get('/mentorDetails',(req,res)=>{
    res.render('mentorDetails',{title:'mentorDetails',isloggedIn:true})
})

//initial registration form route
router.get('/enrollment',initialRegistration.enrollmentGet)
router.post('/enrollment',verifyOtp,upload.single('profilePicture'),initialRegistration.enrollmentPost);



router.post('/sendOtp',EmailOtpRegistration)
router.post('/login',login)
router.get('/logout',(req,res)=>{
   if(req.cookies.smsShobhitUniversity){
    res.clearCookie('smsShobhitUniversity')
   return res.redirect('/?success=Logout_successfully')
   }
return res.redirect('/?error=Login_first')
})


export default router