const { DataTypes, Sequelize, Model } = require('sequelize');

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

module.exports = {
    Faction,
    FactionAttribute
};