import drawLines from './js/drawLines.js';
import colourLoad from './js/planetColourLoad.js';

const socket = io("localhost:4000")

let player = {};
let colour = "";
let yourTurn = false;
let turn = "";

socket.on("connected", (playerColour, playerInfo) => {
    player = playerInfo;
    colour = playerColour;
    console.log(player);
});

socket.on("readyButton", () => {
    document.getElementById("startGame").style.display = "block";
});

document.getElementById('startGame').addEventListener("click", () => {
    socket.emit('playerReady', player.id);
});

socket.on("screenHide", () => {
    document.getElementById("gameScreen").style.display = "none";
});



document.getElementById('sun').addEventListener("click", () => { clicked('sun', ['earth', 'venus', 'jupiter', 'saturn']) });
document.getElementById('earth').addEventListener("click", () => { clicked('earth', ['sun', 'venus']) });
document.getElementById('venus').addEventListener("click", () => { clicked('venus', ['sun', 'earth', 'saturn', 'lennie']) });
document.getElementById('jupiter').addEventListener("click", () => { clicked('jupiter', ['sun', 'saturn', 'tulia']) });
document.getElementById('saturn').addEventListener("click", () => { clicked('saturn', ['sun', 'venus', 'jupiter', 'lennie', 'penutt']) });

document.getElementById('sunner').addEventListener("click", () => { clicked('sunner', ['tulia', 'penutt', 'kyoob', 'chese', 'pairr']) });
document.getElementById('penutt').addEventListener("click", () => { clicked('penutt', ['saturn', 'tulia', 'kyoob', 'sunner']) });
document.getElementById('chese').addEventListener("click", () => { clicked('chese', ['sunner', 'kyoob', 'smun']) });
document.getElementById('kyoob').addEventListener("click", () => { clicked('kyoob', ['penutt', 'sunner', 'chese']) });
document.getElementById('tulia').addEventListener("click", () => { clicked('tulia', ['jupiter', 'penutt', 'sunner']) });

document.getElementById('banasun').addEventListener("click", () => { clicked('banasun', ['george', 'lennie', 'nrutas']) });
document.getElementById('george').addEventListener("click", () => { clicked('george', ['lennie', 'banasun', 'nrutas']) });
document.getElementById('lennie').addEventListener("click", () => { clicked('lennie', ['george', 'banasun', 'nrutas', 'venus', 'saturn']) });
document.getElementById('nrutas').addEventListener("click", () => { clicked('nrutas', ['banasun', 'george', 'lennie', 'lun']) });

document.getElementById('lun').addEventListener("click", () => { clicked('lun', ['nrutas', 'fotbal', 'haf']) });
document.getElementById('haf').addEventListener("click", () => { clicked('haf', ['lun', 'fotbal', 'apolle']) });
document.getElementById('fotbal').addEventListener("click", () => { clicked('fotbal', ['lun', 'haf', 'apolle']) });
document.getElementById('apolle').addEventListener("click", () => { clicked('apolle', ['fotbal', 'haf', 'smun', 'eg', 'vabos']) });

document.getElementById('smun').addEventListener("click", () => { clicked('smun', ['chese', 'pairr', 'cooki', 'apolle', 'eg']) });
document.getElementById('pairr').addEventListener("click", () => { clicked('pairr', ['sunner', 'smun', 'cooki']) });
document.getElementById('cooki').addEventListener("click", () => { clicked('cooki', ['smun', 'pairr', 'isars']) });
document.getElementById('isars').addEventListener("click", () => { clicked('isars', ['cooki', 'enolla']) });

document.getElementById('potunto').addEventListener("click", () => { clicked('potunto', ['eg', 'enolla', 'vabos']) });
document.getElementById('eg').addEventListener("click", () => { clicked('eg', ['enolla', 'apolle', 'vabos', 'potunto']) });
document.getElementById('enolla').addEventListener("click", () => { clicked('enolla', ['isars', 'eg', 'potunto']) });
document.getElementById('vabos').addEventListener("click", () => { clicked('vabos', ['apolle', 'eg', 'potunto']) });

function clicked(planet, neighbours) {
    socket.emit("clicked")
    socket.on("planets", (JsonPlanets) => {
        let planetsArray = JSON.parse(JsonPlanets);
        drawLines(planet, neighbours, planetsArray);
    })
}

socket.on("planetColourAssign", (data) => {
    document.getElementById("startGame").style.display = "none";
    // console.log(data.shuffledPlanets);
    // console.log(data.Jsonplanets);
    let shuffledPlanets = data.shuffledPlanets;
    let planets = JSON.parse(data.Jsonplanets);
    let planetsArray = colourLoad(shuffledPlanets, planets);
    // console.log(planetsArray);
});

socket.on("turn", (turn) => {
    
    if(turn == "placeTroops") {
        document.getElementById("confirm").style.display = "block"
    } else if(turn == "attack") {
        document.getElementById("confirm").style.display = "block"
    } else if(turn == "move troops") {
        document.getElementById("confirm").style.display = "block"
    }

});

document.getElementById('confirm').addEventListener("click", () => {
    document.getElementById("confirm").style.display = "none"
    socket.emit("move", {});
});