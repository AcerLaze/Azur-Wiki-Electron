const { DataTypes, Sequelize, Model } = require('sequelize');
const config = require('./config.json').options;
const { sequelize } = require('./../Services/DB/DatabaseInterface');

class Faction extends Model {
}

const FactionAttribute = {
    FactionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    FactionName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Prefix: {
        type: DataTypes.STRING(5),
    },
    Belligerent: {
        type: DataTypes.STRING(50)
    }
}

Faction.init(FactionAttribute, { ...config, sequelize })

module.exports = {
    Faction,
    FactionAttribute
};