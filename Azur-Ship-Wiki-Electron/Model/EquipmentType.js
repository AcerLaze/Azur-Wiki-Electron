const { DataTypes, Sequelize, Model } = require('sequelize');

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

module.exports = {
    EquipmentType,
    EquipmentTypeAttribute
};