const Sequelize = require('sequelize');
const sequelize = require('../utile/DataBase');

const Diet = sequelize.define('diet', {
    diet_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dietName: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlphanumeric: true
    },
    dietType: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlphanumeric: true
    },
    fromDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    toDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    image:{
        type:Sequelize.STRING,
        allowNull:true
    }


});

module.exports = Diet;