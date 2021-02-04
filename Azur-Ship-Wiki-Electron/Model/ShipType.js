const { DataTypes, Sequelize, Model } = require('sequelize');
const config = require('./config.json').options;
const { sequelize } = require('./../Services/DB/DatabaseInterface');

class ShipType extends Model {
}

const ShipTypeAttribute = {
    ShipTypeId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    ShipTypeName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Color: {
        type: DataTypes.STRING(10)
    }
}

ShipType.init(ShipTypeAttribute, { ...config, sequelize })

module.exports = {
    ShipType,
    ShipTypeAttribute
};