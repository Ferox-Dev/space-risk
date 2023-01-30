import drawLines from './js/drawLines.js';
import colourLoad from './js/planetColourLoad.js';
import battle from './js/battlecalculation.js'
// Turn modes: (BPlace -> RPlace -> Battack -> Rattack -> Bmove -> Rmove) move++ 
let turnmode = "Battack"

const socket = io("http://107.191.50.159:4000/")

let player = {};

// 
socket.on("connected", (message, playerInfo) => {
    player = playerInfo;
    console.log(message);
});

// Get planets and check if they've been clicked
{
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
}
// attacker plannet and defender planet for battling 
let attacker = ""
let defender = ""

//checks if plantes have been clicked ans lists their neigbors 
function clicked(planet, neighbours) {
    socket.emit("clicked")
    socket.on("planets", (JsonPlanets) => {
        let planetsArray = JSON.parse(JsonPlanets);
        drawLines(planet, neighbours, planetsArray);
    })

    if (turnmode = "Battack" || "Rattack") {
        socket.emit("planetcolorcheck", planet)
        let planetchecked = ""
        socket.on("planetsearched", result => {
            planetchecked = result
        });

        if (document.getElementById(planet).style.filter == "brightness(200%)") {
            document.getElementById(planet).style.filter = "brightness(100%)"
        } else {
            document.getElementById(planet).style.filter = "brightness(200%)"

            if (turnmode = "Battack" /*/check if player is blue/*/) {
                if (planetchecked.claimed == 'blue') {
                    if (defender) {
                        if (neighbours.includes(defender.planet)) {
                            attacker = planet
                        } else {
                            console.log("this planet is not a neighbor of the defeneder!")
                        }

                    } else {
                        attacker = planet
                    }
                } else {
                    if (attacker) {
                        if (neighbours.includes(attacker.planet)) {
                            defender = planet
                        } else {
                            console.log("this planet is not a neighbor of the defeneder!")
                        }
                    } else {
                        defender = planet
                    }
                }
            } else {
                if (planetchecked.claimed == 'red' /*/check if player is red/*/) {
                    if (defender) {
                        if (neighbours.includes(defender.planet)) {
                            attacker = planet
                        } else {
                            console.log("this planet is not a neighbor of the defeneder!")
                        }

                    } else {
                        attacker = planet
                    }
                } else {
                    if (attacker) {
                        if (neighbours.includes(attacker.planet)) {
                            defender = planet
                        } else {
                            console.log("this planet is not a neighbor of the defeneder!")
                        }
                    } else {
                        defender = planet
                    }
                }
            }

            //This if tree is for setting attacker and defender based on the turn
        }

    }

}

socket.on("planetColourAssign", (data) => {
    console.log(data.shuffledPlanets);
    console.log(data.Jsonplanets);
    let shuffledPlanets = data.shuffledPlanets;
    let planets = JSON.parse(data.Jsonplanets);
    let planetsArray = colourLoad(shuffledPlanets, planets);
    console.log(planetsArray);
})

