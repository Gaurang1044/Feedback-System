const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    
    course_id: {
        type:String,
        required:true, 
    },
    
    student_id: {
        type: String,
        required: true
         
    },
    
    teacher_id:{
        type: String,
        required: true
    },
     
    current_year:{
        type: Number,
        required: true
    }
    
});

const FilledForm = mongoose.model('Filled Forms',formSchema);

module.exports = FilledForm;