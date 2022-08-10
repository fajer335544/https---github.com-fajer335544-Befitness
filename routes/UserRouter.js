const gymControllers = require('../controllers/UserControllers');
const user = require('../model/User');
const express = require('express');
const router = express.Router();
////////////////////////////////////////////////////
router.get('/user', gymControllers.getUsers);
//router.post('/add', AdminControllers.postAddUser);



module.exports = router;