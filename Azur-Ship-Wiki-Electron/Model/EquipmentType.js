const { DataTypes, Sequelize, Model } = require('sequelize');
const config = require('./config.json').options;
const { sequelize } = require('./../Services/DB/DatabaseInterface');

class EquipmentType extends Model {
}

const EquipmentTypeAttribute = {
    EquipmentTypeId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    EquipmentTypeName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}

EquipmentType.init(EquipmentTypeAttribute, { ...config, sequelize })

module.exports = {
    EquipmentType,
    EquipmentTypeAttribute
};