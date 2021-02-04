const { DataTypes, Sequelize, Model } = require('sequelize');
const config = require('./config.json').options;
const { sequelize } = require('./../Services/DB/DatabaseInterface');

class Rarity extends Model {
}

const RarityAttribute = {
    RarityId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    RarityName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Color: {
        type: DataTypes.STRING(50)
    }
}

Rarity.init(RarityAttribute, { ...config, sequelize })

module.exports = {
    Rarity,
    RarityAttribute
};