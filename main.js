let Player1 = {
    territories: 0,
    troops: 40
}

let Player2 = {
    territories: 0,
    troops: 40
}

let sun = {
    claimed: "",
    value: 5
}
let venus = {
    claimed: "",
    value: 2
}
let earth = {
    claimed: "",
    value: 3
}
let saturn = {
    claimed: "",
    value: 2
}
let jupiter = {
    claimed: "",
    value: 4
}

let sunner = {
    claimed: "",
    value: 4
}
let penutt = {
    claimed: "",
    value: 3
}
let chese = {
    claimed: "",
    value: 2
}
let kyoob = {
    claimed: "",
    value: 3
}
let tulia = {
    claimed: "",
    value: 1
}

let banasun = {
    claimed: "",
    value: 6
}
let george = {
    claimed: "",
    value: 4
}
let lennie = {
    claimed: "",
    value: 5
}
let nrutas = {
    claimed: "",
    value: 3
}

let lun = {
    claimed: "",
    value: 5
}
let haf = {
    claimed: "",
    value: 4
}
let fotbal = {
    claimed: "",
    value: 3
}
let apolle = {
    claimed: "",
    value: 4
}

let smun = {
    claimed: "",
    value: 6
}
let pairr = {
    claimed: "",
    value: 4
}
let cooki = {
    claimed: "",
    value: 4
}
let isars = {
    claimed: "",
    value: 4
}

let potunto = {
    claimed: "",
    value: 5
}
let eg = {
    claimed: "",
    value: 3
}
let enolla = {
    claimed: "",
    value: 4
}
let vabos = {
    claimed: "",
    value: 3
}

let turn = 0;
let player;
let planets = 26;

if(turn%2 == 0) {
    player = Player1;
} else {
    player = Player2;
}




function info(name) {
    console.log(name);
}