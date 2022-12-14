const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const facultySchema = new mongoose.Schema({
    fac_name:{
        type: String,
    },
    fac_code:{
        type: String,
    },
})


module.exports = mongoose.model('faculty', facultySchema)