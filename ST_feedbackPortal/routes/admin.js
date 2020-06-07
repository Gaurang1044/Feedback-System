const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin_controller');

router.get('/', adminController.idle);

router.get('/signin', adminController.signin);
router.get('/signout', adminController.signout);
router.post('/create-session', adminController.createSession);

router.get('/form-activate', adminController.form_activate);
router.get('/home', adminController.home);

router.post('/teacher-signup', adminController.teacherSignup);
router.post('/course-signup', adminController.courseSignup);
router.post('/student-signup', adminController.studentSignup);
router.post('/teacher-create', adminController.teacherCreate);
router.post('/course-create', adminController.courseCreate);
router.post('/student-create', adminController.studentCreate);

module.exports = router;