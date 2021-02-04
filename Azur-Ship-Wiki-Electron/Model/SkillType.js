const { DataTypes, Sequelize, Model } = require('sequelize');
const config = require('./config.json').options;
const { sequelize } = require('./../Services/DB/DatabaseInterface');

class SkillType extends Model {
}

const SkillTypeAttribute = {
    SkillTypeId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    SkillTypeName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Color: {
        type: DataTypes.STRING(10)
    }
}

SkillType.init(SkillTypeAttribute, { ...config, sequelize })

module.exports = {
    SkillType,
    SkillTypeAttribute
};