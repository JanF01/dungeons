const express = require("express");
const players = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const Player = require("../models/Player");
players.use(cors());


process.env.SECRET_KEY = "secret";



//register


players.post('/register', (req, res) => {
  const today = new Date();
  const playerData = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    experience: 0,
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
    created: today



  }

  Player.findOne({
      where: {
        login: req.body.login
      }
    })
    .then(player => {
      if (!player) {
        let hash = bcrypt.hashSync(playerData.password, 10)
        playerData.password = hash
        Player.create(playerData)
          .then(player => {
            let token = jwt.sign(player.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({
              token: token
            })
          })
          .catch(err => {
            res.send("error: " + err)
          })
      } else {
        res.send("Nick already used")
      }
    })
    .catch(err => {
      res.send("error: " + err)
    })

})

//login

players.post('/login', (req, res) => {
  const playerData = {
    login: req.body.login,
    password: req.body.password
  }

  Player.findOne({
      where: {
        login: req.body.login
      }
    })
    .then(player => {
      if (player) {
        let pass = bcrypt.compareSync(req.body.password, player.password)

        if (pass) {
          let token = jwt.sign(player.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.json({
            token: token
          })
        } else {
          res.send("Wrong password")
        }
      } else {
        res.send("User does not exist")
      }
    })
    .catch(err => {
      res.send("error: " + err)
    })
})



// update

players.post('/update', (req, res) => {
  const playerData = {
    login: req.body.login,
    experience: req.body.experience,
    gold: req.body.gold,
    strength: req.body.strength,
    hpleft: req.body.hpleft,
    health: req.body.health,
    speed: req.body.speed,
    staminaleft: req.body.staminaLeft,
    stamina: req.body.stamina,
    luck: req.body.luck,
    bp_str: req.body.bp_str,
    bp_hp: req.body.bp_hp,
    bp_sp: req.body.bp_sp,
    bp_stam: req.body.bp_stam,
    bp_luck: req.body.bp_luck,
    lvl: req.body.lvl
  }


  Player.update({
      experience: playerData.experience,
      gold: playerData.gold,
      strength: playerData.strength,
      hpleft: playerData.hpleft,
      health: playerData.health,
      speed: playerData.speed,
      staminaleft: playerData.staminaleft,
      stamina: playerData.stamina,
      luck: playerData.luck,
      lvl: playerData.lvl,
      bp_str: playerData.bp_str,
      bp_hp: playerData.bp_hp,
      bp_sp: playerData.bp_sp,
      bp_stam: playerData.bp_stam,
      bp_luck: playerData.bp_luck
    }, {
      where: {
        login: playerData.login
      }
    })
    .then(res => {

    })
    .catch(err => {
      res.send("There was an error: " + err)
    })



})

//updatedungeon

players.post('/dungeonupdate', (req, res) => {
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


  }


  Player.update({
      dungeon_open: playerData.dungeon_open,
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
    }, {
      where: {
        login: playerData.login,
      }
    })
    .then(res => {

    })
    .catch(err => {
      res.send("There was an error: " + err)
    })



})


//getUpdated

players.post('/getupdated', (req, res) => {
  const playerData = {
    login: req.body.login,
  }

  Player.findOne({
      where: {
        login: req.body.login
      }
    })
    .then(player => {
      if (player) {

        let token = jwt.sign(player.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({
          token: token
        })
      }
    })
    .catch(err => {
      res.send("error: " + err)
    })
})



module.exports = players;
