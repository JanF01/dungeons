const Sequelize = require("Sequelize")

const db = require("../database/db.js")

const Weapon = require("./Weapon");
const Armor = require("./Armor");
const Crystal = require("./Crystal");
const Necklace = require("./Necklace");
const Ring = require("./Ring");

const Player = db.sequelize.define(
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
    experience: {
      type: Sequelize.INTEGER,
    },
    expmulti: {
      type: Sequelize.FLOAT,
    },
    gold: {
      type: Sequelize.MEDIUMINT,
    },
    strength: {
      type: Sequelize.SMALLINT,
    },
    hpleft: {
      type: Sequelize.MEDIUMINT,
    },
    health: {
      type: Sequelize.MEDIUMINT,
    },
    speed: {
      type: Sequelize.SMALLINT,
    },
    staminaleft: {
      type: Sequelize.MEDIUMINT,
    },
    stamina: {
      type: Sequelize.MEDIUMINT,
    },
    luck: {
      type: Sequelize.SMALLINT,
    },
    lvl: {
      type: Sequelize.SMALLINT,
    },
    dungeon_open: {
      type: Sequelize.SMALLINT,
    },
    bp_str: {
      type: Sequelize.SMALLINT,
    },
    bp_hp: {
      type: Sequelize.MEDIUMINT,
    },
    bp_sp: {
      type: Sequelize.SMALLINT,
    },
    bp_stam: {
      type: Sequelize.SMALLINT,
    },
    bp_luck: {
      type: Sequelize.SMALLINT,
    },
    d1: {
      type: Sequelize.SMALLINT,
    },
    d2: {
      type: Sequelize.SMALLINT,
    },
    d3: {
      type: Sequelize.SMALLINT,
    },
    d4: {
      type: Sequelize.SMALLINT,
    },
    d5: {
      type: Sequelize.SMALLINT,
    },
    d6: {
      type: Sequelize.SMALLINT,
    },
    d7: {
      type: Sequelize.SMALLINT,
    },
    d8: {
      type: Sequelize.SMALLINT,
    },
    d9: {
      type: Sequelize.SMALLINT,
    },
    d10: {
      type: Sequelize.SMALLINT,
    },
    d11: {
      type: Sequelize.SMALLINT,
    },
    d12: {
      type: Sequelize.SMALLINT,
    },
    d13: {
      type: Sequelize.SMALLINT,
    },
    d14: {
      type: Sequelize.SMALLINT,
    },
    d15: {
      type: Sequelize.SMALLINT,
    },
    d16: {
      type: Sequelize.SMALLINT,
    },
    d17: {
      type: Sequelize.SMALLINT,
    },
    d18: {
      type: Sequelize.SMALLINT,
    },
    d19: {
      type: Sequelize.SMALLINT,
    },
    d20: {
      type: Sequelize.SMALLINT,
    },
  }, {
    timestamps: false,
  }
)



module.exports = Player;
