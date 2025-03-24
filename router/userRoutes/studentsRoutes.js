import express from 'express'
import connectDB from '../../Database.js'

const router = express.Router();
//connect to mysql 
connectDB()

router.get('/dashboard',(req,res)=>{
    res.render('layout',{title:'dashboard'})
})

router.get('/registration',(req,res)=>{
res.render('Registration',{title:'registration'})
})
router.get('/registrationForm',(req,res)=>{
res.render('RegistrationForm',{title:'registration'})
})
router.post('/registration', (req, res) => {
    const { first_name, last_name, email, dob, street_address, city, state, country, zip, course, comments } = req.body;
    
    console.log(`New student registered: ${first_name} ${last_name} - Country: ${country}`);
   res.redirect('/api/user/dashboard')
});

export default router