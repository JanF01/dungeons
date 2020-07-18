const express = require("express");
const players = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Player = require("../models/Player")
const Weapon = require("../models/Weapon")
const Armor = require("../models/Armor")
const Crystal = require("../models/Crystal")
const Necklace = require("../models/Necklace")
const Ring = require("../models/Ring")

players.use(cors());

process.env.SECRET_KEY = "secret";

//register



players.post("/register", (req, res) => {
  const today = new Date();
  const playerData = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    experience: 0,
    expmulti: 1,
    gold: 30,
    strength: 7,
    hpleft: 912,
    health: 912,
    speed: 3,
    staminaleft: 29,
    stamina: 40,
    luck: 0,
    lvl: 1,
    dungeon_open: 1,
    bp_str: 0,
    bp_hp: 0,
    bp_sp: 0,
    bp_stam: 0,
    bp_luck: 0,
    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
    d5: 0,
    d6: 0,
    d7: 0,
    d8: 0,
    d9: 0,
    d10: 0,
    d11: 0,
    d12: 0,
    d13: 0,
    d14: 0,
    d15: 0,
    d16: 0,
    d17: 0,
    d18: 0,
    d19: 0,
    d20: 0,
    created: today,
  };

  Player.findOne({
      where: {
        login: req.body.login,
      },
    })
    .then((player) => {
      if (!player) {
        let hash = bcrypt.hashSync(playerData.password, 10);
        playerData.password = hash;
        Player.create(playerData)
          .then((player) => {
            player.dataValues.id = player.null;
            let token = jwt.sign(player.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            res.json({
              token: token,
            });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.send("Nick already used");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

//login

players.post("/login", (req, res) => {
  const playerData = {
    login: req.body.login,
    password: req.body.password,
  };

  Player.findOne({
      where: {
        login: req.body.login,
      },
    })
    .then((player) => {
      if (player) {
        let pass = bcrypt.compareSync(req.body.password, player.password);

        if (pass) {
          let token = jwt.sign(player.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.json({
            token: token,
          });
        } else {
          res.send("Wrong password");
        }
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

//getitems

players.post("/getitems", async function (req, res) {

  try {
    const playerData = {
      id: req.body.id,
    };

    const items = [];

    let Weapons = await Weapon.findAll({
      where: {
        player_id: playerData.id,
      }
    }).then(res => {
      for (let item of res) {
        items.push(item.dataValues);
      }
    })

    let Armors = await Armor.findAll({
      where: {
        player_id: playerData.id,
      }
    }).then(res => {
      for (let item of res) {
        items.push(item.dataValues);
      }
    })

    let Necklaces = await Necklace.findAll({
      where: {
        player_id: playerData.id,
      }
    }).then(res => {
      for (let item of res) {
        items.push(item.dataValues);
      }
    })

    let Rings = await Ring.findAll({
      where: {
        player_id: playerData.id,
      }
    }).then(res => {
      for (let item of res) {
        items.push(item.dataValues);
      }
    })


    let Crystals = await Crystal.findAll({
      where: {
        player_id: playerData.id,
      }
    }).then(res => {
      for (let item of res) {
        items.push(item.dataValues);
      }
    })


    res.send(items);

  } catch (err) {

  }



});

// update

players.post("/update", async function (req, res) {

  try {
    const playerData = {
      login: req.body.login,
      experience: req.body.experience,
      expmulti: req.body.expmulti,
      gold: req.body.gold,
      strength: req.body.strength,
      hpleft: req.body.hpleft,
      health: req.body.health,
      speed: req.body.speed,
      staminaleft: req.body.staminaLeft,
      stamina: req.body.stamina,
      luck: req.body.luck,
      lvl: req.body.lvl,
      dungeon_open: req.body.dungeon_open,
      bp_str: req.body.bp_str,
      bp_hp: req.body.bp_hp,
      bp_sp: req.body.bp_sp,
      bp_stam: req.body.bp_stam,
      bp_luck: req.body.bp_luck,
      d1: req.body.d1,
      d2: req.body.d2,
      d3: req.body.d3,
      d4: req.body.d4,
      d5: req.body.d5,
      d6: req.body.d6,
      d7: req.body.d7,
      d8: req.body.d8,
      d9: req.body.d9,
      d10: req.body.d10,
      d11: req.body.d11,
      d12: req.body.d12,
      d13: req.body.d13,
      d14: req.body.d14,
      d15: req.body.d15,
      d16: req.body.d16,
      d17: req.body.d17,
      d18: req.body.d18,
      d19: req.body.d19,
      d20: req.body.d20,
      items: req.body.items
    };

    const result = await Player.update({
        experience: playerData.experience,
        expmulti: playerData.expmulti,
        gold: playerData.gold,
        strength: playerData.strength,
        hpleft: playerData.hpleft,
        health: playerData.health,
        speed: playerData.speed,
        staminaleft: playerData.staminaleft,
        stamina: playerData.stamina,
        luck: playerData.luck,
        lvl: playerData.lvl,
        dungeon_open: playerData.dungeon_open,
        bp_str: playerData.bp_str,
        bp_hp: playerData.bp_hp,
        bp_sp: playerData.bp_sp,
        bp_stam: playerData.bp_stam,
        bp_luck: playerData.bp_luck,
        d1: playerData.d1,
        d2: playerData.d2,
        d3: playerData.d3,
        d4: playerData.d4,
        d5: playerData.d5,
        d6: playerData.d6,
        d7: playerData.d7,
        d8: playerData.d8,
        d9: playerData.d9,
        d10: playerData.d10,
        d11: playerData.d11,
        d12: playerData.d12,
        d13: playerData.d13,
        d14: playerData.d14,
        d15: playerData.d15,
        d16: playerData.d16,
        d17: playerData.d17,
        d18: playerData.d18,
        d19: playerData.d19,
        d20: playerData.d20
      }, {
        where: {
          login: playerData.login,
        },
      })
      .then(async function (res) {



        if (playerData.items.length > 0) {


          const destroyedWeapon = Weapon.destroy({
            where: {
              player_id: playerData.items[0].player_id,
            }
          }).then((res) => {});

          const destroyedArmor = Armor.destroy({
            where: {
              player_id: playerData.items[0].player_id,
            }
          }).then((res) => {});

          const destroyedNecklace = Necklace.destroy({
            where: {
              player_id: playerData.items[0].player_id,
            }
          }).then((res) => {});

          const destroyedRing = Ring.destroy({
            where: {
              player_id: playerData.items[0].player_id,
            }
          }).then((res) => {});

          const destroyedCrystal = Crystal.destroy({
            where: {
              player_id: playerData.items[0].player_id,
            }
          }).then((res) => {});




          for (var item of playerData.items) {



            if (item.gem != undefined) {
              item.gem.wearing = true;
              const newCrystal = await Crystal.create(item.gem).then(
                (res) => {
                  item.crystal_id = res.null;
                  if (item.defence != undefined) {
                    const newArmor = Armor.create(item).then(
                      (res) => {}, (err) => {
                        console.error(err);
                      })
                  } else if (item.damageLow != undefined) {
                    const newWeapon = Weapon.create(item).then(
                      (res) => {

                      }, (err) => {
                        console.error(err);
                      })
                  } else if (item.amp != undefined) {
                    const newCrystal = Crystal.create(item).then(
                      (res) => {
                        crystalid = res.null;
                      }, (err) => {
                        console.error(err);
                      })
                  } else if (item.critical != undefined) {
                    const newNecklace = Necklace.create(item).then(
                      (res) => {

                      }, (err) => {
                        console.error(err);
                      })
                  } else if (item.critM != undefined) {
                    const newRing = Ring.create(item).then(
                      (res) => {

                      }, (err) => {
                        console.error(err);
                      })
                  }
                }, (err) => {
                  console.error(err);
                })
            } else {
              if (item.defence != undefined) {
                const newArmor = Armor.create(item).then(
                  (res) => {}, (err) => {
                    console.error(err);
                  })
              } else if (item.damageLow != undefined) {
                const newWeapon = Weapon.create(item).then(
                  (res) => {

                  }, (err) => {
                    console.error(err);
                  })
              } else if (item.amp != undefined) {
                const newCrystal = Crystal.create(item).then(
                  (res) => {
                    crystalid = res.null;
                  }, (err) => {
                    console.error(err);
                  })
              } else if (item.critical != undefined) {
                const newNecklace = Necklace.create(item).then(
                  (res) => {

                  }, (err) => {
                    console.error(err);
                  })
              } else if (item.critM != undefined) {
                const newRing = Ring.create(item).then(
                  (res) => {

                  }, (err) => {
                    console.error(err);
                  })
              }
            }
          }
        }
      })
      .catch((err) => {
        res.send("There was an error: " + err);
      });


  } catch (err) {
    res.send("There was an error: " + err);
  }


});

//updatedungeon

players.post("/dungeonupdate", async function (req, res) {
  try {
    const playerData = {
      login: req.body.login,
      dungeon_open: req.body.dungeon_open,
      d1: req.body.d1,
      d2: req.body.d2,
      d3: req.body.d3,
      d4: req.body.d4,
      d5: req.body.d5,
      d6: req.body.d6,
      d7: req.body.d7,
      d8: req.body.d8,
      d9: req.body.d9,
      d10: req.body.d10,
      d11: req.body.d11,
      d12: req.body.d12,
      d13: req.body.d13,
      d14: req.body.d14,
      d15: req.body.d15,
      d16: req.body.d16,
      d17: req.body.d17,
      d18: req.body.d18,
      d19: req.body.d19,
      d20: req.body.d20,
    };

    const result = await Player.update({
        dungeon_open: playerData.dungeon_open,
        d1: playerData.d1,
        d2: req.body.d2,
        d3: req.body.d3,
        d4: req.body.d4,
        d5: req.body.d5,
        d6: req.body.d6,
        d7: req.body.d7,
        d8: req.body.d8,
        d9: req.body.d9,
        d10: req.body.d10,
        d11: req.body.d11,
        d12: req.body.d12,
        d13: req.body.d13,
        d14: req.body.d14,
        d15: req.body.d15,
        d16: req.body.d16,
        d17: req.body.d17,
        d18: req.body.d18,
        d19: req.body.d19,
        d20: req.body.d20
      }, {
        where: {
          login: playerData.login,
        },
      })
      .then((res) => {})
      .catch((err) => {
        res.send("There was an error: " + err);
      });
  } catch (err) {
    res.send("There was an error: " + err);
  }
});

//getUpdated

players.post("/getupdated", (req, res) => {
  const playerData = {
    login: req.body.login,
  };

  Player.findOne({
      where: {
        login: req.body.login,
      },
    })
    .then((player) => {
      if (player) {
        let token = jwt.sign(player.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440,
        });
        res.json({
          token: token,
        });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = players;
