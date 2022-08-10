const sequelize = require('./DataBase');
const User = require('../model/User')
const Coach = require('../model/Coach')
const Diet = require('../model/Diet')
const Workout=require('../model/workout')
const Food=require('../model/food')
const Supplement=require('../model/Supplement')
const Exercise=require('../model/Exercise')

const Exercise_Workout= require('../model/Exercise_Workout');




// ///////---------------------Diet-Foods-------------------//
Food.belongsToMany(Diet, {
    through: "food-diets",
    as: "Diets",
    foreignKey: "food_id",
});
Diet.belongsToMany(Food, {
    through: "food-diets",
    as: "Foods",
    foreignKey: "diet_id",
});
// ///////---------------------Diet-Supplements-------------------//
Supplement.belongsToMany(Diet, {
    through: "supp_diet",
    as: "diet",
    foreignKey: "sup_id",
});
Diet.belongsToMany(Supplement, {
    through: "supp_diet",
    as: "Supplements",
    foreignKey: "diet_id",
});
// //------------------------------Exercise-workout------------------//


Workout.belongsToMany(Exercise, {
    through: Exercise_Workout
   
});
Exercise.belongsToMany(Workout, {
    through: Exercise_Workout
    
});

// // //-------------------1 Diet M users----------------//
// User.belongsTo(Diet, {
//     foreignKey: "d_id",
//     as: "d",
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT'
// });
// Diet.hasMany(User, { as: "Client" });
// // //--------------------1Coach M Users--------------//
Coach.hasMany(Workout);
Workout.belongsTo(Coach);








// Coach.hasMany(Diet, { as: "Diets" });
// Diet.belongsTo(Coach);

// Coach.hasMany(User, { as: "Client" });
// User.belongsTo(Coach);
sequelize
.sync()
   // .sync({ focus: true })//delete all old data in my database and rebuild it
/////////////////////////////////////////////////////////////////////////////////////
