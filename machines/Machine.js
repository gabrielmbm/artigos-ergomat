const Sequelize = require('sequelize');
const connection = require('../database/database');

const Machine = connection.define('machines', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Machine;