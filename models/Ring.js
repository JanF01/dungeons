const Sequelize = require("Sequelize")

const db = require("../database/db.js")

const Ring = db.sequelize.define(
  "ring", {
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
    stamina: {
      type: Sequelize.MEDIUMINT
    },
    critM: {
      type: Sequelize.FLOAT
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


module.exports = Ring;
