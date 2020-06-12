const Sequelize = require("Sequelize")

const db = require("../database/db.js")

const Crystal = db.sequelize.define(
  "crystal", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    player_id: {
      type: Sequelize.INTEGER
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
    offset: {
      type: Sequelize.TINYINT
    },
    clas: {
      type: Sequelize.STRING(16)
    },
    amp: {
      type: Sequelize.STRING(9)
    },
    power: {
      type: Sequelize.FLOAT
    },
    wearing: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }



  }, {
    timestamps: false,
  }


)


module.exports = Crystal;
