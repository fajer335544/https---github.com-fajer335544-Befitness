
const Sequelize = require('sequelize');
const sequelize = require('../utile/DataBase');



const Exercise_Workout = sequelize.define('exercise_workout', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },


  Exercise_Id: {
    type: Sequelize.INTEGER,
   
    foreignKey: {
        name: 'exercise_id'
      }
   
    
  },
  Workout_Id: {
    type: Sequelize.INTEGER,
   

    foreignKey: {
        name: 'workout_id'
      },
    allowNull: false
  },

  Day:
  {
    type: Sequelize.STRING
  }
});
   


module.exports = Exercise_Workout


