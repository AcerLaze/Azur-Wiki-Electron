const { DataTypes, Sequelize, Model } = require('sequelize');
const config = require('./config.json').options;
const { sequelize } = require('./../Services/DB/DatabaseInterface');
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

ShipSkillMapping.init(ShipSkillMappingAttribute, { ...config, sequelize })

module.exports = {
    ShipSkillMapping,
    ShipSkillMappingAttribute
};