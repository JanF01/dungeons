const Sequelize = require("Sequelize")

const db = require("../database/db.js")

module.exports = db.sequelize.define(
  "player", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    login: {
      type: Sequelize.STRING(64),
    },
    email: {
      type: Sequelize.STRING(64),
    },
    password: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }, {
    timestamps: false,
  }
)
