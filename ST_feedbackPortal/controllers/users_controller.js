const Student = require('../models/students');
const Teacher = require('../models/teachers');
// const Dean = require('../models/dean');
// const DSA = require('../models/dsa');
const FilledForm = require('../models/filled_form');

const Courses = require("../models/courses")

var ques = require('../models/ques');
var helper = require('./helper_functions.js').data;
var dept = helper.dept;

module.exports.idle = function (req, res) {
    return res.redirect('/users/signin');
}

// //render signup page
// module.exports.signup = function (req, res) {
//     return res.render('user_signup', {
//         title: "signup form"
//     })
// }

// //get the sign up data
// module.exports.create = function (req, res) {
//     Teacher.findOne({ id: req.body.id }, function (err, user) {
//         if (err) { console.log('error in signing up the user', err); return }
//         if (!user) {

//             Teacher.create(req.body, function (err, user) {

//                 if (err) { console.log('error in signing up', err); return }

//                 return res.redirect('/users/signin')
//             })
//         }
//         else {

//             return res.redirect('back')
//         }
//     })
// }


//render sign in page
module.exports.signin = function (req, res) {
    return res.render('user_signin', {
        title: "signin form"
    })
}


//get the sign in data
module.exports.createSession = function (req, res) {
    var User = helper.setDb(req.body.user_type);

    console.log(req.body);
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing in'); return }
        // handle user found
        if (user) {

            // handle password which doesn't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }

            // handle session creation


            res.cookie('obj_id', user._id);
            res.cookie('user_type', req.body.user_type)
            return res.redirect('/users/home');

        } else {
            // handle user not found

            return res.redirect('back');
        }
    });
}


//signout
module.exports.signout = function (req, res) {
    res.clearCookie("user_type");
    res.clearCookie("obj_id");

    return res.redirect('/users/signin');
}

module.exports.home = function (req, res) {

    //Set the user database
    // Courses.insertMany({
    //     "active" : true,
    // "credits" : 4,
    // "sem_no" : 4,
    // "student_year" : 2,
    // "course_id" : "65342",
    // "name" : "Networkiing",
    // "teacher_id" : "16103082",
    // "department_name" : "CSE"});

    var obj_id = req.cookies.obj_id;

    var User = helper.setDb(req.cookies.user_type);

    //Find the user
    User.findOne({ _id: obj_id }, async function (err, user) {
        if (err) { console.log('error in finding the user'); return }

        if (user) {

            var courses = [];
            var coursesActive = [];
            var coursesInActive = [];

            //Set the list for what courses a student is enrolled in
            courses = await helper.courseData(req.cookies.user_type, user.id);
            console.log(courses);
            await helper.setTeacherName(req.cookies.user_type, user.name, courses);

            var la = await helper.courseSet(req.cookies.user_type, user.id, courses, coursesActive, coursesInActive);
            coursesActive = la[0];
            coursesInActive = la[1];

            return res.render('home', {
                id: user.id,
                email: user.email,
                name: user.name,
                phone_no: user.phone_no,
                department_name: user.department_name,
                coursesActive: coursesActive,
                courses: courses,
                user_type: req.cookies.user_type
            });

        } else {
            // handle user not found
            res.cookie('obj_id', "blah");
            return res.redirect('/users/signin');
        }

    })

}

module.exports.profile = function (req, res) {
    var obj_id = req.cookies.obj_id;

    var User = helper.setDb(req.cookies.user_type);

    //Find the user
    User.findOne({ _id: obj_id }, function (err, user) {
        if (err) { console.log('error in finding the user'); return }

        if (user) {

            return res.render('profile', {
                id: user.id,
                email: user.email,
                name: user.name,
                phone_no: user.phone_no,
                department_name: user.department_name
            });
        } else {
            // handle user not found
            res.cookie('obj_id', "blah");
            return res.redirect('/users/signin');
        }

    });

}
module.exports.edit_profile = async function (req, res) {
    console.log(req.body);
    var User = helper.setDb(req.cookies.user_type);
    var obj_id = req.cookies.obj_id;

    await User.updateOne({ _id: obj_id, password: req.body.password },
        {
            name: req.body.name,
            phone_no: req.body.phone_no
        });
    return res.redirect('/users/home');


}
module.exports.form = function (req, res) {
    console.log(req.query);

    var User = helper.setDb('0');
    var obj_id = req.cookies.obj_id;

    User.findOne({ _id: obj_id }, function (err, user) {
        if (err) { console.log('error in finding the user'); return }

        if (user) {
            if (helper.form_filled(req.query.id, req.query.tid, user.id)) {
                return res.redirect("/users/signin");
            }
            return res.render('form1', {
                title: "Feedback form",
                student_name: user.name,
                course_name: req.query.cname,
                teacher_name: req.query.tname,
                teacher_id: req.query.tid,
                course_id: req.query.id,
                student_id: user.id,
                quesArr: ques
            })
        } else {
            // handle user not found
            res.cookie('obj_id', "blah");
            return res.redirect('/users/signin');
        }

    });

}


module.exports.form_teacher = async function (req, res) {
    var User = helper.setDb('1');
    // console.log(re.query);
    var data = await FilledForm.find({
        course_id: req.query.id,
        teacher_id: req.query.tid
    }, { responses: 1, _id: 0 });

    var qarr = [];
    console.log(data);

    var arr = Array(ques.length - 1).fill().map(() => Array(ques[0].options.length).fill(0))
    for (var i = 0; i < ques[0].options.length; i++) {

        qarr[i] = ques[0].options[i].value;

    }

    for (var i = 0; i < data.length; i++) {

        var x = data[i].responses;
        // console.log(x);
        for (var j = 0; j < x.length; j++) {

            arr[j][qarr.indexOf(x[j])] += 1;

        }

    }
    for (var i = 0; i < arr.length; i++) {
        var sum = arr[i].reduce((a, b) => a + b, 0);
        for (var j = 0; j < arr[i].length; j++) {
            arr[i][j] *= 100 / sum;
            arr[i][j] = Number(arr[i][j].toFixed(2));
            // arr[i][j]+="%";
        }
    }
    var gg = { "res": arr };
    console.log(gg);



    //Ayush
    console.log(req.query);

    var User = helper.setDb('1');
    var obj_id = req.cookies.obj_id;

    User.findOne({ _id: obj_id }, function (err, user) {
        if (err) { console.log('error in finding the user'); return }

        if (user) {

            return res.render('formT', {
                title: "Feedback Result",
                course_name: req.query.cname,
                teacher_name: req.query.tname,
                teacher_id: req.query.tid,
                course_id: req.query.id,
                quesArr: ques,
                respArr: gg
            })
        } else {
            // handle user not found
            res.cookie('obj_id', "blah");
            return res.redirect('/users/signin');
        }
    });
    // console.log(req.query);
}

//Submit form
module.exports.submit_form = function (req, res) {

    var statements = [];
    for (var i = 1; i < ques.length; i++) {
        statements.push(ques[i].statement);
    }
    req.body.ques = statements;
    req.body.current_year = new Date().getFullYear();
    console.log(req.body);

    FilledForm.create(req.body, function (err, user) {

        if (err) { console.log('error in signing up', err); return }
        console.log("Done");
        // return res.redirect('/users/signin')
    })
    return res.redirect("/users/form");
}

