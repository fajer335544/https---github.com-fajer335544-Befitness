const Sequelize = require('sequelize');
const sequelize = require('../utile/DataBase');

const User = sequelize.define('User', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    }
    ,
    userFirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    },

    phone: {
        type: Sequelize.STRING,
        allowNull: true,
        isNumeric: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Gender: {
        type: Sequelize.ENUM("female", "male"),
        defaultValue: "male",

    },
    date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    }
    ,
    coach_id:{
        type:Sequelize.INTEGER
    }

});



module.exports = User;