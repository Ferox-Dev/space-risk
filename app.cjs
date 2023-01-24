const express = require('express')
const app = express();
const serv = require('http').Server(app);

let SOCKET_LIST = [];
let PLAYER_LIST = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static(__dirname + '/client'));
serv.listen(4000);
console.log("srvstrt")

const io = require("socket.io")(serv, {});
io.sockets.on('connection', function (socket) {

    SOCKET_LIST[socket.id] = socket;

    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id]
    })

})

