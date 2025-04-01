import express from 'express'
import adminDashboard from '../../controller/AdminController/dashboard.js'
import manageStudents from '../../controller/AdminController/manageStudents.js'
import multer from 'multer'
import connectDB from '../../Database.js'
const router=express.Router()
const upload = multer({
    storage: multer.memoryStorage(),
  
  });

router.get('/dashboard',adminDashboard)
router.get('/manageStudents',manageStudents.manageStudentsGET)


router.post('/studentAddmission',upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'documents', maxCount: 1 }
  ]),manageStudents.studentAddmission)
router.post('/deleteStudent',async(req,res)=>{

    const { studentId } = req.body; 

    if (!studentId) {
        return res.status(400).json({ success: false, message: "Student ID is required" });
    }
    const connection = await connectDB()
    try {
        const [result] = await connection.execute(
            "DELETE FROM student_details WHERE id = ?", 
            [studentId]
        );
        await connection.execute('delete from student_document where id=?',[studentId])
        if (result.affectedRows > 0) {
            return res.redirect('/api/admin/manageStudents?success=Student_deleted_successfully')
        } else {
            return res.redirect('/api/admin/manageStudents?error=Student_not_found')
        }
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }finally{
        await connection.end()
    }


})
router.post('/updateStudent',async(req,res)=>{
    console.log(req.body)
const {fieldName,editValue,studentId}=req.body
const connection=await connectDB()
try {
    const query = `UPDATE student_details SET ${fieldName} = ? WHERE id = ?`;
    const values = [editValue, studentId];

    const [results]= await connection.execute(query,values)
    res.redirect('/api/admin/manageStudents?success="value_updated_successfully"')
} catch (error) {
    console.log('error',error)
    res.redirect('/api/admin/manageStudents?error="error_update_failed"')
}

})

router.get('/getStudent/:id',async(req,res)=>{
 const studentId=req.params.id
const connection= await connectDB()
    try {
        
        const query = "SELECT * FROM student_details WHERE id = ?";
        const [results] = await connection.query(query, [studentId]);

        if (results.length > 0) {
             results[0].profileImage = results[0].profileImage.toString('base64');
            return res.json(results[0])
        } else {
            res.send("Student not found");
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Internal Server Error");
    }
})

export default router