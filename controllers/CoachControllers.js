const Coach = require('../model/Coach');
///////////////////////////////////////////GET ALL Diet/////
exports.getCoachs = async (req, res, next) => {
    const coachs = await Coach.findAll({ include: ["Diets"] });
    // console.log(diets.every(Diet => Diet instanceof diets));
    res.send(coachs)
    //console.log("All users:", JSON.stringify(users, null, 2));
};
//////////////////////////////////////GET FOOD TYPE meat////////////////
exports.getPowerlifting = async (req, res, next) => {
    const coachs = await Coach.findAll(
        { where: { TraningType: 'Powerlifting' } }
    );
    console.log(coachs.every(exercise => exercise instanceof Coach));
    res.send(coachs)
    //console.log("All users:", JSON.stringify(users, null, 2));
};
///////////////////////////////////////GET FOOD TYPE Fruit////////////////
exports.getBodybuilding = async (req, res, next) => {
    const coachs = await Coach.findAll(
        { where: { TraningType: 'Bodybuilding' } }
    );
    console.log(exercises.every(exercise => exercise instanceof Coach));
    res.send(coachs)
    //console.log("All users:", JSON.stringify(users, null, 2));
};
///////////////////////////////////////GET FOOD TYPE vegetabels////////////////
exports.getFitness = async (req, res, next) => {
    const coachs = await Coach.findAll(
        { where: { TraningType: 'Fitness' } }
    );
    console.log(coachs.every(exercise => exercise instanceof Coach));
    res.send(coachs)
    //console.log("All users:", JSON.stringify(users, null, 2));
};
