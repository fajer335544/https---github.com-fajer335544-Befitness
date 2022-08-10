const { check, body } = require("express-validator")
const AdminControllers = require('../../controllers/Admin/adminWorkout');
const express = require('express');
const router = express.Router();

const Middleware = require('../../middleware/is-auth');
// ////////////////////////////////////Workout///////////////////////////////
router.post('/addWorkout',[
  
    body('workOutType', 'please enter Type ')
        .isLength({ min: 3 })
        .isAlpha()
    ,


], Middleware, AdminControllers.postAddWorkout);
router.put('/updateWorkot/:id',[
  
    body('workOutType', 'please enter Type ')
        .isLength({ min: 3 })
        .isAlpha()


] ,Middleware, AdminControllers.EditWorkout);
router.delete('/deleteWorkout/:id', Middleware, AdminControllers.postDeleteWorkout)

module.exports = router;
