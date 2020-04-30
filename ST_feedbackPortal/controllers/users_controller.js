const Student = require('../models/students');
const Teacher = require('../models/teachers');
// const Dean = require('../models/dean');
// const DSA = require('../models/dsa');

const Courses = require("../models/courses")

var dept = ['Aerospace','Civil','CSE','ECE','Electrical','Mechanical','Mettalurgy','Production']


var setDb = function(user_type){
    var User;
    switch(user_type){
        case "0":
            User=Student;
                break;
        case "1":
            User=Teacher;
                break;
        case "2":
            // User=Dean;
            break;
        default:   
            var x=1; 
            
            // User=DSA;
    }
    return User;
}

var courseSet= function(user_type,sid,courses,coursesActive,coursesInActive)
{
    if(courses){
        for (var i=0;i<courses.length;i++)
        {
            if(courses[i].active)
            {
                if(user_type=='0'){
                    FilledForm.findOne({
                        student_id:sid,
                        course_id:courses[i].id
                        //current_year:Date
                    },function (err, form){
                            // console.log(sem,year,dept[de]);
                        
                            if(err){console.log('error in finding the course'); return}
                            
                            //If form has been filled and the course was active
                            if(form){
                                coursesInActive.push(courses[i]);
                            }
                            else{
                                coursesActive.push(courses[i]);
                            }
                        }
                    );
                }
                else{
                    coursesActive.push(courses[i]);
                }
                
            }
            else{
                coursesInActive.push(courses[i]);
            }
        }
    }
    else{
        coursesActive=courses.slice();
        coursesInActive=courses.slice();
    }

}

var courseData= function(user_type,sid,coursesArr)
{

    if(user_type==0)
    {
        var date= new Date();
        var add = 0;
        if(date.getMonth()>7)
            add=1; 
        var year = add + date.getFullYear() - (2000 + Math.floor(sid /1000000 ) );

        var sem = year*2 - add;
        var de = Math.floor(sid / 1000) % 10 -1 ;

        Courses.find({
                sem_no:sem,
                student_year: year,
                department_name: dept[de]
            
            },  function (err, courses){
                // console.log(sem,year,dept[de]);
            
                if(err){console.log('error in finding the course'); return}
                // console.log(courses);

                if(courses){
                    coursesArr = courses.slice();
                }
                else{
                    coursesArr=courses.slice();
                }
        });

    }
    else if(user_type ==1)
    {
        Courses.find({ 
            teacher_id:sid

        },function(err,courses){
            if(err){console.log('error in finding the course'); return}
                // console.log(courses);

                if(courses){
                    coursesArr = courses.slice();
                }
                else{
                    coursesArr=courses.slice();
                }
                
        });

    }
}



module.exports.profile = function(req , res){
    return res.end('user controller setup');
}

//render signup page
module.exports.signup = function(req , res){
    return res.render('user_signup' , {
        title: "signup form"
    })
}


module.exports.home = function(req , res){

    var obj_id = req.cookies.obj_id;
    
    //Set the user database
    var User = setDb(req.cookies.user_type);

    //Find the user
    User.findOne({_id:obj_id}, function(err,user){
        if(err){console.log('error in finding the user'); return}

        if (user){

            var courses =[]; 
            var coursesActive =[]; 
            var coursesInActive =[]; 
           
            //Set the list for what courses a student is enrolled in
            courseData(req.cookies.user_type,user.id,courses);
            courseSet(req.cookies.user_type,user.id,courses,coursesActive,coursesInActive);
            
                return res.render('home',{
                    id:user.id,
                    email:user.email,
                    name:user.name,
                    phone_no:user.phone_no,
                    department_name:user.department_name,
                    courses:courses
                });

        }else{
            // handle user not found
            res.cookie('obj_id', "blah");
            return res.redirect('/users/signin');
        }

    })

}

//render sign in page
module.exports.signin = function(req , res){
    return res.render('user_signin' , {
        title: "signin form"
    })
}

//get the sign up data
module.exports.create = function(req, res){
    // console.log("1");
    Student.findOne({email: req.body.email} , function(err ,user){
        if(err){console.log('error in signing up the user'); return}
        // console.log("2");
        if(!user){
            // console.log("3");

            Student.create(req.body , function(err , user){
                console.log(req.body);
                if(err){console.log('error in signing up the user'); return}
                console.log(req.body);

                return res.redirect('/users/signin')
            })   
        }
        else{

            return res.redirect('back')
        }
    })
}

//get the sign in data
module.exports.createSession = function(req, res){
    var User= setDb(req.body.user_type);
    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return}
        // handle user found
        if (user){
            console.log(user);
            // handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('obj_id', user._id);
            res.cookie('user_type',req.body.user_type)
            return res.redirect('/users/home');

        }else{
            // handle user not found

            return res.redirect('back');
        }
    });
}
ques = require('../models/ques');

module.exports.form = function(req , res){
    
    var User= setDb('0');
    var obj_id = req.cookies.obj_id;
    
    User.findOne({_id:obj_id}, function(err,user){
        if(err){console.log('error in finding the user'); return}

        if (user){

            // var courses =[]; 
            // courseData(req.cookies.user_type,user.id,courses);
            return res.render('form' , {
                title: "Feedback form",
                student_name: user.name,
                // course_name:
                // teacher_name:
                // course_id:
                student_id:user.id,
                quesArr:ques
            })
        }else{
            // handle user not found
            res.cookie('obj_id', "blah");
            return res.redirect('/users/signin');
        }

    });
    
    console.log(ques[0].options);   
}