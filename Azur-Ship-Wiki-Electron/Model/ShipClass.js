const { DataTypes, Sequelize, Model } = require('sequelize');

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

module.exports = {
    ShipClass,
    ShipClassAttribute
};