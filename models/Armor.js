const Sequelize = require("Sequelize")

const db = require("../database/db.js")

const Armor = db.sequelize.define(
  "armor", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    player_id: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING(16)
    },
    name: {
      type: Sequelize.STRING
    },
    graphic: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING(9)
    },
    perks: {
      type: Sequelize.STRING(32)
    },
    cost: {
      type: Sequelize.MEDIUMINT
    },
    defence: {
      type: Sequelize.MEDIUMINT
    },
    chance: {
      type: Sequelize.TINYINT
    },
    state: {
      type: Sequelize.TINYINT
    },
    wearing: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    crystal_id: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }


  }, {
    timestamps: false,
  }


)



module.exports = Armor;
