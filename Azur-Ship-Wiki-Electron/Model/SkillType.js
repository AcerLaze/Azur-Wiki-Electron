const { DataTypes, Sequelize, Model } = require('sequelize');

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

module.exports = {
    SkillType,
    SkillTypeAttribute
};