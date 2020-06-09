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
        res.send("User already exists")
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

module.exports = players;
