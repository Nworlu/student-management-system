const express = require('express');
const router = express.Router();
const Students = require('../model/student')
const Department = require('../model/department')
const Faculty = require('./../model/faculty')
const jwt = require('jsonwebtoken');
function pad(num) {
    num = num.toString();
    while (num.length < 4) num = "0" + num;
    return num;
}
// const info = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',0,1,2,3,4,5,6,7,8,9]
const info = 'abcdefghijklmnopqrstuvwxyz0123456789'

router.get('/fal/:id', async (req,res)=>{
const data = await Faculty.findById(req.params.id)
    res.status(200).json({
        status: "sucess",
        data: {
            new: data
        }
    })
})
router.get('/dep/:id', async (req,res)=>{
const data = await Department.findById(req.params.id).populate("faculty_id", {_id:0, fac_name:1})
    res.status(200).json({
        status: "sucess",
        data: {
            new: data
        }
    })
})

router.post('/register', async (req,res)=>{
    try {
        let { firstname, lastname, email, password, faculty_id, department_id, matric_no,created_At } = req.body;
        const newStudent = new Students({
             firstname,
             lastname,
             email,
             password,
             faculty_id,
             department_id,
             created_At,
             matric_no,
        })
        const student = await Students.findOne({email:email})
        let code = null
        if(student){
            res.status(200).json({
                success:false,
                message:`Student With Email ${email} Exist Try Another Email Or Login`
            })
        } else {
             code = await (await newStudent.save()).populate([{path:"faculty_id", select: {_id:0, fac_name:1}}, {path:"department_id", select: { _id:0, depart_code: 1}}]);
            res.status(200).json({
                success:true,
                message: newStudent
            })
        }
        let last_mat = await Students.findOne({matric_no:matric_no}, {},  {sort: { 'created_At' : -1 } })
        code = code.department_id.depart_code
        last_mat = last_mat
        console.log(last_mat);

        if (!last_mat)
        {
            last_mat = "0001"
        }
        else{
            last_mat = pad(Number(last_mat.split('/')[3])+1)
        }

        // let d = Object.values(created_At)
        let d = newStudent.created_At.getFullYear().toString().substring(2,4)
          newStudent.matric_no = `vug/${code}/${d}/${last_mat}`
        
        // await newStudent.save()
        // console.log(newStudent.created_At.getFullYear().toString().substring(2,4));
    } catch (error) {
        console.log(error);
    }

})

router.post('/faculty', async (req,res)=>{
   const { fac_name, fac_code } = req.body;
   const newFaculty = new Faculty({
    fac_name: fac_name,
    fac_code:fac_code
    
})
   await newFaculty.save();
   res.send(newFaculty)
})

router.post('/department', async (req,res)=>{
   const { depart_name, depart_code, faculty_id } = req.body;
   const newDepartment = new Department({
    faculty_id: faculty_id,
    depart_name: depart_name,
    depart_code: depart_code
    
})
   await newDepartment.save();
   res.send(newDepartment)
})


module.exports = router;