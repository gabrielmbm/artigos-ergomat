const Sequelize = require('sequelize');
const connection = new Sequelize('artigos_ergomat', 'root', 'Model2309!', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection