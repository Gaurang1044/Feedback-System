const express = require("express");
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/', userController.idle);

router.get('/profile', userController.profile);
router.post('/edit-profile', userController.edit_profile);

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.get('/signout', userController.signout);

router.post('/create', userController.create);
router.get('/home', userController.home);
router.post('/create-session', userController.createSession);

router.get('/form', function (req, res, next) {
    if (req.cookies.user_type == 0) { next(); }
    else { console.log("error hai bhia"); res.redirect('back'); }
}, userController.form);

router.get('/formT', function (req, res, next) {
    if (req.cookies.user_type == 1) { next(); }
    else { console.log("error hai bhia"); res.redirect('back'); }
}, userController.form_teacher);

router.post('/submit-form', userController.submit_form);

module.exports = router;