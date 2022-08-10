
const express = require('express');

const authController=require('../controllers/auth');

const router = express.Router();


router.get('/login',authController.getLogin);


router.post('/login',authController.postLogin);

router.get('/signup', authController.getSignup);


router.get('/reset', authController.getReset);
router.post('/reset', authController.PostReset);



router.post('/signups', authController.postSignup);

router.get('/logout', authController.postLogout);// شغال بس بدون واجهة 

router.get('/reset/:token', authController.getNewPassword);


router.post('/new-password', authController.postNewPassword);
module.exports = router;