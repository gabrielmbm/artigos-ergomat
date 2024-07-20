const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Article = connection.define('articlesProjetosespeciais', {
    article:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    exec:{
        type: Sequelize.STRING,
        allowNull: false
    },
    requester:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dpto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    release:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

// Article.sync({force: true});

module.exports = Article;