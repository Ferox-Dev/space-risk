import drawLines from './js/drawLines.js';
import colourLoad from './js/planetColourLoad.js';

import battle from './js/battlecalculation.js'
import troopCalculate from './js/TroopCalculator.js';
// Turn modes: (BPlace -> RPlace -> Battack -> Rattack -> Bmove -> Rmove) move++ 

const socket = io("http://localhost:4000")

let player = {};
let colour = "";
let yourTurn = false;
let turn = "";
let planets = [];
let startturn = true;

socket.on("connected", (playerColour, playerInfo) => {
    player = playerInfo;
    colour = playerColour;
    console.log(player);
    console.log("You are "+colour);
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
let howmanyruns = 0

let ran = 0;
let clicks = -1;

document.getElementById('battlebutton').addEventListener("click", () => {
    document.getElementById('battlebutton').style.display = "none";
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    if (!attacker || !defender) return console.log("You must have both an attacker and defender selected");
    let troopschange = null
    let planetslosing = null
    let ammountoftroopsleft = null
    let tielostplanet = null
    let tieammountoftroopsleft = null
    troopschange = battle(attacker.troopcount, defender.troopcount)
    if (troopschange == -2) {
        console.log("lose 2")
        planetslosing = attacker
        ammountoftroopsleft = attacker.troopcount - 2
    } else if (troopschange == -1) {
        console.log("lose 1")
        planetslosing = attacker
        ammountoftroopsleft = attacker.troopcount - 1
    } else if (troopschange == 0) {
        console.log("lose tie")
        planetslosing = attacker
        ammountoftroopsleft = attacker.troopcount - 1
        tielostplanet = defender
        tieammountoftroopsleft = defender.planet - 1
    } else if (troopschange == 1) {
        console.log("lose -1")
        planetslosing = defender
        ammountoftroopsleft = defender.troopcount - 1
    } else if (troopschange == 2) {
        console.log("lose -2")
        planetslosing = defender
        ammountoftroopsleft = defender.troopcount - 2
    }
    document.getElementById(attacker.planet).style.filter = "brightness(100%)"
    document.getElementById(defender.planet).style.filter = "brightness(100%)"

    if (planetslosing == defender && ammountoftroopsleft <= 0) {

        document.getElementById('troopnumContainer').style.display = "block";
        document.getElementById(troopnumber).max = attacker.troopcount - 1;
        document.getElementById('troopconfirm').addEventListener("click", () => {
            if (turn == "attack") {
                let planetswinning = attacker
                let placedTroops = parseInt(document.getElementById('troopnumber').value);
                document.getElementById("troops_" + attacker.planet).innerHTML = attacker.troopcount - placedTroops
                planetFind = planets.find(item => item.planet == attacker.planet);
                planetFind.troops = attacker.troopcount - placedTroops
                document.getElementById("troops_" + defender.planet).innerHTML = placedTroops
                planetFind = planets.find(item => item.planet == defender.planet);
                planetFind.troops = placedTroops;
                document.getElementById(defender.planet).src = "./images/planets/" + defender.planet + "_" + attacker.claimed + ".png"
                document.getElementById('troopnumContainer').style.display = "none";
                socket.emit("claiminganewplanet", placedTroops, planetslosing, planetswinning)

                document.getElementById('troopnumber').value = "";
            }
        })

    } else if (tielostplanet) {
        console.log(ammountoftroopsleft + " & " + tieammountoftroopsleft)
        document.getElementById("troops_" + planetslosing.planet).innerHTML = ammountoftroopsleft
        document.getElementById("troops_" + tielostplanet.planet).innerHTML = tieammountoftroopsleft
        socket.emit("troopbattle", planetslosing, ammountoftroopsleft, tielostplanet, tieammountoftroopsleft)
    } else {
        document.getElementById("troops_" + planetslosing.planet).innerHTML = ammountoftroopsleft
        socket.emit("troopbattle", planetslosing, ammountoftroopsleft, tielostplanet, tieammountoftroopsleft)
    }
    attacker = ""
    defender = ""
})

//checks if plantes have been clicked and lists their neigbors 
function clicked(planet, neighbours) {
    console.log(`start1ck: ${attacker} and ${defender}`)

    if (turn == "placeTroops" && yourTurn && player.troops > 0) {
        let planetColour = planets.find(item => item.planet == planet);
        if (planetColour.claimed == colour) {
            ran = 0;
            document.getElementById('troopnumber').max = player.troops;
            document.getElementById("infotext").innerHTML = player.troops + " troops left to place"
            document.getElementById('troopnumContainer').style.display = "block";
        }
        clicks++;
        document.getElementById('troopconfirm').addEventListener("click", () => {
            if (turn == "placeTroops") {
                if(document.getElementById('troopnumber').value > 0 && document.getElementById('troopnumber').value <= player.troops) {
                    if (ran == clicks) {
                        let placedTroops = parseInt(document.getElementById('troopnumber').value);
                        player.troops -= placedTroops;
                        let planetFind = planets.find(item => item.planet == planet);
                        planetFind.troopcount += placedTroops;
                        document.getElementById("troops_" + planet).innerHTML = planetFind.troopcount;
                        document.getElementById("infotext").innerHTML = player.troops + " troops left to place"
                        document.getElementById('troopnumContainer').style.display = "none";
                        document.getElementById('troopnumber').value = "";
                    }
                    ran++;
                }
            }
        });
    }

    document.getElementById('cancel').addEventListener("click", () => { document.getElementById('troopnumContainer').style.display = "none"; });

    if (turn == "attack") {

        socket.emit("clicked")
        socket.once("planets", (JsonPlanets) => {
            let planetsArray = JSON.parse(JsonPlanets);
            drawLines(planet, neighbours, planetsArray);
        })

        console.log(`start: ${attacker} and ${defender}`)
        console.log(attacker)
        console.log(defender)
        if (document.getElementById(planet).style.filter == "brightness(50%)") {
            // unselects the planet
            if (yourTurn) {
                if (planet == attacker.planet) { attacker = "" }
                if (planet == defender.planet) { defender = "" }
                document.getElementById(planet).style.filter = "brightness(100%)"
            }
            console.log("off")
            console.log(`end: ${attacker} and ${defender}`)
            document.getElementById('battlebutton').style.display = "none";
            console.log("-----------------------------------------")
            return;
        }

        if (document.getElementById(planet).style.filter == "brightness(100%)") {
            socket.emit("planetcolorcheck",)

            socket.once("planetsearched", systemscombined => {
                // you cannot do anything if it is not your turn
                if (yourTurn == false) { return; }
                // takes the array that comes from systemscombined and looks for the planet that you clicked
                let result = ""
                result = systemscombined.filter(planetz => planetz.planet == planet);

                console.log(result)
                console.log(`First check of: ${attacker} and ${defender}`)
                console.log(attacker)
                console.log(defender)
                //if you are blue it sets blue planets to attackers and red planets to defenders
                if (yourTurn == true && colour == "blue") {
                    console.log(`Dev check planet type: ${result[0].claimed}`)
                    if (result[0].claimed == 'blue') {
                        if (attacker) return console.log("already an attacker selected"); /*/ Alert Box Messages? /*/
                        if (result[0].troopcount <= 1) return console.log("planet has to have at least 2 troops to attack!") /*/ Alert Box Messages? /*/

                        if (defender) {
                            if (neighbours.includes(defender.planet)) {
                                attacker = result[0]
                                document.getElementById(planet).style.filter = "brightness(50%)"
                                console.log("on -> attacker -> blue -> neighbor check defender")
                            } else {
                                console.log(`this planet is not a neighbor of the ${defender}!`) /*/ Alert Box Messages? /*/
                            }

                        } else {
                            attacker = result[0]
                            document.getElementById(planet).style.filter = "brightness(50%)"
                            console.log("on -> attacker -> blue -> no defender")
                        }
                    } else {
                        if (defender) return console.log("already an defender selected");

                        if (attacker) {
                            if (neighbours.includes(attacker.planet)) {
                                defender = result[0]
                                document.getElementById(planet).style.filter = "brightness(50%)"
                                console.log("on -> defender -> blue -> negibor check attacker") /*/ Alert Box Messages? /*/
                            } else {
                                console.log("this planet is not a neighbor of the defeneder!")
                            }
                        } else {
                            defender = result[0]
                            document.getElementById(planet).style.filter = "brightness(50%)"
                            console.log("on -> defender -> blue -> no attacker")
                        }
                    }
                } else if (yourTurn == true && colour == "red") {
                    if (result[0].claimed == 'red' /*/check if player is red/*/) {
                        if (attacker) return console.log("already an attacker selected"); /*/ Alert Box Messages? /*/
                        if (result[0].troopcount <= 1) return console.log("planet has to have at least 2 troops to attack!") /*/ Alert Box Messages? /*/

                        if (defender) {
                            if (neighbours.includes(defender.planet)) {
                                attacker = result[0]
                                document.getElementById(planet).style.filter = "brightness(50%)"
                                console.log("on -> attacker -> blue -> neighbor check defender")
                            } else {
                                console.log(`this planet is not a neighbor of the ${defender}!`) /*/ Alert Box Messages? /*/
                            }

                        } else {
                            attacker = result[0]
                            document.getElementById(planet).style.filter = "brightness(50%)"
                            console.log("on -> attacker -> blue -> no defender")
                        }
                    } else {
                        if (defender) return console.log("already an defender selected");

                        if (attacker) {
                            if (neighbours.includes(attacker.planet)) {
                                defender = result[0]
                                document.getElementById(planet).style.filter = "brightness(50%)"
                                console.log("on -> defender -> blue -> negibor check attacker")
                            } else {
                                console.log("this planet is not a neighbor of the defeneder!") /*/ Alert Box Messages? /*/
                            }
                        } else {
                            defender = result[0]
                            document.getElementById(planet).style.filter = "brightness(50%)"
                            console.log("on -> defender -> blue -> no attacker")
                        }
                    }
                }
                console.log(`end check of: ${attacker} and ${defender}`)
                document.getElementById('battlebutton').style.display = "block";
                console.log("-----------------------------------------")
            });
            //This if tree is for setting attacker and defender based on the turn
        }
    }
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

socket.on("turn", (gameturn, playerInfo, jsonPlanets) => {
    planets = JSON.parse(jsonPlanets);
    yourTurn = true;
    turn = gameturn;
    player = playerInfo;
    pageUpdate(planets);
    if (turn == "placeTroops") {
        if (!startturn) {
            player.troops = troopCalculate(player, planets, colour);
        }
        startturn = false;
        document.getElementById("confirm").style.display = "block"
    } else if (turn == "attack") {
        document.getElementById("confirm").style.display = "block"
    }
});

document.getElementById('confirm').addEventListener("click", () => {
    document.getElementById("confirm").style.display = "none"
    yourTurn = false;
    let jsonplanets = JSON.stringify(planets);
    socket.emit("turnChange", { player, jsonplanets });
});

function pageUpdate(planets) {

    for (let i = 0; i < planets.length; i++) {
        document.getElementById("troops_" + planets[i].planet).innerHTML = planets[i].troopcount;
        if (planets[i].claimed == "blue") {
            document.getElementById(planets[i].planet).src = "./images/planets/" + planets[i].planet + "_blue.png"
        } else {
            document.getElementById(planets[i].planet).src = "./images/planets/" + planets[i].planet + "_red.png"
        }
    }

}