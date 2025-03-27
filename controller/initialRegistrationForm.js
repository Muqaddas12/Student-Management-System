const initialRegistrationFormGet=(req,res)=>{
    res.clearCookie("id", { httpOnly: true, secure: true });
res.render('initialRegistrationForm',{title:'initialRegistrationForm',isloggedIn:false})
}
const initialRegistrationFormPost= (req, res) => {

    /** name used for otp is userInput
     * because of css applied on it
     */
const {first_name,middle_name, last_name, dob,email,phone, street_address, district, state, country, zip, department,programme,userInput,}=req.body
    console.log(req.cookie)
    const todayDate=new Date().getFullYear()
   const studentBirthYear=parseInt(dob.split('-')[0],10)
   if(todayDate===studentBirthYear){
    res.redirect('/api/user/registration?error=student_age_should_be_gretar_then_18');

   }
 
    
    console.log(`New student registered: ${first_name} ${last_name} - Country: ${country}`);
    console.log(first_name, last_name, email, dob, street_address, city, state, country, zip, course, )
//    res.redirect('/api/user/dashboard')
}


export default {initialRegistrationFormGet,initialRegistrationFormPost}