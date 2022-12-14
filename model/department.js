const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const departmentSchema = new mongoose.Schema({
    depart_name:{
        type: String,
    },
    depart_code:{
        type: String,
    },
    faculty_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'faculty'
    }
})


module.exports = mongoose.model('department',departmentSchema)