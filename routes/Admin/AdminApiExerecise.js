const { check, body } = require("express-validator")
const AdminControllers = require('../../controllers/Admin/adminExercise');
const express = require('express');
const router = express.Router();
const Middleware = require('../../middleware/is-auth');
const multer = require('multer')
const path = require('path')
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})
// ////////////////////////////////////Exercises///////////////////////////////
 router.post('/addEX',imageUpload.single('image'),
 [

    body('exerciseName', 'please enter exerciseName ')
        .isLength({ min: 3 })
        .isAlpha()
    ,
    body('exerciseType', 'please enter exerciseType ')
        .isLength({ min: 3 })
        .isAlpha()
    
],
 AdminControllers.postAddExercise);
router.put('/updateEX/:id',[
    body('exerciseName', 'please enter exerciseName ')
    .isLength({ min: 3 })
        .isAlpha()
    ,
    body('exerciseType', 'please enter exerciseType ')
        .isLength({ min: 3 })
        .isAlpha()
    
], Middleware, AdminControllers.EditExercise);
router.delete('/deleteEX/:id', Middleware, AdminControllers.postDeleteExercise)

module.exports = router;
