const mongoose = require('mongoose');

const courseInfoSchema = new mongoose.Schema({
    course_id: {
        type: Number,
        required: true,
        unique: true
    },
    teacher_id: {
        type: Number,
        required: true,
        unique: true
    },
    course_name: {
        type: String,
        required: true 
    },
    department_name: {
        type: String,
        required: true 
    },
    semester_no: {
        type: Number,
        required: true 
    },
    student_year: {
        type: Number,
        required: true 
    },
    credits: {
        type: Number,
        required: true 
    }
}, {
    timestamps:true
});

const CourseInfo = mongoose.model('CourseInfo' , courseInfoSchema);

module.exports = CourseInfo;

