const express = require('express')
const app = express();
const serv = require('http').Server(app);

let joined = 0;
let gameisrunning = false;
let ready = 0;
let playerReady = "";
let turn = "placeTroops";
let gameTurn = 0;
let bluePlanets = 0;
let redPlanets = 0;
let winner = "";

let players = [{
    id: "",
    troops: 40
},
{
    id: "",
    troops: 40
}]

let SOCKET_LIST = [];

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
            let socketFind = SOCKET_LIST.findIndex(item => item == socket.id);
            SOCKET_LIST.slice(socketFind);
            console.log(SOCKET_LIST[0]);
            console.log(SOCKET_LIST[1]);
            // let idIndex = players.findIndex(item => item.id == socket.id)
            // delete players[idIndex].id;
            if(gameisrunning && joined < 2) {
                io.emit("disconnectedrestart")
                setTimeout(restart, 5000);
            }
        })

        if (joined == 2 && !gameisrunning) {
            io.emit("readyButton");
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
                        bluePlanets++;
                        index.claimed = "blue";
                        index.troopcount = 1;
                        players[0].troops--;
                    } else {
                        redPlanets++;
                        index.claimed = "red";
                        index.troopcount = 1;
                        players[1].troops--;
                    }
                }
                let Jsonplanets = JSON.stringify(planetsArray);
                io.emit("planetColourAssign", { shuffledPlanets, Jsonplanets });
                SOCKET_LIST[0].emit("turn", turn, players[0], Jsonplanets);
                SOCKET_LIST[1].emit("waitbox");
                SOCKET_LIST[0].emit("setup", gameTurn);
                SOCKET_LIST[1].emit("setup", gameTurn);
            }
        })
    }

    socket.on("turnChange", (data) => {
        if (gameisrunning && (SOCKET_LIST[0] == socket || SOCKET_LIST[1] == socket)) {
            if (socket == SOCKET_LIST[0]) {
                colour = "red";
                oppositeColour = "blue";
                players[0] = data.player;
                planetsArray = JSON.parse(data.jsonplanets);
                Jsonplanets = JSON.stringify(planetsArray);
                SOCKET_LIST[1].emit("turn", turn, players[1], Jsonplanets);
            } else if (socket == SOCKET_LIST[1]) {
                players[1] = data.player;
                if (turn == "placeTroops") {
                    turn = "attack";
                } else if (turn == "attack") {
                    turn = "placeTroops";
                    gameTurn++;
                    console.log("Turn: " + gameTurn);
                    SOCKET_LIST[0].emit("turnChange", gameTurn);
                    SOCKET_LIST[1].emit("turnChange", gameTurn);
                }
                if (gameTurn < 20) {
                    colour = "blue";
                    oppositeColour = "red";
                    planetsArray = JSON.parse(data.jsonplanets);
                    Jsonplanets = JSON.stringify(planetsArray);
                    SOCKET_LIST[0].emit("turn", turn, players[0], Jsonplanets);
                } else {
                    gameFinished = true;
                    pointCalc();
                }

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
        socket.emit("planetsearched", planetsArray);
    })

    socket.on("troopbattle", (planetslosing, ammountoftroopsleft, tielostplanet, tieammountoftroopsleft) => {
        console.log(planetslosing, ammountoftroopsleft, tielostplanet, tieammountoftroopsleft)
        let planettochange
        if (tielostplanet) {
            planettochange = planetsArray.find(item => item.planet == tielostplanet.planet)
            planettochange.troopcount = tieammountoftroopsleft
            planettochange = planetsArray.find(item => item.planet == planetslosing.planet)
            planettochange.troopcount = ammountoftroopsleft
        } else {
            planettochange = planetsArray.find(item => item.planet == planetslosing.planet)
            planettochange.troopcount = ammountoftroopsleft

            if (planettochange.claimed == "red") {
                battleswonred++
            } else {
                battleswonblue++
            }
        }
    })

    socket.on("claiminganewplanet", (placedTroops, planetslosing, planetswinning, playerscolour) => {
        console.log(placedTroops)
        console.log(planetslosing)
        console.log(planetswinning)
        let planettochange
        planettochange = planetsArray.find(item => item.planet == planetslosing.planet)
        planettochange.claimed = playerscolour
        planettochange.troopcount = placedTroops
        planettochange = planetsArray.find(item => item.planet == planetswinning.planet)
        planettochange.troopcount = planettochange.troopcount - placedTroops

        if (playerscolour == "blue") {
            bluePlanets++;
            redPlanets--;
        } else if (playerscolour == "red") {
            redPlanets++;
            bluePlanets--;
        }

        console.log(bluePlanets);
        console.log(redPlanets);

        if (bluePlanets == 26) {
            gameFinished = true;
            winner = "blue";
            gameWin();
        } else if (redPlanets == 26) {
            gameFinished = true;
            winner = "red";
            gameWin();
        }
    })
})


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
});

let pointsreturnred = 0
let pointsreturnblue = 0

let territoriesred = 0
let armiesred = 0
let battleswonred = 0
let territoriesblue = 0
let armiesblue = 0
let battleswonblue = 0

function pointCalc() {
    // This function should only be called when the game is finished 
    // has 4 values

    planetsArray.forEach(element => {
        if (element.planet == "red") {
            territoriesred++

            armiesred = armiesred + element.troopcount

        } else {
            territoriesblue++

            armiesblue = armiesblue + element.troopcount
        }


    })

    pointsreturnred = pointsreturnred + territoriesred;
    pointsreturnred = pointsreturnred + armiesred / 10;
    pointsreturnred = pointsreturnred + battleswonred / 3;

    pointsreturnblue = pointsreturnblue + territoriesblue;
    pointsreturnblue = pointsreturnblue + armiesblue / 10;
    pointsreturnblue = pointsreturnblue + battleswonblue / 3;

    if (pointsreturnblue > pointsreturnred) {
        console.log("BLUE WIN")
        winner = "blue";
    } else if (pointsreturnblue == pointsreturnred) {
        console.log("TIE")
        winner = "tie";
    } else {
        winner = "red";
        console.log("Red WIN")
    }
    gameWin();
}

function gameWin() {
    console.log(winner + " wins");
    SOCKET_LIST[0].emit("win", winner);
    SOCKET_LIST[1].emit("win", winner);
    setTimeout(restart, 10000);
}

function restart() {
    planetsArray = system1.concat(system2, system3, system4, system5, system6);
    gameTurn = 0;
    gameisrunning = false;
    ready = 0;
    playerReady = "";
    turn = "placeTroops";
    bluePlanets = 0;
    redPlanets = 0;
    winner = "";
    players[0].troops = 40;
    players[1].troops = 40;
    gameFinished = false;
    let jsonplanets = JSON.stringify(planetsArray);
    io.emit("restart", jsonplanets);
    if (joined > 1) {
        io.emit("readyButton")
    }
}