const { Sequelize } = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${process.env.APPDATA}/AzurWiki/database.sqlite`,
    logging: false
});

module.exports.sequelize = sequelize;
