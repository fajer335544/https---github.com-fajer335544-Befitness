const { check, body } = require("express-validator")
const AdminControllers = require('../../controllers/Admin/adminDiet');
const express = require('express');
const router = express.Router();
const Middleware = require('../../middleware/is-auth');
////////////////////////////////////Diet///////////////////////////////
router.post('/addDiet', [

    body('dietName', 'please enter dietName ')
        .isLength({ min: 3 })
        .isAlpha()
    ,
    body('dietType', 'please enter dietType ')
        .isLength({ min: 3 })
        .isAlpha()
    
], AdminControllers.postAddDiet);
router.put('/updateD/:id', [

    body('dietName', 'please enter dietName ')
        .isLength({ min: 3 })
        .isAlpha()
    ,
    body('dietType', 'please enter dietType ')
        .isLength({ min: 3 })
        .isAlpha()
    
],Middleware, AdminControllers.EditDiet);
router.delete('/deleteDiet/:id', Middleware, AdminControllers.postDeleteDiet)

module.exports = router;
