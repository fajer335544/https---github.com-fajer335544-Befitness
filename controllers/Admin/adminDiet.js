const { validationResult } = require('express-validator/check')
const Diet = require('../../model/Diet');
const ErrorApi = require('../error/ErrorApi');
const Api404Error = require('../error/api404Error');
const multer = require('multer');
///----------------------------------------  D I E T ------------------------------------------------------------
////////////////////////////////////////add new Diet//////////////////////////////////////////////
exports.postAddDiet = async (req, res, next) => {
    const dietName = req.body.dietName
    const dietType = req.body.dietType
    const fromDate = req.body.fromDate
    const toDate = req.body.toDate
    const image=req.file;
    //to check from request body is validate
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error.array()[0].msg)
        return res.status(422).json({ errors: error.array() });

    }
    const diet = await Diet.create({
        dietName: dietName,
        dietType: dietType,
        fromDate: fromDate,
        toDate: toDate,
        image:image
    }).then(() => {
        res.status(200).send('done');
    })
        .catch((err) => {
            next(ErrorApi.badRequest('food_id is required and must be non blank'))
            return;
        })

}
///////////////////////////////////////////////////////update DIIET ////////////////////////////////////
exports.EditDiet = (req, res, next) => {
    const deit_Id = req.params.id
    const updatedName = req.body.dietName;
    const updateddietType = req.body.dietType;
    const updatedfromDate = req.body.fromDate;
    const updatedtoDate = req.body.toDate;
    const updatedimage=req.file;
    //to check from request body is validate
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error.array()[0].msg)
        return res.status(422).json({ errors: error.array() });

    }
    Diet.findByPk(deit_Id)
        .then(diet => {
            diet.dietName = updatedName;
            diet.dietType = updateddietType;
            diet.fromDate = updatedfromDate;
            diet.toDate = updatedtoDate;
            diet.image=updatedimage;
            return diet.save();
        })
        .then(result => {
            res.status(200).send("diet update");
        })
        .catch(err => {
            next(ErrorApi.NOT_FOUND('Diet_id is not found'))
            return;
        });
}
//////////////////////////////////           delete Deit                 //////////////////////////////////
exports.postDeleteDiet = (req, res, next) => {
    const diet_id = req.params.id;


    Diet.destroy({
        where: { diet_id: diet_id },
    }).then(count => {
        if (!count) {
            return res.status(404).send({ error: 'No user' });
        }
        res.status(200).send('delete successfully');
        console.log(`delete food ID: ${diet_id} successfully`);
    })
        .catch((err) => {
            console.log('fodd notfound please try again');
            next(ErrorApi.NOT_FOUND(' something wrong ...'))
            return;
        })

}