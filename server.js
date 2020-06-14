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

  socket.on("addPlayer", (player) => {
    socketName = player.name;
    console.log("Player " + player.name + " Connected");
    id = player.id;
    io.emit("chat", globalChat);
  });

  socket.on("write", (text) => {
    globalChat.push([socketNames[id], text]);
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
      socketNames[id] = index;

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
    playersJson[socketNames[player.id]] = player;
  });

  socket.on("disconnect", () => {


    if (playersJson[socketNames[id]] != undefined) {

      var items = playersJson[socketNames[id]].items;


      console.log("Player " + socketNames[id] + " Disconnected");

      if (playersJson[socketNames[id]].weapon != null) {
        let weapon = playersJson[socketNames[id]].weapon;
        weapon.wearing = true;
        playersJson[socketNames[id]].items.push(weapon);
      }
      if (playersJson[socketNames[id]].armor != null) {
        let armor = playersJson[socketNames[id]].armor;
        armor.wearing = true;
        playersJson[socketNames[id]].items.push(armor);
      }

      if (playersJson[socketNames[id]].necklace != null) {
        let necklace = playersJson[socketNames[id]].necklace;
        necklace.wearing = true;
        playersJson[socketNames[id]].items.push(necklace);
      }
      if (playersJson[socketNames[id]].ring != null) {
        let ring = playersJson[socketNames[id]].ring;
        ring.wearing = true;
        playersJson[socketNames[id]].items.push(ring);
      }


      request.post("http://localhost:3000/players/update", {
        json: {
          login: playersJson[socketNames[id]].name,
          experience: playersJson[socketNames[id]].exp,
          expmulti: playersJson[socketNames[id]].expmulti,
          gold: playersJson[socketNames[id]].gold,
          strength: playersJson[socketNames[id]].strength,
          hpleft: playersJson[socketNames[id]].health,
          health: playersJson[socketNames[id]].hitPoints,
          speed: playersJson[socketNames[id]].speed,
          staminaleft: playersJson[socketNames[id]].staminaLeft,
          stamina: playersJson[socketNames[id]].stamina,
          luck: playersJson[socketNames[id]].luck,
          lvl: playersJson[socketNames[id]].level,
          dungeon_open: playersJson[socketNames[id]].dungeonsOpen,
          bp_str: playersJson[socketNames[id]].basePoints[0],
          bp_hp: playersJson[socketNames[id]].basePoints[1],
          bp_sp: playersJson[socketNames[id]].basePoints[2],
          bp_stam: playersJson[socketNames[id]].basePoints[3],
          bp_luck: playersJson[socketNames[id]].basePoints[4],
          d1: playersJson[socketNames[id]].subdungeon[0],
          d2: playersJson[socketNames[id]].subdungeon[1],
          d3: playersJson[socketNames[id]].subdungeon[2],
          d4: playersJson[socketNames[id]].subdungeon[3],
          d5: playersJson[socketNames[id]].subdungeon[4],
          d6: playersJson[socketNames[id]].subdungeon[5],
          d7: playersJson[socketNames[id]].subdungeon[6],
          d8: playersJson[socketNames[id]].subdungeon[7],
          d9: playersJson[socketNames[id]].subdungeon[8],
          d10: playersJson[socketNames[id]].subdungeon[9],
          d11: playersJson[socketNames[id]].subdungeon[10],
          d12: playersJson[socketNames[id]].subdungeon[11],
          d13: playersJson[socketNames[id]].subdungeon[12],
          d14: playersJson[socketNames[id]].subdungeon[13],
          d15: playersJson[socketNames[id]].subdungeon[14],
          d16: playersJson[socketNames[id]].subdungeon[15],
          d17: playersJson[socketNames[id]].subdungeon[16],
          d18: playersJson[socketNames[id]].subdungeon[17],
          d19: playersJson[socketNames[id]].subdungeon[18],
          items: items,
        }
      }, function (error, response, body) {
        if (error) {
          //console.log(error);
        }
      })


      delete playersJson[socketNames[id]];
      delete socketNames.id;
    }

  });
});

http.listen(port, function () {
  console.log("Server is running on port: " + port);
});
