const express = require('express')
const app = express();
const serv = require('http').Server(app);

let joined = 0;
let gameisrunning = false;
let ready = 0;
let playerReady = "";
let playerMove = "";
let turn = "placeTroops";

let players = [{
    id: "",
    territories: 0,
    troops: 40
},
{
    id: "",
    territories: 0,
    troops: 40
}]

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
        origin: "http://107.191.50.159:4000/"
    }
});

let system1 = [
    {
        planet: "sun",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "venus",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "earth",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "saturn",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "jupiter",
        claimed: "",
        troopcount: 0
    }
];

let system2 = [
    {
        planet: "sunner",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "penutt",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "chese",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "kyoob",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "tulia",
        claimed: "",
        troopcount: 0
    }
];

let system3 = [
    {
        planet: "banasun",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "george",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "lennie",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "nrutas",
        claimed: "",
        troopcount: 0
    },
];

let system4 = [
    {
        planet: "lun",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "haf",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "fotbal",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "apolle",
        claimed: "",
        troopcount: 0
    },
];

let system5 = [
    {
        planet: "smun",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "pairr",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "cooki",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "isars",
        claimed: "",
        troopcount: 0
    },
];

let system6 = [
    {
        planet: "potunto",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "eg",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "enolla",
        claimed: "",
        troopcount: 0
    },
    {
        planet: "vabos",
        claimed: "",
        troopcount: 0
    },
];

let planetsArray = system1.concat(system2, system3, system4, system5, system6);

function planetNameCollector(name) {
    let planetNameArray = [];
    planetsArray.forEach(object => {
        planetNameArray.push(object[name]);
    })
    return planetNameArray;
}

let planetNames = planetNameCollector("planet");

function start(planetNames) {

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    let shuffledPlanets = shuffleArray(planetNames);
    return shuffledPlanets;
}

io.sockets.on('connection', (socket) => {

    if (!gameisrunning) {

        SOCKET_LIST[joined] = socket;
        joined++;
        console.log(joined);

        if (joined == 1 && !gameisrunning) {
            players[0].id = socket.id;
            socket.emit("connected", "blue", players[0]);
        } else if (joined == 2 && !gameisrunning) {
            players[1].id = socket.id;
            socket.emit("connected", "red", players[1]);
        }

        socket.on('disconnect', () => {
            joined--;
            console.log(joined);
            // delete SOCKET_LIST[joined];
            // let idIndex = players.findIndex(item => item.id == socket.id)
            // delete players[idIndex].id;
        })

        if (joined == 2 && !gameisrunning) {
            io.emit("readyButton")
        }

        if (joined > 2 && (SOCKET_LIST[0] != socket || SOCKET_LIST[1] != socket)) {
            socket.emit("screenHide");
        }

        socket.on("playerReady", (player) => {

            if (playerReady != player) {
                ready++;
            }

            playerReady = player;

            if (ready == 2) {
                gameisrunning = true;
                let shuffledPlanets = start(planetNames)

                for (let i = 0; i < shuffledPlanets.length; i++) {

                    let index = planetsArray.find(item => item.planet == shuffledPlanets[i]);

                    if (i % 2 == 0) {
                        index.claimed = "blue";
                        index.troopcount = 1;
                        players[0].troops--;
                    } else {
                        index.claimed = "red";
                        index.troopcount = 1;
                        players[1].troops--;
                    }
                }
                let Jsonplanets = JSON.stringify(planetsArray);
                io.emit("planetColourAssign", { shuffledPlanets, Jsonplanets });
                SOCKET_LIST[0].emit("turn", turn, players[0], Jsonplanets, screen);
            }
        })
    }

    socket.on("move", (data) => {
        if (gameisrunning && (SOCKET_LIST[0] == socket || SOCKET_LIST[1] == socket)) {
            if (socket == SOCKET_LIST[0]) {
                players[0] = data.player;
                screen = data.screen;
                Jsonplanets = JSON.stringify(planetsArray);
                SOCKET_LIST[1].emit("turn", turn, players[1], Jsonplanets, screen);
            } else if (socket == SOCKET_LIST[1]) {
                players[1] = data.player;
                screen = data.screen;
                if (turn == "placeTroops") {
                    turn = "attack";
                } else if (turn == "attack") {
                    turn = "moveTroops";
                } else if (turn == "moveTroops") {
                    turn = "placeTroops";
                }
                Jsonplanets = JSON.stringify(planetsArray);
                SOCKET_LIST[0].emit("turn", turn, players[0], Jsonplanets, screen);
            }
        }
    })

    socket.on("clicked", () => {
        let JsonPlanets = JSON.stringify(planetsArray)
        socket.emit("planets", JsonPlanets);
    })

    if (gameisrunning && (SOCKET_LIST[0] != socket || SOCKET_LIST[1] != socket)) {
        socket.emit("screenHide");
    }

    socket.on("planetcolorcheck", () => {
        console.log("1")
        systemscombined = system1.concat(system2, system3, system4, system5, system6);
        socket.emit("planetsearched", systemscombined);
    })

})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
});
