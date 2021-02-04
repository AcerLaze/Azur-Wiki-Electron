const { DataTypes, Sequelize, Model } = require('sequelize');
const config = require('./config.json').options;
const { sequelize } = require('./../Services/DB/DatabaseInterface');

class ShipClass extends Model {
}

const ShipClassAttribute = {
    ShipClassId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    ShipClassName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}

ShipClass.init(ShipClassAttribute, { ...config, sequelize })

module.exports = {
    ShipClass,
    ShipClassAttribute
};