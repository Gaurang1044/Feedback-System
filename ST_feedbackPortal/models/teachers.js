const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    id: {
        type: Number,
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
    timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

