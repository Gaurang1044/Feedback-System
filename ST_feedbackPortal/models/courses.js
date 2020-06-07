const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true

    },
    teacher_id: {
        type: String,
        required: true
    },
    department_name: {
        type: String,
        required: true
    },

    student_year: {
        type: Number,
        required: true
    },

    sem_no: {
        type: Number,
        required: true
    },

    credits: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        // required: true,
        default: true
    },
    date_active: {
        type: Date
    }

});

const Courses = mongoose.model('Course Info', courseSchema);

module.exports = Courses;