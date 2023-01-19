//This contains the runtime information + functions + methods
import troopCalculate from './TroopCalculator.js';
import planetPick from './planetSelect.js';
import {pointcalc} from './pointcalc.js';
import {battle} from './battlecalculation.js';

let Player1 = {
    territories: 0,
    troops: 40
}

let Player2 = {
    territories: 0,
    troops: 40
}

let currentPlayer = Player1;

let system1 = [
    {
        planet: "sun",
        claimed: "",
        value: 5
    },
    {
        planet: "venus",
        claimed: "",
        value: 5
    },
    {
        planet: "earth",
        claimed: "",
        value: 5
    },
    {
        planet: "saturn",
        claimed: "",
        value: 5
    },
    {
        planet: "jupiter",
        claimed: "",
        value: 5
    }
];

let system2 = [
    {
        planet: "sunner",
        claimed: "",
        value: 5
    },
    {
        planet: "penutt",
        claimed: "",
        value: 5
    },
    {
        planet: "chese",
        claimed: "",
        value: 5
    },
    {
        planet: "kyoob",
        claimed: "",
        value: 5
    },
    {
        planet: "tulia",
        claimed: "",
        value: 5
    }
];

let system3 = [
    {
        planet: "banasun",
        claimed: "",
        value: 5
    },
    {
        planet: "george",
        claimed: "",
        value: 5
    },
    {
        planet: "lennie",
        claimed: "",
        value: 5
    },
    {
        planet: "nrutas",
        claimed: "",
        value: 5
    },
];

let system4 = [
    {
        planet: "lun",
        claimed: "",
        value: 5
    },
    {
        planet: "haf",
        claimed: "",
        value: 5
    },
    {
        planet: "fotbal",
        claimed: "",
        value: 5
    },
    {
        planet: "apolle",
        claimed: "",
        value: 5
    },
];

let system5 = [
    {
        planet: "smun",
        claimed: "",
        value: 5
    },
    {
        planet: "pairr",
        claimed: "",
        value: 5
    },
    {
        planet: "cooki",
        claimed: "",
        value: 5
    },
    {
        planet: "isars",
        claimed: "",
        value: 5
    },
];

let system6 = [
    {
        planet: "potunto",
        claimed: "",
        value: 5
    },
    {
        planet: "eg",
        claimed: "",
        value: 5
    },
    {
        planet: "enolla",
        claimed: "",
        value: 5
    },
    {
        planet: "vabos",
        claimed: "",
        value: 5
    },
];

function clicked(planet) {
    planetPick(planet, currentPlayer);
}



let playerTroops = 30;
let territories = 18;
let systemValues = [4, 7];
let systemTroops = 0;

troopCalculate(playerTroops, territories, systemValues, systemTroops);








