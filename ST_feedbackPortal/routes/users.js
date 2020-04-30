const express = require("express");
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/profile' , userController.profile);
router.get('/signup' , userController.signup);
router.get('/signin' , userController.signin);

router.post('/create' , userController.create);
router.get('/home' , userController.home);
router.post('/create-session' , userController.createSession);
router.get('/form' , userController.form);

module.exports = router;