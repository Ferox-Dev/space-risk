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

io.sockets.on('connection', function (socket) {

    joined++;
    SOCKET_LIST[socket.id] = socket;
    console.log("checksum")

    socket.on('disconnect', function () {
        joined--;
        delete SOCKET_LIST[socket.id];
    })

})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket}`)
});