//This contains the runtime information + functions + methods
import troopCalculate from './TroopCalculator.js';
import start from './start.js';
import planetPick from './planetSelect.js';
import {pointcalc} from './pointcalc.js';
import {battle} from './battlecalculation.js';

let turn = 0;

let Player1 = {
    territories: 0,
    troops: 40
}

let Player2 = {
    territories: 0,
    troops: 40
}

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



function planetNames(name) {
    let systems = [system1, system2, system3, system4, system5, system6];

    for(i > )
    systems[i]

    let planetArray = [];
    systems[1].forEach(array => {
        systems[1].forEach(object => {
            planetArray.push(object[name]);
        })
    });
    return planetArray;
}

let planets = planetNames("planet");

console.log(planets);


start(planets);

function clicked(planet) {
    
}

let playerTroops = 30;
let territories = 18;
let systemValues = [4, 7];
let systemTroops = 0;

troopCalculate(playerTroops, territories, systemValues, systemTroops);

console.log(battle(20,20))






