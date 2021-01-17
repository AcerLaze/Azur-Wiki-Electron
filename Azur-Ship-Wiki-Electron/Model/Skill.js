const { DataTypes, Sequelize, Model } = require('sequelize');
const { SkillType } = require('./SkillType')

class Skill extends Model {
}

const SkillAttribute = {
    SkillId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    SkillName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    SkillDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SkillTypeId: {
        type: DataTypes.UUID,
        references: {
            model: SkillType,
            key: 'SkillTypeId'
        }
    }
}

module.exports = {
    Skill,
    SkillAttribute
};