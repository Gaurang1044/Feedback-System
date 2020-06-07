
const Student = require('../models/students');
const Teacher = require('../models/teachers');
// const Dean = require('../models/dean');
// const DSA = require('../models/dsa');
const FilledForm = require('../models/filled_form');

const Courses = require("../models/courses")

var ques = require('../models/ques');
var dept = ['Aerospace', 'Civil', 'CSE', 'ECE', 'Electrical', 'Mechanical', 'Mettalurgy', 'Production']

var methods = {};
methods.dept = dept;



methods.setDb = function (user_type) {
    var User;
    switch (user_type) {
        case "0":
            User = Student;

            break;
        case "1":
            User = Teacher;
            break;
        case "2":
            // User=Dean;
            break;
        default:
            var x = 1;

        // User=DSA;
    }
    return User;
}

methods.courseSet = async function (user_type, sid, courses, coursesActive, coursesInActive) {
    if (courses) {
        for (var i = 0; i < courses.length; i++) {
            if (courses[i].active) {
                if (user_type == '0') {
                    let form = await FilledForm.findOne({
                        student_id: sid,
                        course_id: courses[i].id
                        //current_year:Date
                    });
                    //If form has been filled and the course was active
                    if (form) {
                        coursesInActive.push(courses[i]);
                    }
                    else {
                        coursesActive.push(courses[i]);
                    }

                }
                else {
                    coursesActive.push(courses[i]);
                }

            }
            else {
                coursesInActive.push(courses[i]);
            }
        }
        return [coursesActive, coursesInActive];
    }
    else {
        return [courses, courses];
    }

}
methods.setTeacherName = async function (user_type, teachName, courses) {
    if (user_type == 0) {
        for (var i = 0; i < courses.length; i++) {
            let teacher = await Teacher.findOne({ id: courses[i].teacher_id });

            //If form has been filled and the course was active
            if (teacher) {
                courses[i]['teach_name'] = teacher.name;
            }
            else {
                courses[i]['teach_name'] = "...";
            }

        }
    }
    else {
        for (var i = 0; i < courses.length; i++) {
            courses[i]['teach_name'] = teachName;
        }
    }

}
methods.courseData = async function (user_type, sid) {

    if (user_type == 0) {
        var date = new Date();
        var add = 0;
        if (date.getMonth() > 7)
            add = 1;
        var year = add + date.getFullYear() - (2000 + Math.floor(sid / 1000000));

        var sem = year * 2 - add;
        var de = Math.floor(sid / 1000) % 10 - 1;

        let courses = await Courses.find({
            sem_no: sem,
            student_year: year,
            department_name: dept[de]

        });

        return courses;
    }
    else if (user_type == 1) {
        let courses = await Courses.find({
            teacher_id: sid
        });
        return courses;

    }
}

methods.form_filled = async function (cid, tid, sid) {
    let resp = await FilledForm.findOne({ course_id: cid, student_id: sid, teacher_id: tid });
    if (resp)
        return true;
    return false;
}
exports.data = methods;