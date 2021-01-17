const { DataTypes, Sequelize, Model } = require('sequelize');

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

module.exports = {
    Rarity,
    RarityAttribute
};