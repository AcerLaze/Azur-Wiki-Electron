const { Sequelize } = require('sequelize')
const config = require('./config.json').options
require('dotenv').config();

const { Faction, FactionAttribute } = require('./../../Model/Faction');
const { Rarity, RarityAttribute } = require('./../../Model/Rarity');
const { EquipmentType, EquipmentTypeAttribute } = require('./../../Model/EquipmentType');
const { ShipClass, ShipClassAttribute } = require('./../../Model/ShipClass');
const { ShipType, ShipTypeAttribute } = require('./../../Model/ShipType');
const { Skill, SkillAttribute } = require('./../../Model/Skill');
const { SkillType, SkillTypeAttribute } = require('./../../Model/SkillType');
const { Ship, ShipAttribute } = require('./../../Model/Ship');
const { ShipEquipmentMapping, ShipEquipmentMappingAttribute } = require('./../../Model/ShipEquipmentMapping');
const { ShipSkillMapping, ShipSkillMappingAttribute } = require('./../../Model/ShipSkillMapping');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${process.env.APPDATA}/AzurWiki/database.sqlite`,
    logging: false,
    transactionType: 'IMMEDIATE'
});

function defineDatabase() {
    Faction.init(FactionAttribute, { ...config, sequelize })
    Rarity.init(RarityAttribute, { ...config, sequelize })
    SkillType.init(SkillTypeAttribute, { ...config, sequelize })
    Skill.init(SkillAttribute, { ...config, sequelize })
    ShipClass.init(ShipClassAttribute, { ...config, sequelize })
    ShipType.init(ShipTypeAttribute, { ...config, sequelize })
    EquipmentType.init(EquipmentTypeAttribute, { ...config, sequelize })
    Ship.init(ShipAttribute, { ...config, sequelize })
    ShipEquipmentMapping.init(ShipEquipmentMappingAttribute, { ...config, sequelize })
    ShipSkillMapping.init(ShipSkillMappingAttribute, { ...config, sequelize })
}

module.exports.initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        defineDatabase();
        sequelize.sync({
            alter: true,
            force: true
        })
        console.log('Database Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return '500'
    }
    return '200'
}
