const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    // hfhfhfhf
    password: {
        type: String,
        required: true
        
    },
    department_name: {
        type: String,
        required: true 
    },
    phone_no: {
        type: String,
        required: true,
        unique: true 
    }
}, {
    timestamps:true
});

const Student = mongoose.model('Student' , studentSchema);

module.exports = Student;

