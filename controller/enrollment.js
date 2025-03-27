import connectDB from "../Database.js";



const enrollmentGet=(req,res)=>{
    res.clearCookie("id", { httpOnly: true, secure: true });
res.render('enrollment',{title:'enrollment',isloggedIn:false})
}



const enrollmentPost= (req, res) => {
    console.log(req.file)
    const imageBuffer=req.file.buffer

    /** name used for otp is userInput
     * because of css applied on it
     */

const { first_name, middle_name, last_name, dob, email, phone, street_address, district, state, country, zip, department, programme, userInput } = req.body;

// Check if any field is missing
if (!first_name || !last_name || !dob || !email || !phone || !street_address || !district || !state || !country || !zip || !department || !programme || !userInput) {
    return res.redirect('/api/user/enrollment?error=All_fields_are_required!');
}

    // ✅ Validate OTP
const generatedOtp=req.otp
if(generatedOtp!==userInput){
    return res.redirect('/api/user/enrollment?error=Invalid_Otp');
}
 // ✅ Age validation
 const todayYear = new Date().getFullYear();
 const birthYear = parseInt(dob.split('-')[0], 10);
 const age = todayYear - birthYear;
   if (age < 18) {
    return res.redirect('/api/user/enrollment?error=Student_age_should_be_greater_than_18');
}
 

    // ✅ INSERT Query
    const insertQuery = `INSERT INTO students (first_name, middle_name, last_name, dob, email, phone, street_address, district, state, country, zip, department, programme)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                 const values = [first_name, middle_name, last_name, dob, email, phone, street_address, district, state, country, zip, department, programme];



                 connectDB.query(insertQuery, values, (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return res.redirect('/api/user/enrollment?error=Error_inserting_data');
                    }
                    console.log('Student registered successfully:', result.insertId);
                    res.redirect('/api/user/dashboard');
                });
}


export default {enrollmentGet,enrollmentPost}