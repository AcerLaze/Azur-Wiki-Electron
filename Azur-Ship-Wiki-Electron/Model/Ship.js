const { DataTypes, Sequelize, Model } = require('sequelize');
const { ShipClass } = require('./ShipClass');
const { Faction } = require('./Faction');
const { ShipType } = require('./ShipType');

class Ship extends Model {
}

const ShipAttribute = {
    ShipId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    ShipName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'compositeIndex'
    },
    ShipCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: 'compositeIndex'
    },
    Health: {
        type: DataTypes.INTEGER,
    },
    Armour: {
        type: DataTypes.STRING(10),
    },
    Reload: {
        type: DataTypes.INTEGER,
    },
    Luck: {
        type: DataTypes.INTEGER,
    },
    Firepower: {
        type: DataTypes.INTEGER,
    },
    Torpedo: {
        type: DataTypes.INTEGER,
    },
    Evasion: {
        type: DataTypes.INTEGER,
    },
    Speed: {
        type: DataTypes.INTEGER,
    },
    AntiAir: {
        type: DataTypes.INTEGER,
    },
    Aviation: {
        type: DataTypes.INTEGER,
    },
    OilConsumtion: {
        type: DataTypes.INTEGER,
    },
    Accuracy: {
        type: DataTypes.INTEGER,
    },
    ASW: {
        type: DataTypes.INTEGER,
    },
    ConstructionTime: {
        type: DataTypes.STRING(15),
    },
    ShipClassId: {
        type: DataTypes.UUID,
        references: {
            model: ShipClass,
            key: 'ShipClassId'
        }
    },
    FactionId: {
        type: DataTypes.UUID,
        references: {
            model: Faction,
            key: 'FactionId'
        }
    },
    ShipTypeId: {
        type: DataTypes.UUID,
        references: {
            model: ShipType,
            key: 'ShipTypeId'
        }
    }
}

module.exports = {
    Ship,
    ShipAttribute
};