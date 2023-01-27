const express = require('express')
const app = express();
const serv = require('http').Server(app);

let joined = 0;
let gameisrunning = false;

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

    joined++;
    console.log(joined);
    SOCKET_LIST[socket.id] = socket;

    socket.on('disconnect', function () {
        joined--;
        console.log(joined);
        delete SOCKET_LIST[socket.id];
    })

    if(joined == 2 && !gameisrunning) {
        gameisrunning = true;
        let shuffledPlanets = start(planetNames)
        
        for (let i = 0; i < shuffledPlanets.length; i++) {

            let index = planetsArray.find(item => item.planet == shuffledPlanets[i])
            
            if (i % 2 == 0) {
                index.claimed = "blue";
            } else {
                index.claimed = "red";
            }
            
        }

        let Jsonplanets = JSON.stringify(planetsArray)
        io.emit("planetColourAssign", { shuffledPlanets, Jsonplanets });
    }

    socket.on("clicked", () => {
        let JsonPlanets = JSON.stringify(planetsArray)
        socket.emit("planets", JsonPlanets);
    })
    
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
});
