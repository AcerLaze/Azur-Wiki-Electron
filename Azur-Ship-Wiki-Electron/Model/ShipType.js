const { DataTypes, Sequelize, Model } = require('sequelize');

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

module.exports = {
    ShipType,
    ShipTypeAttribute
};