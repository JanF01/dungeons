var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
const {
  connection
} = require("websocket");
const http = require("http").Server(app);
const io = require("socket.io")(http);

const request = require("request");
const rp = require("request-promise");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var Players = require("./routes/Players");

app.use("/players", Players);

var playersJson = {};
var socketNames = {};

var globalChat = [

]

io.on("connection", (socket) => {
  var id = 0;
  var inFight = '';

  socket.on("addPlayer", (player) => {
    console.log("Player " + player.name + " Connected");
    id = player.id;
    io.emit("chat", globalChat);
  });

  socket.on("write", (text) => {
    globalChat.push([socketNames[socket.id], text]);
    io.emit("chat", globalChat);
  })

  socket.on("getNicks", () => {
    socket.emit("names", Object.values(playersJson));
  })

  socket.on("getItems", (player) => {

    var options = {
      method: 'POST',
      url: 'http://localhost:3000/players/getitems',
      headers: {
        'Connection': 'keep-alive',
      },
      body: {
        id: id
      },
      json: true,
      grip: true

    }
    rp(options).then((res) => {
      let index = player.name;
      playersJson[index] = player;
      id = player.id;
      socketNames[socket.id] = index;

      playersJson[index].items = res;

      io.emit("names", Object.values(playersJson));

      socket.emit("items", playersJson[index].items);
    }, (err) => {
      //  console.error(err);
    });


  })

  socket.on("getPlayer", (nick) => {
    socket.emit("player", playersJson[nick]);
  });

  socket.on("updatePlayer", (player) => {
    playersJson[socketNames[socket.id]] = player;
  });

  socket.on("challenge", (player) => {

    let names = Object.values(socketNames);
    let ids = Object.keys(socketNames);
    let target = names.indexOf(player.name);
    inFight = ids[target];

    io.to(inFight).emit("challenger", playersJson[socketNames[socket.id]]);
  })

  socket.on("sendDmg", (dmgList) => {
    console.log(dmgList);
    io.to(inFight).emit("dmg", dmgList);
  })

  socket.on("confirm", (name) => {

    let names = Object.values(socketNames);
    let ids = Object.keys(socketNames);
    let target = names.indexOf(name);
    inFight = ids[target];

    io.to(ids[target]).emit("confirm", true);
  })

  socket.on("disconnect", () => {


    if (playersJson[socketNames[socket.id]] != undefined) {

      var items = playersJson[socketNames[socket.id]].items;


      console.log(playersJson[socketNames[socket.id]]);
      console.log(socketNames[socket.id]);

      console.log("Player " + socketNames[socket.id] + " Disconnected");

      if (playersJson[socketNames[socket.id]].weapon != null) {
        let weapon = playersJson[socketNames[socket.id]].weapon;
        weapon.wearing = true;
        playersJson[socketNames[socket.id]].items.push(weapon);
      }
      if (playersJson[socketNames[socket.id]].armor != null) {
        let armor = playersJson[socketNames[socket.id]].armor;
        armor.wearing = true;
        playersJson[socketNames[socket.id]].items.push(armor);
      }

      if (playersJson[socketNames[socket.id]].necklace != null) {
        let necklace = playersJson[socketNames[socket.id]].necklace;
        necklace.wearing = true;
        playersJson[socketNames[socket.id]].items.push(necklace);
      }

      if (playersJson[socketNames[socket.id]].ring != null) {
        let ring = playersJson[socketNames[socket.id]].ring;
        ring.wearing = true;
        playersJson[socketNames[socket.id]].items.push(ring);
      }


      request.post("http://localhost:3000/players/update", {
        json: {
          login: playersJson[socketNames[socket.id]].name,
          experience: playersJson[socketNames[socket.id]].exp,
          expmulti: playersJson[socketNames[socket.id]].expmulti,
          gold: playersJson[socketNames[socket.id]].gold,
          strength: playersJson[socketNames[socket.id]].strength,
          hpleft: playersJson[socketNames[socket.id]].health,
          health: playersJson[socketNames[socket.id]].hitPoints,
          speed: playersJson[socketNames[socket.id]].speed,
          staminaleft: playersJson[socketNames[socket.id]].staminaLeft,
          stamina: playersJson[socketNames[socket.id]].stamina,
          luck: playersJson[socketNames[socket.id]].luck,
          lvl: playersJson[socketNames[socket.id]].level,
          dungeon_open: playersJson[socketNames[socket.id]].dungeonsOpen,
          bp_str: playersJson[socketNames[socket.id]].basePoints[0],
          bp_hp: playersJson[socketNames[socket.id]].basePoints[1],
          bp_sp: playersJson[socketNames[socket.id]].basePoints[2],
          bp_stam: playersJson[socketNames[socket.id]].basePoints[3],
          bp_luck: playersJson[socketNames[socket.id]].basePoints[4],
          d1: playersJson[socketNames[socket.id]].subdungeon[0],
          d2: playersJson[socketNames[socket.id]].subdungeon[1],
          d3: playersJson[socketNames[socket.id]].subdungeon[2],
          d4: playersJson[socketNames[socket.id]].subdungeon[3],
          d5: playersJson[socketNames[socket.id]].subdungeon[4],
          d6: playersJson[socketNames[socket.id]].subdungeon[5],
          d7: playersJson[socketNames[socket.id]].subdungeon[6],
          d8: playersJson[socketNames[socket.id]].subdungeon[7],
          d9: playersJson[socketNames[socket.id]].subdungeon[8],
          d10: playersJson[socketNames[socket.id]].subdungeon[9],
          d11: playersJson[socketNames[socket.id]].subdungeon[10],
          d12: playersJson[socketNames[socket.id]].subdungeon[11],
          d13: playersJson[socketNames[socket.id]].subdungeon[12],
          d14: playersJson[socketNames[socket.id]].subdungeon[13],
          d15: playersJson[socketNames[socket.id]].subdungeon[14],
          d16: playersJson[socketNames[socket.id]].subdungeon[15],
          d17: playersJson[socketNames[socket.id]].subdungeon[16],
          d18: playersJson[socketNames[socket.id]].subdungeon[17],
          d19: playersJson[socketNames[socket.id]].subdungeon[18],
          items: items,
        }
      }, function (error, response, body) {
        if (error) {
          //console.log(error);
        }
      })


      delete playersJson[socketNames[socket.id]];
      delete socketNames[socket.id];
    }

  });
});

http.listen(port, function () {
  console.log("Server is running on port: " + port);
});
