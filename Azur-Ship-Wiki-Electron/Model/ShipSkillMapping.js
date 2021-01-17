const { DataTypes, Sequelize, Model } = require('sequelize');
const { Ship } = require('./Ship');
const { Skill } = require('./Skill');

class ShipSkillMapping extends Model {
}

const ShipSkillMappingAttribute = {
    ShipSkillMappingId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    ShipId: {
        type: DataTypes.UUID,
        references: {
            model: Ship,
            key: 'ShipId'
        }
    },
    SkillId: {
        type: DataTypes.UUID,
        references: {
            model: Skill,
            key: 'SkillId'
        }
    }
}

module.exports = {
    ShipSkillMapping,
    ShipSkillMappingAttribute
};