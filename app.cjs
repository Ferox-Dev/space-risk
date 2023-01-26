import start from './start.js';
import { planetNames } from './serverindex';
const express = require('express')
const app = express();
const serv = require('http').Server(app);

let SOCKET_LIST = [];
let PLAYER_LIST = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static(__dirname + '/client'));
serv.listen(4000, () => {
    console.log("server is running")
});

const io = require("socket.io")(serv, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let joined = 0;
let gameisrunning = false;

io.sockets.on('connection', function (socket) {

    joined++;
    SOCKET_LIST[socket.id] = socket;
    console.log("checksum")

    socket.on('disconnect', function () {
        joined--;
        delete SOCKET_LIST[socket.id];
    })

    if(joined == 2 && !gameisrunning) {
        gameisrunning = true;
        let shuffledPlanets = start(planetNames)
    }

})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket}`)
});