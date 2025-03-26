import express from 'express'

import connectDB from '../../Database.js'

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
router.get('/registration',(req,res)=>{
res.render('initialRegistrationForm',{title:'initialRegistrationForm'})
})
router.post('/registration', (req, res) => {
    const { first_name, last_name, email, dob, street_address, city, state, country, zip, course,  } = req.body;
    const todayDate=new Date().getFullYear()
   const studentBirthYear=parseInt(dob.split('-')[0],10)
   if(todayDate===studentBirthYear){
    res.redirect('/api/user/registration?error=student_age_should_be_gretar_then_18');

   }
 
    
    console.log(`New student registered: ${first_name} ${last_name} - Country: ${country}`);
    console.log(first_name, last_name, email, dob, street_address, city, state, country, zip, course, )
//    res.redirect('/api/user/dashboard')
});

//final registration form route
router.get('/fillRegistrationForm',(req,res)=>{
    res.render('fillRegistrationForm',{title:'fillRegistrationForm'})
})

export default router