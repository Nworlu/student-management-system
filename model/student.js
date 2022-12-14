const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const studentSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:[true, 'firstname is required'],
    },
    lastname:{
        type: String,
        required:[true, 'lastname is required']
    },
    email:{
        type: String,
        required:[true, 'email is required'],
        // unique: true
    },
    password:{
        type: String,
        required:[true, 'password is required'],
    },
    matric_no:{
        type: String,
        required:[false, 'matriculation number is required'],
        // unique: true
    },
    faculty_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculty'
    },
    department_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'department'
    },
    created_At:{
        type: Date,
        default: Date.now
    },
    updated_At:{
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('student',studentSchema)